"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { Surface } from "@/components/ui/surface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/auth-store";
import { Check } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate } from "@/utils";
import type { Invoice } from "@/types";
import { useInvoices } from "@/hooks/api";

/** Billing commercial module workspace. */
export function BillingPageView() {
  const t = useTranslations("billing");
  const locale = useLocale();
  const hasPermission = useAuthStore((s) => s.hasPermission);

  const canEdit = hasPermission("billing:edit");
  const tag = locale === "fa" ? "fa-IR" : "en-US";
  const plans = [
    { id:"starter", price:79, featured:false },
    { id:"pro", price:149, featured:true },
    { id:"agency", price:299, featured:false },
    { id:"enterprise", price:0, featured:false },
  ] as const;
  const query = useInvoices({ page:1, pageSize:8, sortBy:"createdAt", sortOrder:"desc" });
  const columns = React.useMemo<ColumnDef<Invoice>[]>(() => [
    { accessorKey: "invoiceNumber", header: t("invoice") },
    { accessorKey: "total", header: t("amount"), cell: ({ row }) => formatCurrency(row.original.total, tag) },
    { accessorKey: "status", header: t("status"), cell: ({ row }) => <Badge>{row.original.status}</Badge> },
    { accessorKey: "issueDate", header: t("date"), cell: ({ row }) => formatDate(row.original.issueDate, tag) },
  ], [t, tag]);

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("subtitle")} />
      <Surface elevated className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="text-start">
          <p className="text-xs text-muted-foreground">{t("currentPlan")}</p>
          <p className="mt-1 text-2xl font-semibold">{t("planPro")}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t("renewsOn")}: ۱۴۰۵/۰۵/۰۱</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {canEdit ? <Button size="sm" onClick={() => toast.success(t("upgraded"))}>{t("upgrade")}</Button> : null}
          {canEdit ? <Button size="sm" variant="outline" onClick={() => toast.success(t("cancelled"))}>{t("cancel")}</Button> : null}
        </div>
      </Surface>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <Surface key={plan.id} elevated className={"space-y-3 p-5 " + (plan.featured ? "border-primary/40" : "")}> 
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold">{t("plan"+plan.id.charAt(0).toUpperCase()+plan.id.slice(1))}</h3>
              {plan.featured ? <Badge>{t("popular")}</Badge> : null}
            </div>
            <p className="text-2xl font-semibold">{plan.price ? formatCurrency(plan.price * 100000, tag) : t("custom")}</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex gap-2"><Check className="size-4 text-primary" />{t("seatIncluded")}</li>
              <li className="flex gap-2"><Check className="size-4 text-primary" />{t("supportIncluded")}</li>
            </ul>
            {canEdit ? <Button className="w-full" variant={plan.featured?"default":"outline"} size="sm" onClick={() => toast.success(t("upgraded"))}>{t("choosePlan")}</Button> : null}
          </Surface>
        ))}
      </div>
      <Surface elevated className="space-y-3 p-5">
        <h3 className="text-sm font-medium">{t("paymentMethods")}</h3>
        <div className="flex flex-wrap gap-3">
          <div className="rounded-xl border border-border px-4 py-3 text-sm">Visa ···· 4242 <Badge className="ms-2" variant="secondary">{t("default")}</Badge></div>
          <div className="rounded-xl border border-border px-4 py-3 text-sm">Shetab ···· 9912</div>
        </div>
      </Surface>
      <DataTable columns={columns} data={query.data?.data ?? []} isLoading={query.isLoading} emptyTitle={t("emptyTitle")} emptyDescription={t("emptyDescription")} />
    </div>
  );
}
