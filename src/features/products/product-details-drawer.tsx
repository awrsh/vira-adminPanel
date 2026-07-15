"use client";

import { useLocale, useTranslations } from "next-intl";
import { Package, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImagePreview } from "@/components/ui/image-preview";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDate, formatNumber } from "@/utils";
import type { Product } from "@/types";

interface ProductDetailsDrawerProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <dt className="shrink-0 text-sm text-muted-foreground">{label}</dt>
      <dd className="min-w-0 text-end text-sm font-medium text-foreground">
        {value}
      </dd>
    </div>
  );
}

export function ProductDetailsDrawer({
  product,
  open,
  onOpenChange,
  onEdit,
  onDelete,
  canEdit = true,
  canDelete = true,
}: ProductDetailsDrawerProps) {
  const t = useTranslations();
  const locale = useLocale();

  if (!product) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent />
      </Drawer>
    );
  }

  const displayName = locale === "fa" ? product.name : product.nameEn;
  const displayCategory =
    locale === "fa" ? product.category : product.categoryEn;
  const displayDescription =
    locale === "fa" ? product.description : product.descriptionEn;
  const localeTag = locale === "fa" ? "fa-IR" : "en-US";

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-start gap-3">
            {product.image ? (
              <ImagePreview
                src={product.image}
                alt={displayName}
                className="size-14 shrink-0 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <Package className="size-6" />
              </div>
            )}
            <div className="min-w-0 text-start">
              <DrawerTitle className="truncate">{displayName}</DrawerTitle>
              <DrawerDescription className="truncate">
                {product.sku}
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-2">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="secondary">{displayCategory}</Badge>
            <Badge
              variant={
                product.status === "published"
                  ? "success"
                  : product.status === "draft"
                    ? "warning"
                    : "outline"
              }
            >
              {t(`products.statuses.${product.status}`)}
            </Badge>
            {product.stock < 10 ? (
              <Badge variant="destructive">{t("products.lowStock")}</Badge>
            ) : null}
          </div>

          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            {displayDescription}
          </p>

          <Separator className="mb-2" />

          <dl>
            <DetailRow
              label={t("products.price")}
              value={formatCurrency(product.price, localeTag)}
            />
            <DetailRow
              label={t("products.stock")}
              value={formatNumber(product.stock, localeTag)}
            />
            <DetailRow label={t("products.sku")} value={product.sku} />
            <DetailRow
              label={t("products.createdAt")}
              value={formatDate(product.createdAt, localeTag)}
            />
          </dl>
        </div>

        <DrawerFooter>
          {canEdit && onEdit ? (
            <Button type="button" onClick={() => onEdit(product)}>
              <Pencil className="size-4" />
              {t("common.edit")}
            </Button>
          ) : null}
          {canDelete && onDelete ? (
            <Button
              type="button"
              variant="destructive"
              onClick={() => onDelete(product)}
            >
              <Trash2 className="size-4" />
              {t("common.delete")}
            </Button>
          ) : null}
          <DrawerClose asChild>
            <Button type="button" variant="outline">
              {t("common.close")}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
