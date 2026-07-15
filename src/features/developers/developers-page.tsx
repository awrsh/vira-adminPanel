"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Copy, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Surface } from "@/components/ui/surface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/stores/auth-store";
import type { ApiKeyRecord, WebhookEndpoint } from "@/types";

const logs = [
  { id: "1", method: "GET", path: "/v1/users", status: 200, ms: 42 },
  { id: "2", method: "POST", path: "/v1/orders", status: 201, ms: 118 },
  { id: "3", method: "GET", path: "/v1/products", status: 401, ms: 19 },
];

export function DevelopersPageView() {
  const t = useTranslations("developers");
  const canEdit = useAuthStore((s) => s.hasPermission("developers:edit"));
  const [keys, setKeys] = React.useState<ApiKeyRecord[]>([
    {
      id: "k1",
      name: "Production",
      nameEn: "Production",
      prefix: "atk_live_9f2a",
      scopes: ["orders:read", "users:read"],
      status: "active",
      lastUsedAt: "2026-07-14",
      createdAt: "2026-01-01",
    },
  ]);
  const [hooks, setHooks] = React.useState<WebhookEndpoint[]>([
    {
      id: "w1",
      url: "https://hooks.example.com/atlas",
      events: ["order.created", "user.updated"],
      status: "active",
      secretHint: "whsec_•••a91",
      createdAt: "2026-02-01",
      lastDeliveryAt: "2026-07-14",
    },
  ]);

  const keyColumns = React.useMemo<ColumnDef<ApiKeyRecord>[]>(
    () => [
      {
        accessorKey: "name",
        header: t("name"),
        cell: ({ row }) => row.original.name,
      },
      { accessorKey: "prefix", header: t("prefix") },
      {
        accessorKey: "status",
        header: t("status"),
        cell: ({ row }) => <Badge>{row.original.status}</Badge>,
      },
      {
        id: "actions",
        header: t("actions"),
        cell: ({ row }) => (
          <div className="flex gap-1">
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={() => {
                void navigator.clipboard.writeText(row.original.prefix);
                toast.success(t("copied"));
              }}
            >
              <Copy className="size-4" />
            </Button>
            {canEdit ? (
              <Button
                size="icon-sm"
                variant="ghost"
                onClick={() => {
                  setKeys((prev) =>
                    prev.filter((k) => k.id !== row.original.id),
                  );
                  toast.success(t("deleted"));
                }}
              >
                <Trash2 className="size-4" />
              </Button>
            ) : null}
          </div>
        ),
      },
    ],
    [canEdit, t],
  );

  const hookColumns = React.useMemo<ColumnDef<WebhookEndpoint>[]>(
    () => [
      { accessorKey: "url", header: t("url") },
      {
        accessorKey: "events",
        header: t("events"),
        cell: ({ row }) => row.original.events.join(", "),
      },
      {
        accessorKey: "status",
        header: t("status"),
        cell: ({ row }) => <Badge>{row.original.status}</Badge>,
      },
    ],
    [t],
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
              onClick={() => {
                setKeys((prev) => [
                  {
                    id: crypto.randomUUID(),
                    name: "New key",
                    nameEn: "New key",
                    prefix: `atk_${Math.random().toString(36).slice(2, 10)}`,
                    scopes: ["orders:read"],
                    status: "active",
                    createdAt: new Date().toISOString(),
                  },
                  ...prev,
                ]);
                toast.success(t("saved"));
              }}
            >
              <Plus className="size-4" />
              {t("createKey")}
            </Button>
          ) : null
        }
      />
      <Tabs defaultValue="keys">
        <TabsList>
          <TabsTrigger value="keys">{t("keys")}</TabsTrigger>
          <TabsTrigger value="webhooks">{t("webhooks")}</TabsTrigger>
          <TabsTrigger value="logs">{t("logs")}</TabsTrigger>
          <TabsTrigger value="docs">{t("docs")}</TabsTrigger>
        </TabsList>
        <TabsContent value="keys" className="mt-4">
          <DataTable
            columns={keyColumns}
            data={keys}
            emptyTitle={t("emptyTitle")}
            emptyDescription={t("emptyDescription")}
          />
        </TabsContent>
        <TabsContent value="webhooks" className="mt-4 space-y-3">
          {canEdit ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setHooks((prev) => [
                  {
                    id: crypto.randomUUID(),
                    url: "https://example.com/hook",
                    events: ["order.created"],
                    status: "active",
                    secretHint: "whsec_•••new",
                    createdAt: new Date().toISOString(),
                  },
                  ...prev,
                ]);
                toast.success(t("saved"));
              }}
            >
              <Plus className="size-4" />
              {t("createWebhook")}
            </Button>
          ) : null}
          <DataTable
            columns={hookColumns}
            data={hooks}
            emptyTitle={t("emptyTitle")}
            emptyDescription={t("emptyDescription")}
          />
        </TabsContent>
        <TabsContent value="logs" className="mt-4">
          <Surface elevated className="overflow-x-auto p-4">
            <table className="w-full min-w-[28rem] text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="px-2 py-2 text-start font-medium">
                    {t("method")}
                  </th>
                  <th className="px-2 py-2 text-start font-medium">
                    {t("path")}
                  </th>
                  <th className="px-2 py-2 text-start font-medium">
                    {t("status")}
                  </th>
                  <th className="px-2 py-2 text-start font-medium">ms</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((row) => (
                  <tr key={row.id} className="border-b border-border/60">
                    <td className="px-2 py-2">{row.method}</td>
                    <td className="px-2 py-2 font-mono text-xs">{row.path}</td>
                    <td className="px-2 py-2">
                      <Badge
                        variant={
                          row.status >= 400 ? "destructive" : "success"
                        }
                      >
                        {row.status}
                      </Badge>
                    </td>
                    <td className="px-2 py-2">{row.ms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Surface>
        </TabsContent>
        <TabsContent value="docs" className="mt-4">
          <Surface elevated className="space-y-4 p-5 text-start">
            <div>
              <h3 className="font-medium">{t("sdk")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("sdkBody")}
              </p>
            </div>
            <Input readOnly value="npm i @atlas/sdk" className="font-mono" />
            <p className="text-sm text-muted-foreground">{t("baseUrl")}</p>
            <Input
              readOnly
              value="https://api.atlas.dev/v1"
              className="font-mono"
            />
          </Surface>
        </TabsContent>
      </Tabs>
    </div>
  );
}
