"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { Surface } from "@/components/ui/surface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { useAuthStore } from "@/stores/auth-store";
import { Plus, Trash2 } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { TeamMember, TeamInvitation } from "@/types";
import { Separator } from "@/components/ui/separator";

/** Team commercial module workspace. */
export function TeamPageView() {
  const t = useTranslations("team");
  const locale = useLocale();
  const hasPermission = useAuthStore((s) => s.hasPermission);

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

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("subtitle")} actions={canCreate ? <Button size="sm" onClick={() => toast.success(t("inviteSent"))}><Plus className="size-4" />{t("invite")}</Button> : null} />
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
      </Surface>
    </div>
  );
}
