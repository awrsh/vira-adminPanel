"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingState } from "@/components/shared/loading-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { useTasks, useUpdateTask } from "@/hooks/api";
import { useAuthStore } from "@/stores/auth-store";
import type { Task } from "@/types";

const COLUMNS: Task["status"][] = ["todo", "in_progress", "review", "done"];

export function TasksPageView() {
  const t = useTranslations("tasks");
  const locale = useLocale();
  const canCreate = useAuthStore((s) => s.hasPermission("tasks:create"));
  const canEdit = useAuthStore((s) => s.hasPermission("tasks:edit"));
  const query = useTasks({
    page: 1,
    pageSize: 100,
    sortBy: "dueDate",
    sortOrder: "asc",
  });
  const update = useUpdateTask();
  const rows = query.data?.data ?? [];

  async function move(task: Task, status: Task["status"]) {
    if (!canEdit) return;
    await update.mutateAsync({ id: task.id, patch: { status } });
    toast.success(t("saved"));
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("title")}
        description={t("subtitle")}
        actions={
          canCreate ? (
            <Button size="sm" onClick={() => toast.success(t("saved"))}>
              <Plus className="size-4" />
              {t("create")}
            </Button>
          ) : null
        }
      />
      {query.isLoading ? (
        <LoadingState />
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {COLUMNS.map((col) => (
            <Surface
              key={col}
              elevated
              className="flex min-h-72 flex-col gap-3 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-medium">{t(col)}</h3>
                <Badge variant="secondary">
                  {rows.filter((r) => r.status === col).length}
                </Badge>
              </div>
              <div className="flex flex-1 flex-col gap-2">
                {rows
                  .filter((r) => r.status === col)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="rounded-xl bg-muted/40 p-3 text-start"
                    >
                      <p className="text-sm font-medium">
                        {locale === "fa" ? task.title : task.titleEn}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {locale === "fa"
                          ? task.assigneeName
                          : task.assigneeNameEn}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Badge variant="outline">{task.priority}</Badge>
                        {canEdit
                          ? COLUMNS.filter((c) => c !== col)
                              .slice(0, 2)
                              .map((next) => (
                                <Button
                                  key={next}
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 px-2 text-xs"
                                  onClick={() => void move(task, next)}
                                >
                                  {t(next)}
                                </Button>
                              ))
                          : null}
                      </div>
                    </div>
                  ))}
              </div>
            </Surface>
          ))}
        </div>
      )}
    </div>
  );
}
