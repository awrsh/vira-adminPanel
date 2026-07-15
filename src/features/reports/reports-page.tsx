"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Download, Plus } from "lucide-react";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import type { Report } from "@/types";

/** Reports commercial module workspace. */
export function ReportsPageView() {
  const t = useTranslations("reports");
  const locale = useLocale();
  const hasPermission = useAuthStore((s) => s.hasPermission);
  const canCreate = hasPermission("reports:create");
  const [rows] = React.useState<Report[]>([
    {
      id: "1",
      name: "درآمد ماهانه",
      nameEn: "Monthly revenue",
      type: "revenue",
      status: "ready",
      schedule: "monthly",
      format: "pdf",
      rangeStart: "2026-01-01",
      rangeEnd: "2026-01-31",
      createdBy: "سارا احمدی",
      createdByEn: "Sara Ahmadi",
      createdAt: "2026-02-01T10:00:00Z",
      lastRunAt: "2026-02-01T10:05:00Z",
    },
    {
      id: "2",
      name: "رشد کاربران",
      nameEn: "User growth",
      type: "users",
      status: "scheduled",
      schedule: "weekly",
      format: "csv",
      rangeStart: "2026-01-01",
      rangeEnd: "2026-03-01",
      createdBy: "رضا کریمی",
      createdByEn: "Reza Karimi",
      createdAt: "2026-02-10T12:00:00Z",
    },
    {
      id: "3",
      name: "سفارش‌های معوق",
      nameEn: "Overdue orders",
      type: "orders",
      status: "ready",
      schedule: "none",
      format: "xlsx",
      rangeStart: "2026-02-01",
      rangeEnd: "2026-02-28",
      createdBy: "نینا فرهادی",
      createdByEn: "Nina Farhadi",
      createdAt: "2026-03-01T09:00:00Z",
      lastRunAt: "2026-03-01T09:10:00Z",
    },
  ]);

  const columns = React.useMemo<ColumnDef<Report>[]>(
    () => [
      {
        accessorKey: "name",
        header: t("name"),
        cell: ({ row }) =>
          locale === "fa" ? row.original.name : row.original.nameEn,
      },
      {
        accessorKey: "type",
        header: t("type"),
        cell: ({ row }) => (
          <Badge variant="secondary">{row.original.type}</Badge>
        ),
      },
      {
        accessorKey: "status",
        header: t("status"),
        cell: ({ row }) => <Badge>{row.original.status}</Badge>,
      },
      { accessorKey: "schedule", header: t("schedule") },
      { accessorKey: "format", header: t("format") },
    ],
    [locale, t],
  );

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
      <DataTable
        columns={columns}
        data={rows}
        searchPlaceholder={t("search")}
        emptyTitle={t("emptyTitle")}
        emptyDescription={t("emptyDescription")}
        toolbarExtra={
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success(t("export"))}
          >
            <Download className="size-4" />
            {t("export")}
          </Button>
        }
      />
    </div>
  );
}
