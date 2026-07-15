"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { JalaliCalendar } from "@/components/ui/jalali-calendar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Surface } from "@/components/ui/surface";
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useAuthStore } from "@/stores/auth-store";
import type { CalendarEvent } from "@/types";
import { formatDate } from "@/utils";

const seed: CalendarEvent[] = [
  {
    id: "e1",
    title: "بررسی اسپرینت",
    titleEn: "Sprint review",
    description: "مرور پیشرفت هفتگی",
    descriptionEn: "Weekly progress review",
    startAt: "2026-07-15T10:00:00Z",
    endAt: "2026-07-15T11:00:00Z",
    allDay: false,
    reminderMinutes: 30,
    createdBy: "سارا",
    createdByEn: "Sara",
  },
  {
    id: "e2",
    title: "دمو مشتری",
    titleEn: "Customer demo",
    description: "نمایش ماژول سفارش",
    descriptionEn: "Orders module walkthrough",
    startAt: "2026-07-16T14:00:00Z",
    endAt: "2026-07-16T15:00:00Z",
    allDay: false,
    reminderMinutes: 60,
    createdBy: "رضا",
    createdByEn: "Reza",
  },
];

export function CalendarPageView() {
  const t = useTranslations("calendar");
  const locale = useLocale();
  const tag = locale === "fa" ? "fa-IR" : "en-US";
  const canCreate = useAuthStore((s) => s.hasPermission("calendar:create"));
  const canDelete = useAuthStore((s) => s.hasPermission("calendar:delete"));
  const [view, setView] = React.useState<"month" | "week" | "day">("month");
  const [date, setDate] = React.useState<Date>(new Date());
  const [month, setMonth] = React.useState<Date>(new Date());
  const [events, setEvents] = React.useState(seed);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");

  const dayEvents = events.filter((event) => {
    if (view !== "day") return true;
    return new Date(event.startAt).toDateString() === date.toDateString();
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("title")}
        description={t("subtitle")}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={view}
              onValueChange={(v) => setView(v as typeof view)}
            >
              <SelectTrigger className="h-9 w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">{t("month")}</SelectItem>
                <SelectItem value="week">{t("week")}</SelectItem>
                <SelectItem value="day">{t("day")}</SelectItem>
              </SelectContent>
            </Select>
            {canCreate ? (
              <Button size="sm" onClick={() => setOpen(true)}>
                <Plus className="size-4" />
                {t("create")}
              </Button>
            ) : null}
          </div>
        }
      />

      <div className="grid gap-3 lg:grid-cols-[22rem_minmax(0,1fr)]">
        <Surface elevated className="p-3">
          {locale === "fa" ? (
            <JalaliCalendar
              month={month}
              onMonthChange={setMonth}
              selected={date}
              onSelect={setDate}
            />
          ) : (
            <Calendar
              mode="single"
              selected={date}
              onSelect={(value) => {
                if (value) setDate(value);
              }}
            />
          )}
        </Surface>
        <Surface elevated className="space-y-3 p-5">
          <h3 className="text-sm font-medium">{t("events")}</h3>
          {dayEvents.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("emptyDescription")}</p>
          ) : (
            dayEvents.map((event) => (
              <div
                key={event.id}
                className="flex flex-wrap items-start justify-between gap-3 rounded-xl bg-muted/40 px-3 py-3 text-start"
              >
                <div>
                  <p className="text-sm font-medium">
                    {locale === "fa" ? event.title : event.titleEn}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDate(event.startAt, tag)} ·{" "}
                    {event.reminderMinutes
                      ? t("reminder", { minutes: event.reminderMinutes })
                      : t("noReminder")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{view}</Badge>
                  {canDelete ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEvents((prev) =>
                          prev.filter((x) => x.id !== event.id),
                        );
                        toast.success(t("deleted"));
                      }}
                    >
                      {t("delete")}
                    </Button>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </Surface>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t("create")}</DrawerTitle>
          </DrawerHeader>
          <div className="space-y-4 px-4">
            <div className="space-y-2">
              <Label>{t("eventTitle")}</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{t("notes")}</Label>
              <Textarea rows={3} />
            </div>
            <div className="space-y-2">
              <Label>{t("reminderLabel")}</Label>
              <Select defaultValue="30">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="60">60</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DrawerFooter>
            <Button
              onClick={() => {
                if (!title.trim()) return;
                setEvents((prev) => [
                  {
                    id: crypto.randomUUID(),
                    title,
                    titleEn: title,
                    description: "",
                    descriptionEn: "",
                    startAt: date.toISOString(),
                    endAt: date.toISOString(),
                    allDay: false,
                    reminderMinutes: 30,
                    createdBy: "شما",
                    createdByEn: "You",
                  },
                  ...prev,
                ]);
                setTitle("");
                setOpen(false);
                toast.success(t("saved"));
              }}
            >
              {t("save")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
