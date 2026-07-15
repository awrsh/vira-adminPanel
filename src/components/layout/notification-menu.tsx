"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Bell } from "lucide-react";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface ShellNotification {
  id: string;
  titleKey: "shell.notif1Title" | "shell.notif2Title" | "shell.notif3Title";
  bodyKey: "shell.notif1Body" | "shell.notif2Body" | "shell.notif3Body";
  timeKey: "shell.notif1Time" | "shell.notif2Time" | "shell.notif3Time";
  unread: boolean;
}

const INITIAL: ShellNotification[] = [
  {
    id: "1",
    titleKey: "shell.notif1Title",
    bodyKey: "shell.notif1Body",
    timeKey: "shell.notif1Time",
    unread: true,
  },
  {
    id: "2",
    titleKey: "shell.notif2Title",
    bodyKey: "shell.notif2Body",
    timeKey: "shell.notif2Time",
    unread: true,
  },
  {
    id: "3",
    titleKey: "shell.notif3Title",
    bodyKey: "shell.notif3Body",
    timeKey: "shell.notif3Time",
    unread: false,
  },
];

/** Header notification menu (shell chrome — not a business module). */
export function NotificationMenu() {
  const t = useTranslations();
  const [items, setItems] = React.useState(INITIAL);
  const unread = items.filter((item) => item.unread).length;

  function markAllRead() {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })));
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="relative"
          aria-label={t("shell.notifications")}
        >
          <Bell className="size-4" />
          {unread > 0 ? (
            <span
              className="absolute end-1 top-1 size-1.5 rounded-full bg-primary"
              aria-hidden
            />
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">{t("shell.notifications")}</p>
            {unread > 0 ? (
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                {unread}
              </Badge>
            ) : null}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            disabled={unread === 0}
            onClick={markAllRead}
          >
            {t("shell.markAllRead")}
          </Button>
        </div>
        <Separator />
        <ul className="max-h-80 overflow-y-auto py-1">
          {items.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-muted-foreground">
              {t("shell.noNotifications")}
            </li>
          ) : (
            items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full flex-col gap-1 px-4 py-3 text-start transition-colors hover:bg-muted/60",
                    item.unread && "bg-primary-soft/40",
                  )}
                  onClick={() =>
                    setItems((prev) =>
                      prev.map((row) =>
                        row.id === item.id ? { ...row, unread: false } : row,
                      ),
                    )
                  }
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium leading-snug">
                      {t(item.titleKey)}
                    </p>
                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      {t(item.timeKey)}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {t(item.bodyKey)}
                  </p>
                </button>
              </li>
            ))
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
