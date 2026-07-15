"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/stores/auth-store";
import type { CrmCustomer, CrmLead } from "@/types";
import { formatCurrency } from "@/utils";

const customersSeed: CrmCustomer[] = [
  {
    id: "c1",
    name: "آریا تجارت",
    nameEn: "Arya Commerce",
    email: "hello@arya.ir",
    phone: "02191000000",
    company: "آریا",
    companyEn: "Arya",
    status: "active",
    ownerName: "سارا احمدی",
    ownerNameEn: "Sara Ahmadi",
    notes: "علاقه‌مند به پلن Agency",
    notesEn: "Interested in Agency plan",
    lifetimeValue: 48_000_000,
    createdAt: "2026-01-12",
  },
  {
    id: "c2",
    name: "نوین‌سافت",
    nameEn: "Novin Soft",
    email: "ops@novin.dev",
    phone: "03132211000",
    company: "نوین",
    companyEn: "Novin",
    status: "active",
    ownerName: "رضا کریمی",
    ownerNameEn: "Reza Karimi",
    notes: "نیاز به یکپارچه‌سازی API",
    notesEn: "Needs API integration",
    lifetimeValue: 22_000_000,
    createdAt: "2026-03-04",
  },
];

const leadsSeed: CrmLead[] = [
  {
    id: "l1",
    name: "مریم نوری",
    nameEn: "Maryam Nouri",
    email: "m@example.com",
    company: "سپهر",
    companyEn: "Sepehr",
    stage: "new",
    value: 12_000_000,
    ownerName: "نینا",
    ownerNameEn: "Nina",
    createdAt: "2026-07-01",
  },
  {
    id: "l2",
    name: "کاوه رستمی",
    nameEn: "Kaveh Rostami",
    email: "k@example.com",
    company: "دلتا",
    companyEn: "Delta",
    stage: "contacted",
    value: 28_000_000,
    ownerName: "سارا",
    ownerNameEn: "Sara",
    createdAt: "2026-07-03",
  },
  {
    id: "l3",
    name: "الهام صفوی",
    nameEn: "Elham Safavi",
    email: "e@example.com",
    company: "پارس",
    companyEn: "Pars",
    stage: "negotiation",
    value: 55_000_000,
    ownerName: "رضا",
    ownerNameEn: "Reza",
    createdAt: "2026-07-05",
  },
  {
    id: "l4",
    name: "امیر جلالی",
    nameEn: "Amir Jalali",
    email: "a@example.com",
    company: "اوین",
    companyEn: "Evin",
    stage: "won",
    value: 90_000_000,
    ownerName: "سارا",
    ownerNameEn: "Sara",
    createdAt: "2026-06-20",
  },
];

const STAGES: CrmLead["stage"][] = [
  "new",
  "contacted",
  "negotiation",
  "won",
];

export function CrmPageView() {
  const t = useTranslations("crm");
  const locale = useLocale();
  const tag = locale === "fa" ? "fa-IR" : "en-US";
  const canCreate = useAuthStore((s) => s.hasPermission("crm:create"));
  const canEdit = useAuthStore((s) => s.hasPermission("crm:edit"));
  const [leads, setLeads] = React.useState(leadsSeed);

  const columns = React.useMemo<ColumnDef<CrmCustomer>[]>(
    () => [
      {
        accessorKey: "name",
        header: t("customer"),
        cell: ({ row }) =>
          locale === "fa" ? row.original.name : row.original.nameEn,
      },
      { accessorKey: "email", header: t("email") },
      {
        accessorKey: "status",
        header: t("status"),
        cell: ({ row }) => <Badge>{row.original.status}</Badge>,
      },
      {
        accessorKey: "lifetimeValue",
        header: t("ltv"),
        cell: ({ row }) => formatCurrency(row.original.lifetimeValue, tag),
      },
      {
        accessorKey: "notes",
        header: t("notes"),
        cell: ({ row }) =>
          locale === "fa" ? row.original.notes : row.original.notesEn,
      },
    ],
    [locale, t, tag],
  );

  function moveLead(id: string, stage: CrmLead["stage"]) {
    if (!canEdit) return;
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, stage } : lead)),
    );
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
      <Tabs defaultValue="customers">
        <TabsList>
          <TabsTrigger value="customers">{t("customers")}</TabsTrigger>
          <TabsTrigger value="leads">{t("leads")}</TabsTrigger>
        </TabsList>
        <TabsContent value="customers" className="mt-4">
          <DataTable
            columns={columns}
            data={customersSeed}
            searchPlaceholder={t("search")}
            emptyTitle={t("emptyTitle")}
            emptyDescription={t("emptyDescription")}
          />
        </TabsContent>
        <TabsContent value="leads" className="mt-4">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {STAGES.map((stage) => (
              <Surface
                key={stage}
                elevated
                className="flex min-h-72 flex-col gap-3 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-medium">{t(stage)}</h3>
                  <Badge variant="secondary">
                    {leads.filter((l) => l.stage === stage).length}
                  </Badge>
                </div>
                {leads
                  .filter((l) => l.stage === stage)
                  .map((lead) => (
                    <div
                      key={lead.id}
                      className="rounded-xl bg-muted/40 p-3 text-start"
                    >
                      <p className="text-sm font-medium">
                        {locale === "fa" ? lead.name : lead.nameEn}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {locale === "fa" ? lead.company : lead.companyEn}
                      </p>
                      <p className="mt-1 text-xs">
                        {formatCurrency(lead.value, tag)}
                      </p>
                      {canEdit ? (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {STAGES.filter((s) => s !== stage)
                            .slice(0, 2)
                            .map((next) => (
                              <Button
                                key={next}
                                size="sm"
                                variant="ghost"
                                className="h-7 px-2 text-xs"
                                onClick={() => moveLead(lead.id, next)}
                              >
                                {t(next)}
                              </Button>
                            ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
              </Surface>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
