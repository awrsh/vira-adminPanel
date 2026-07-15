"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useBlogPosts } from "@/features/blog/hooks";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingState } from "@/components/shared/loading-state";
import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";
import type { BlogPost } from "@/types";

const COLUMNS: BlogPost["status"][] = ["draft", "published", "archived"];

export function BlogBoardPage() {
  const t = useTranslations("blogBoard");
  const locale = useLocale();
  const query = useBlogPosts({ page: 1, pageSize: 100, sortBy: "updatedAt" });
  const rows = query.data?.data ?? [];

  if (query.isLoading) return <LoadingState />;

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("subtitle")} />
      <div className="grid gap-3 lg:grid-cols-3">
        {COLUMNS.map((col, ci) => (
          <Surface key={col} elevated className="flex min-h-64 flex-col gap-3 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">{t(`columns.${col}`)}</h3>
              <Badge variant="secondary">
                {rows.filter((r) => r.status === col).length}
              </Badge>
            </div>
            <div className="flex flex-col gap-2">
              {rows
                .filter((r) => r.status === col)
                .map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: ci * 0.05 + i * 0.04 }}
                    className="rounded-xl border border-border/70 bg-background p-3 text-start shadow-float-sm"
                  >
                    <p className="text-sm font-medium">
                      {locale === "fa" ? post.title : post.titleEn}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {locale === "fa" ? post.excerpt : post.excerptEn}
                    </p>
                    <Badge variant="outline" className="mt-2 text-[10px]">
                      {locale === "fa" ? post.category : post.categoryEn}
                    </Badge>
                  </motion.div>
                ))}
            </div>
          </Surface>
        ))}
      </div>
    </div>
  );
}
