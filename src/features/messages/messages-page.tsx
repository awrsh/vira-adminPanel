"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingState } from "@/components/shared/loading-state";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Surface } from "@/components/ui/surface";
import { useMessages } from "@/hooks/api";
import { cn } from "@/utils";

export function MessagesPageView() {
  const t = useTranslations("messages");
  const locale = useLocale();
  const [search, setSearch] = React.useState("");
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const query = useMessages({
    page: 1,
    pageSize: 40,
    search: search || undefined,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const rows = query.data?.data ?? [];
  const active = rows.find((m) => m.id === activeId) ?? rows[0];

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("subtitle")} />
      <div className="grid gap-3 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <Surface elevated className="flex max-h-[70vh] flex-col overflow-hidden p-3">
          <Input
            floatingLabel={t("search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="mt-3 flex-1 space-y-1 overflow-y-auto">
            {query.isLoading ? (
              <LoadingState />
            ) : rows.length === 0 ? (
              <EmptyState
                title={t("emptyTitle")}
                description={t("emptyDescription")}
              />
            ) : (
              rows.map((msg) => (
                <button
                  key={msg.id}
                  type="button"
                  onClick={() => setActiveId(msg.id)}
                  className={cn(
                    "w-full rounded-xl px-3 py-2.5 text-start transition-colors",
                    active?.id === msg.id
                      ? "bg-primary-soft text-primary"
                      : "hover:bg-muted/70",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium">
                      {locale === "fa" ? msg.subject : msg.subjectEn}
                    </p>
                    {!msg.read ? (
                      <Badge variant="warning">{t("unread")}</Badge>
                    ) : null}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {locale === "fa" ? msg.senderName : msg.senderNameEn}
                  </p>
                </button>
              ))
            )}
          </div>
        </Surface>
        <Surface elevated className="min-h-[28rem] p-5">
          {!active ? (
            <EmptyState
              title={t("emptyTitle")}
              description={t("selectThread")}
            />
          ) : (
            <div className="space-y-4 text-start">
              <div>
                <h2 className="text-lg font-semibold">
                  {locale === "fa" ? active.subject : active.subjectEn}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {locale === "fa" ? active.senderName : active.senderNameEn} →{" "}
                  {locale === "fa"
                    ? active.recipientName
                    : active.recipientNameEn}
                </p>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {locale === "fa" ? active.body : active.bodyEn}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("attachments")}: 1 · report.pdf
              </p>
            </div>
          )}
        </Surface>
      </div>
    </div>
  );
}
