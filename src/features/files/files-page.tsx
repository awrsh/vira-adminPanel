"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { FileText, Folder, ImageIcon, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Surface } from "@/components/ui/surface";
import { useAuthStore } from "@/stores/auth-store";
import type { FileItem } from "@/types";
import { cn, formatNumber } from "@/utils";

const seed: FileItem[] = [
  {
    id: "f1",
    name: "برندینگ",
    nameEn: "Brand",
    type: "folder",
    size: 0,
    path: "/brand",
    uploadedBy: "سارا",
    uploadedByEn: "Sara",
    createdAt: "2026-06-01",
  },
  {
    id: "f2",
    name: "کاور محصول.jpg",
    nameEn: "Product cover.jpg",
    type: "image",
    mimeType: "image/jpeg",
    size: 2400000,
    path: "/brand/cover.jpg",
    url: "https://picsum.photos/seed/atlas/640/400",
    uploadedBy: "رضا",
    uploadedByEn: "Reza",
    createdAt: "2026-06-12",
  },
  {
    id: "f3",
    name: "قرارداد.pdf",
    nameEn: "Contract.pdf",
    type: "pdf",
    mimeType: "application/pdf",
    size: 820000,
    path: "/docs/contract.pdf",
    uploadedBy: "نینا",
    uploadedByEn: "Nina",
    createdAt: "2026-07-01",
  },
];

export function FilesPageView() {
  const t = useTranslations("files");
  const locale = useLocale();
  const tag = locale === "fa" ? "fa-IR" : "en-US";
  const canCreate = useAuthStore((s) => s.hasPermission("files:create"));
  const canDelete = useAuthStore((s) => s.hasPermission("files:delete"));
  const [items, setItems] = React.useState(seed);
  const [search, setSearch] = React.useState("");
  const [preview, setPreview] = React.useState<FileItem | null>(null);

  const filtered = items.filter((item) => {
    const label = locale === "fa" ? item.name : item.nameEn;
    return label.toLowerCase().includes(search.toLowerCase());
  });

  const usedBytes = items.reduce((sum, item) => sum + item.size, 0);
  const capacity = 10 * 1024 * 1024 * 1024;
  const usedPct = Math.min(100, Math.round((usedBytes / capacity) * 100));

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("subtitle")} />
      <Surface elevated className="space-y-3 p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">{t("storage")}</p>
            <p className="mt-1 text-lg font-semibold">
              {formatNumber(Math.round(usedBytes / 1024 / 1024), tag)} MB / 10 GB
            </p>
          </div>
          <p className="text-sm text-muted-foreground">{usedPct}%</p>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${usedPct}%` }}
          />
        </div>
      </Surface>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-3">
          <Input
            floatingLabel={t("search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filtered.length === 0 ? (
            <EmptyState
              title={t("emptyTitle")}
              description={t("emptyDescription")}
            />
          ) : (
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((item) => {
                const Icon =
                  item.type === "folder"
                    ? Folder
                    : item.type === "image"
                      ? ImageIcon
                      : FileText;
                return (
                  <Surface
                    key={item.id}
                    elevated
                    className={cn(
                      "flex items-start gap-3 p-4 text-start",
                      item.type !== "folder" && "cursor-pointer",
                    )}
                    onClick={() =>
                      item.type !== "folder" ? setPreview(item) : undefined
                    }
                  >
                    <Icon className="mt-0.5 size-5 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {locale === "fa" ? item.name : item.nameEn}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.type === "folder"
                          ? t("folder")
                          : `${formatNumber(Math.round(item.size / 1024), tag)} KB`}
                      </p>
                    </div>
                    {canDelete && item.type !== "folder" ? (
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setItems((prev) =>
                            prev.filter((x) => x.id !== item.id),
                          );
                          toast.success(t("deleted"));
                        }}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    ) : null}
                  </Surface>
                );
              })}
            </div>
          )}
        </div>

        <Surface elevated className="space-y-3 p-4">
          <div className="flex items-center gap-2">
            <Upload className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">{t("upload")}</h3>
          </div>
          {canCreate ? (
            <FileUpload
              onChange={(files) => {
                if (!files.length) return;
                const file = files[0];
                setItems((prev) => [
                  {
                    id: crypto.randomUUID(),
                    name: file.name,
                    nameEn: file.name,
                    type: file.type.startsWith("image/")
                      ? "image"
                      : file.type.includes("pdf")
                        ? "pdf"
                        : "other",
                    mimeType: file.type,
                    size: file.size,
                    path: `/${file.name}`,
                    url: file.type.startsWith("image/")
                      ? URL.createObjectURL(file)
                      : undefined,
                    uploadedBy: "شما",
                    uploadedByEn: "You",
                    createdAt: new Date().toISOString(),
                  },
                  ...prev,
                ]);
                toast.success(t("saved"));
              }}
            />
          ) : (
            <p className="text-sm text-muted-foreground">{t("noUpload")}</p>
          )}
          {preview ? (
            <div className="space-y-2 border-t border-border pt-3">
              <p className="text-xs text-muted-foreground">{t("preview")}</p>
              {preview.type === "image" && preview.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview.url}
                  alt={preview.nameEn}
                  className="w-full rounded-xl object-cover"
                />
              ) : (
                <Badge variant="secondary">{preview.type.toUpperCase()}</Badge>
              )}
            </div>
          ) : null}
        </Surface>
      </div>
    </div>
  );
}
