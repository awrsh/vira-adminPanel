"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  useCreateScrumCard,
  useUpdateScrumCard,
} from "@/features/scrum/hooks";
import {
  SCRUM_COLUMNS,
  SCRUM_PRIORITIES,
  createScrumCardSchema,
  type ScrumCardFormValues,
} from "@/features/scrum/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ScrumCard } from "@/types";

interface ScrumCardFormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  card: ScrumCard | null;
  defaultStatus?: ScrumCard["status"];
}

export function ScrumCardFormDrawer({
  open,
  onOpenChange,
  card,
  defaultStatus = "backlog",
}: ScrumCardFormDrawerProps) {
  const t = useTranslations("scrum");
  const createCard = useCreateScrumCard();
  const updateCard = useUpdateScrumCard();

  const form = useForm<ScrumCardFormValues>({
    resolver: zodResolver(createScrumCardSchema()),
    values: card
      ? {
          title: card.title,
          titleEn: card.titleEn,
          assignee: card.assignee,
          assigneeEn: card.assigneeEn,
          points: card.points,
          priority: card.priority,
          status: card.status,
        }
      : {
          title: "",
          titleEn: "",
          assignee: "",
          assigneeEn: "",
          points: 1,
          priority: "medium",
          status: defaultStatus,
        },
  });

  async function onSubmit(values: ScrumCardFormValues) {
    try {
      const now = new Date().toISOString();
      if (card) {
        await updateCard.mutateAsync({
          id: card.id,
          patch: { ...values, updatedAt: now },
        });
      } else {
        await createCard.mutateAsync({
          ...values,
          createdAt: now,
          updatedAt: now,
        });
      }
      toast.success(t("saved"));
      onOpenChange(false);
    } catch {
      toast.error(t("error"));
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{card ? t("edit") : t("create")}</DrawerTitle>
        </DrawerHeader>
        <form
          className="space-y-4 px-4 pb-2 sm:px-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("titleFa")}</Label>
              <Input {...form.register("title")} />
            </div>
            <div className="space-y-2">
              <Label>{t("titleEn")}</Label>
              <Input {...form.register("titleEn")} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("assigneeFa")}</Label>
              <Input {...form.register("assignee")} />
            </div>
            <div className="space-y-2">
              <Label>{t("assigneeEn")}</Label>
              <Input {...form.register("assigneeEn")} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>{t("points")}</Label>
              <Input
                type="number"
                min={1}
                max={21}
                {...form.register("points", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("priorityLabel")}</Label>
              <Select
                value={form.watch("priority")}
                onValueChange={(v) =>
                  form.setValue("priority", v as ScrumCard["priority"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SCRUM_PRIORITIES.map((p) => (
                    <SelectItem key={p} value={p}>
                      {t(`priority.${p}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("column")}</Label>
              <Select
                value={form.watch("status")}
                onValueChange={(v) =>
                  form.setValue("status", v as ScrumCard["status"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SCRUM_COLUMNS.map((col) => (
                    <SelectItem key={col} value={col}>
                      {t(`columns.${col}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DrawerFooter className="px-0">
            <Button
              type="submit"
              loading={createCard.isPending || updateCard.isPending}
            >
              {t("save")}
            </Button>
            <DrawerClose asChild>
              <Button type="button" variant="outline">
                {t("cancel")}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
