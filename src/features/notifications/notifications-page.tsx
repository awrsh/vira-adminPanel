"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNotifications, useUpdateNotification } from "@/hooks/api";
import { useAuthStore } from "@/stores/auth-store";
import type { AppNotification } from "@/types";

export function NotificationsPageView() {
  const t = useTranslations("notifications");
  const locale = useLocale();
  const canEdit = useAuthStore((s) => s.hasPermission("notifications:edit"));
  const [type, setType] = React.useState("__all__");
  const [search, setSearch] = React.useState("");
  const query = useNotifications({
    page: 1,
    pageSize: 20,
    search: search || undefined,
    sortBy: "createdAt",
    sortOrder: "desc",
    filters: type === "__all__" ? undefined : { type },
  });
  const update = useUpdateNotification();

  const columns = React.useMemo<ColumnDef<AppNotification>[]>(
    () => [
      {
        accessorKey: "title",
        header: t("titleCol"),
        cell: ({ row }) =>
          locale === "fa" ? row.original.title : row.original.titleEn,
      },
      {
        accessorKey: "type",
        header: t("category"),
        cell: ({ row }) => (
          <Badge variant="secondary">{row.original.type}</Badge>
        ),
      },
      {
        accessorKey: "read",
        header: t("status"),
        cell: ({ row }) => (
          <Badge variant={row.original.read ? "outline" : "warning"}>
            {row.original.read ? t("read") : t("unread")}
          </Badge>
        ),
      },
      {
        id: "actions",
        header: t("actions"),
        cell: ({ row }) =>
          canEdit ? (
            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                void update
                  .mutateAsync({
                    id: row.original.id,
                    patch: { read: !row.original.read },
                  })
                  .then(() => toast.success(t("saved")))
              }
            >
              {row.original.read ? t("markUnread") : t("markRead")}
            </Button>
          ) : null,
      },
    ],
    [canEdit, locale, t, update],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("title")}
        description={t("subtitle")}
        actions={
          canEdit ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.success(t("allRead"))}
            >
              {t("markAllRead")}
            </Button>
          ) : null
        }
      />
      <DataTable
        columns={columns}
        data={query.data?.data ?? []}
        isLoading={query.isLoading}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder={t("search")}
        emptyTitle={t("emptyTitle")}
        emptyDescription={t("emptyDescription")}
        toolbarExtra={
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="h-9 w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">{t("allTypes")}</SelectItem>
              {(
                ["info", "success", "warning", "error", "system"] as const
              ).map((x) => (
                <SelectItem key={x} value={x}>
                  {x}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />
      <Surface elevated className="space-y-4 p-5">
        <h3 className="text-sm font-medium">{t("preferences")}</h3>
        {(["email", "push", "sms"] as const).map((key) => (
          <div
            key={key}
            className="flex items-center justify-between gap-3 border-b border-border/50 py-3 last:border-0"
          >
            <span className="text-sm">{t(key)}</span>
            <Switch defaultChecked={key !== "sms"} disabled={!canEdit} />
          </div>
        ))}
      </Surface>
    </div>
  );
}
