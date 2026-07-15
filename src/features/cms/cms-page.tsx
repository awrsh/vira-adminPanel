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
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Surface } from "@/components/ui/surface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/stores/auth-store";
import type { CmsPage, CmsPost } from "@/types";

const pagesSeed: CmsPage[] = [
  {
    id: "p1",
    title: "صفحه اصلی",
    titleEn: "Home",
    slug: "home",
    status: "published",
    seoTitle: "اطلس | استارتر کیت",
    seoTitleEn: "Atlas | Starter Kit",
    updatedAt: "2026-07-01",
    createdAt: "2026-01-01",
  },
  {
    id: "p2",
    title: "قیمت‌گذاری",
    titleEn: "Pricing",
    slug: "pricing",
    status: "draft",
    seoTitle: "قیمت‌گذاری اطلس",
    seoTitleEn: "Atlas Pricing",
    updatedAt: "2026-07-10",
    createdAt: "2026-03-01",
  },
];

const postsSeed: CmsPost[] = [
  {
    id: "b1",
    title: "چگونه RTL بسازیم",
    titleEn: "How we build RTL",
    slug: "rtl-guide",
    category: "محصول",
    categoryEn: "Product",
    status: "published",
    authorName: "سارا",
    authorNameEn: "Sara",
    publishedAt: "2026-06-01",
    createdAt: "2026-05-20",
  },
];

const categories = ["محصول", "مهندسی", "طراحی"];

export function CmsPageView() {
  const t = useTranslations("cms");
  const locale = useLocale();
  const canCreate = useAuthStore((s) => s.hasPermission("cms:create"));
  const canEdit = useAuthStore((s) => s.hasPermission("cms:edit"));
  const [seoTitle, setSeoTitle] = React.useState(
    locale === "fa" ? "اطلس | استارتر کیت" : "Atlas | Starter Kit",
  );
  const [seoDesc, setSeoDesc] = React.useState(
    locale === "fa"
      ? "پایه پریمیوم SaaS فارسی"
      : "Persian-first premium SaaS foundation",
  );

  const pageColumns = React.useMemo<ColumnDef<CmsPage>[]>(
    () => [
      {
        accessorKey: "title",
        header: t("page"),
        cell: ({ row }) =>
          locale === "fa" ? row.original.title : row.original.titleEn,
      },
      { accessorKey: "slug", header: t("slug") },
      {
        accessorKey: "status",
        header: t("status"),
        cell: ({ row }) => <Badge>{row.original.status}</Badge>,
      },
    ],
    [locale, t],
  );

  const postColumns = React.useMemo<ColumnDef<CmsPost>[]>(
    () => [
      {
        accessorKey: "title",
        header: t("post"),
        cell: ({ row }) =>
          locale === "fa" ? row.original.title : row.original.titleEn,
      },
      {
        accessorKey: "category",
        header: t("category"),
        cell: ({ row }) =>
          locale === "fa" ? row.original.category : row.original.categoryEn,
      },
      {
        accessorKey: "status",
        header: t("status"),
        cell: ({ row }) => <Badge>{row.original.status}</Badge>,
      },
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
      <Tabs defaultValue="pages">
        <TabsList>
          <TabsTrigger value="pages">{t("pages")}</TabsTrigger>
          <TabsTrigger value="posts">{t("posts")}</TabsTrigger>
          <TabsTrigger value="categories">{t("categories")}</TabsTrigger>
          <TabsTrigger value="media">{t("media")}</TabsTrigger>
          <TabsTrigger value="seo">{t("seo")}</TabsTrigger>
        </TabsList>
        <TabsContent value="pages" className="mt-4">
          <DataTable
            columns={pageColumns}
            data={pagesSeed}
            emptyTitle={t("emptyTitle")}
            emptyDescription={t("emptyDescription")}
          />
        </TabsContent>
        <TabsContent value="posts" className="mt-4">
          <DataTable
            columns={postColumns}
            data={postsSeed}
            emptyTitle={t("emptyTitle")}
            emptyDescription={t("emptyDescription")}
          />
        </TabsContent>
        <TabsContent value="categories" className="mt-4">
          <Surface elevated className="flex flex-wrap gap-2 p-5">
            {categories.map((cat) => (
              <Badge key={cat} variant="secondary">
                {cat}
              </Badge>
            ))}
          </Surface>
        </TabsContent>
        <TabsContent value="media" className="mt-4">
          <Surface elevated className="p-5">
            <FileUpload
              onChange={() => toast.success(t("saved"))}
              disabled={!canEdit}
            />
          </Surface>
        </TabsContent>
        <TabsContent value="seo" className="mt-4">
          <Surface elevated className="max-w-xl space-y-4 p-5">
            <div className="space-y-2">
              <Label>{t("seoTitle")}</Label>
              <Input
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                disabled={!canEdit}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("seoDescription")}</Label>
              <Textarea
                rows={3}
                value={seoDesc}
                onChange={(e) => setSeoDesc(e.target.value)}
                disabled={!canEdit}
              />
            </div>
            {canEdit ? (
              <Button onClick={() => toast.success(t("saved"))}>
                {t("save")}
              </Button>
            ) : null}
          </Surface>
        </TabsContent>
      </Tabs>
    </div>
  );
}
