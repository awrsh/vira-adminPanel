const fs = require("fs");
const path = require("path");

function pageShell(P, ns, body) {
  return `"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { Surface } from "@/components/ui/surface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/shared/empty-state";
import { useAuthStore } from "@/stores/auth-store";
${body.imports || ""}

/** ${P} commercial module workspace. */
export function ${P}PageView() {
  const t = useTranslations("${ns}");
  const locale = useLocale();
  const hasPermission = useAuthStore((s) => s.hasPermission);
${body.setup || ""}
  return (
    <div className="space-y-6">
${body.jsx}
    </div>
  );
}
`;
}

const pages = {};

pages.reports = pageShell("Reports", "reports", {
  imports: `import { Plus, Download } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { Report } from "@/types";`,
  setup: `
  const canCreate = hasPermission("reports:create");
  const [rows] = React.useState<Report[]>([
    { id:"1", name:"درآمد ماهانه", nameEn:"Monthly revenue", type:"revenue", status:"ready", schedule:"monthly", format:"pdf", rangeStart:"2026-01-01", rangeEnd:"2026-01-31", createdBy:"سارا احمدی", createdByEn:"Sara Ahmadi", createdAt:"2026-02-01T10:00:00Z", lastRunAt:"2026-02-01T10:05:00Z" },
    { id:"2", name:"رشد کاربران", nameEn:"User growth", type:"users", status:"scheduled", schedule:"weekly", format:"csv", rangeStart:"2026-01-01", rangeEnd:"2026-03-01", createdBy:"رضا کریمی", createdByEn:"Reza Karimi", createdAt:"2026-02-10T12:00:00Z" },
    { id:"3", name:"سفارش‌های معوق", nameEn:"Overdue orders", type:"orders", status:"ready", schedule:"none", format:"xlsx", rangeStart:"2026-02-01", rangeEnd:"2026-02-28", createdBy:"نینا فرهادی", createdByEn:"Nina Farhadi", createdAt:"2026-03-01T09:00:00Z", lastRunAt:"2026-03-01T09:10:00Z" },
  ]);
  const columns = React.useMemo<ColumnDef<Report>[]>(() => [
    { accessorKey: "name", header: t("name"), cell: ({ row }) => locale === "fa" ? row.original.name : row.original.nameEn },
    { accessorKey: "type", header: t("type"), cell: ({ row }) => <Badge variant="secondary">{row.original.type}</Badge> },
    { accessorKey: "status", header: t("status"), cell: ({ row }) => <Badge>{row.original.status}</Badge> },
    { accessorKey: "schedule", header: t("schedule") },
    { accessorKey: "format", header: t("format") },
  ], [locale, t]);
`,
  jsx: `      <PageHeader title={t("title")} description={t("subtitle")} actions={canCreate ? <Button size="sm" onClick={() => toast.success(t("saved"))}><Plus className="size-4" />{t("create")}</Button> : null} />
      <DataTable columns={columns} data={rows} searchPlaceholder={t("search")} emptyTitle={t("emptyTitle")} emptyDescription={t("emptyDescription")} toolbarExtra={<Button variant="outline" size="sm" onClick={() => toast.success(t("export"))}><Download className="size-4" />{t("export")}</Button>} />`,
});

pages.team = pageShell("Team", "team", {
  imports: `import { Plus, Trash2 } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { TeamMember, TeamInvitation } from "@/types";
import { Separator } from "@/components/ui/separator";`,
  setup: `
  const canCreate = hasPermission("team:create");
  const canDelete = hasPermission("team:delete");
  const [members] = React.useState<TeamMember[]>([
    { id:"1", userId:"u1", name:"سارا احمدی", nameEn:"Sara Ahmadi", email:"sara@atlas.dev", role:"admin", status:"active", joinedAt:"2025-11-01", lastActiveAt:"2026-07-14" },
    { id:"2", userId:"u2", name:"رضا کریمی", nameEn:"Reza Karimi", email:"reza@atlas.dev", role:"manager", status:"active", joinedAt:"2025-12-12", lastActiveAt:"2026-07-13" },
    { id:"3", userId:"u3", name:"نینا فرهادی", nameEn:"Nina Farhadi", email:"nina@atlas.dev", role:"editor", status:"invited", invitedAt:"2026-07-10" },
  ]);
  const [invites] = React.useState<TeamInvitation[]>([
    { id:"i1", email:"ali@agency.ir", role:"editor", status:"pending", invitedBy:"سارا احمدی", invitedByEn:"Sara Ahmadi", createdAt:"2026-07-12", expiresAt:"2026-07-19" },
  ]);
  const columns = React.useMemo<ColumnDef<TeamMember>[]>(() => [
    { accessorKey: "name", header: t("member"), cell: ({ row }) => locale === "fa" ? row.original.name : row.original.nameEn },
    { accessorKey: "email", header: t("email") },
    { accessorKey: "role", header: t("role"), cell: ({ row }) => <Badge>{row.original.role}</Badge> },
    { accessorKey: "status", header: t("status"), cell: ({ row }) => <Badge variant={row.original.status==="active"?"success":"warning"}>{row.original.status}</Badge> },
  ], [locale, t]);
`,
  jsx: `      <PageHeader title={t("title")} description={t("subtitle")} actions={canCreate ? <Button size="sm" onClick={() => toast.success(t("inviteSent"))}><Plus className="size-4" />{t("invite")}</Button> : null} />
      <DataTable columns={columns} data={members} searchPlaceholder={t("search")} emptyTitle={t("emptyTitle")} emptyDescription={t("emptyDescription")} />
      <Surface elevated className="space-y-3 p-5">
        <h3 className="text-sm font-medium">{t("pendingInvites")}</h3>
        <Separator />
        {invites.length === 0 ? <EmptyState title={t("emptyTitle")} description={t("noInvites")} /> : invites.map((inv) => (
          <div key={inv.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-muted/40 px-3 py-2.5">
            <div className="text-start">
              <p className="text-sm font-medium">{inv.email}</p>
              <p className="text-xs text-muted-foreground">{inv.role} · {locale==="fa"?inv.invitedBy:inv.invitedByEn}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="warning">{inv.status}</Badge>
              {canDelete ? <Button size="icon-sm" variant="ghost" onClick={() => toast.success(t("deleted"))}><Trash2 className="size-4" /></Button> : null}
            </div>
          </div>
        ))}
      </Surface>`,
});

pages.billing = pageShell("Billing", "billing", {
  imports: `import { Check } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate } from "@/utils";
import type { Invoice } from "@/types";
import { useInvoices } from "@/hooks/api";`,
  setup: `
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
`,
  jsx: `      <PageHeader title={t("title")} description={t("subtitle")} />
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
      <DataTable columns={columns} data={query.data?.data ?? []} isLoading={query.isLoading} emptyTitle={t("emptyTitle")} emptyDescription={t("emptyDescription")} />`,
});

fs.writeFileSync("src/features/reports/reports-page.tsx", pages.reports);
fs.writeFileSync("src/features/team/team-page.tsx", pages.team);
fs.writeFileSync("src/features/billing/billing-page.tsx", pages.billing);
console.log("wrote reports team billing");
