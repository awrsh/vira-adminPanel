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
import { Link } from "@/i18n/navigation";
import { useAuthStore } from "@/stores/auth-store";
import type { LoginHistoryItem, SecuritySession } from "@/types";
import { formatDate } from "@/utils";

const sessionsSeed: SecuritySession[] = [
  {
    id: "s1",
    device: "MacBook Pro",
    deviceEn: "MacBook Pro",
    browser: "Chrome",
    ip: "91.98.12.10",
    location: "تهران",
    locationEn: "Tehran",
    current: true,
    lastActiveAt: "2026-07-15T10:00:00Z",
    createdAt: "2026-07-01T08:00:00Z",
  },
  {
    id: "s2",
    device: "iPhone 15",
    deviceEn: "iPhone 15",
    browser: "Safari",
    ip: "5.210.40.2",
    location: "اصفهان",
    locationEn: "Isfahan",
    current: false,
    lastActiveAt: "2026-07-14T18:00:00Z",
    createdAt: "2026-06-20T12:00:00Z",
  },
];

const loginsSeed: LoginHistoryItem[] = [
  {
    id: "l1",
    status: "success",
    ip: "91.98.12.10",
    device: "Chrome / macOS",
    deviceEn: "Chrome / macOS",
    location: "تهران",
    locationEn: "Tehran",
    createdAt: "2026-07-15T09:50:00Z",
  },
  {
    id: "l2",
    status: "failed",
    ip: "185.1.2.3",
    device: "Unknown",
    deviceEn: "Unknown",
    location: "آمستردام",
    locationEn: "Amsterdam",
    createdAt: "2026-07-14T22:10:00Z",
  },
];

export function SecurityPageView() {
  const t = useTranslations("security");
  const locale = useLocale();
  const tag = locale === "fa" ? "fa-IR" : "en-US";
  const canEdit = useAuthStore((s) => s.hasPermission("security:edit"));
  const [sessions, setSessions] = React.useState(sessionsSeed);
  const [twoFactor, setTwoFactor] = React.useState(true);

  const loginColumns = React.useMemo<ColumnDef<LoginHistoryItem>[]>(
    () => [
      {
        accessorKey: "status",
        header: t("status"),
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.status === "success" ? "success" : "destructive"
            }
          >
            {t(row.original.status)}
          </Badge>
        ),
      },
      {
        accessorKey: "device",
        header: t("device"),
        cell: ({ row }) =>
          locale === "fa" ? row.original.device : row.original.deviceEn,
      },
      { accessorKey: "ip", header: t("ip") },
      {
        accessorKey: "location",
        header: t("location"),
        cell: ({ row }) =>
          locale === "fa" ? row.original.location : row.original.locationEn,
      },
      {
        accessorKey: "createdAt",
        header: t("time"),
        cell: ({ row }) => formatDate(row.original.createdAt, tag),
      },
    ],
    [locale, t, tag],
  );

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("subtitle")} />

      <Surface elevated className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="text-start">
          <p className="font-medium">{t("twoFactor")}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("twoFactorHint")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            checked={twoFactor}
            onCheckedChange={(v) => {
              if (!canEdit) return;
              setTwoFactor(v);
              toast.success(t("saved"));
            }}
            disabled={!canEdit}
          />
          <Button asChild size="sm" variant="outline">
            <Link href="/two-factor">{t("manage2fa")}</Link>
          </Button>
        </div>
      </Surface>

      <Surface elevated className="space-y-3 p-5">
        <h3 className="text-sm font-medium">{t("sessions")}</h3>
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-muted/40 px-3 py-3 text-start"
          >
            <div>
              <p className="text-sm font-medium">
                {locale === "fa" ? session.device : session.deviceEn} ·{" "}
                {session.browser}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {session.ip} ·{" "}
                {locale === "fa" ? session.location : session.locationEn}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {session.current ? (
                <Badge variant="success">{t("current")}</Badge>
              ) : null}
              {canEdit && !session.current ? (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setSessions((prev) =>
                      prev.filter((s) => s.id !== session.id),
                    );
                    toast.success(t("revoked"));
                  }}
                >
                  {t("revoke")}
                </Button>
              ) : null}
            </div>
          </div>
        ))}
      </Surface>

      <div>
        <h3 className="mb-3 text-sm font-medium">{t("loginHistory")}</h3>
        <DataTable
          columns={loginColumns}
          data={loginsSeed}
          emptyTitle={t("emptyTitle")}
          emptyDescription={t("emptyDescription")}
        />
      </div>
    </div>
  );
}
