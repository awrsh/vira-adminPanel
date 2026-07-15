"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingState } from "@/components/shared/loading-state";
import { Input } from "@/components/ui/input";
import { Surface } from "@/components/ui/surface";
import { useActivities } from "@/hooks/api";
import { formatDate } from "@/utils";

export function ActivityPageView() {
  const t = useTranslations("activity");
  const locale = useLocale();
  const tag = locale === "fa" ? "fa-IR" : "en-US";
  const [search, setSearch] = React.useState("");
  const query = useActivities({
    page: 1,
    pageSize: 40,
    search: search || undefined,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const rows = query.data?.data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("subtitle")} />
      <Input
        floatingLabel={t("search")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />
      <Surface elevated className="p-5">
        {query.isLoading ? (
          <LoadingState />
        ) : rows.length === 0 ? (
          <EmptyState
            title={t("emptyTitle")}
            description={t("emptyDescription")}
          />
        ) : (
          <ol className="relative ms-3 space-y-0 border-s border-border">
            {rows.map((item) => (
              <li key={item.id} className="relative ps-6 pb-6 last:pb-0">
                <span className="absolute -start-[5px] top-1.5 size-2.5 rounded-full bg-primary" />
                <p className="text-start text-sm font-medium">
                  {locale === "fa" ? item.action : item.actionEn}
                </p>
                <p className="mt-0.5 text-start text-xs text-muted-foreground">
                  {locale === "fa" ? item.actorName : item.actorNameEn} ·{" "}
                  {locale === "fa" ? item.entityLabel : item.entityLabelEn}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatDate(item.createdAt, tag)}
                </p>
              </li>
            ))}
          </ol>
        )}
      </Surface>
    </div>
  );
}
