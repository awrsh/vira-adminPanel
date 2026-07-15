"use client";

import { useLocale, useTranslations } from "next-intl";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDeleteBlogPost } from "@/features/blog/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { formatDate } from "@/utils";
import type { BlogPost } from "@/types";

interface BlogPostDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: BlogPost | null;
  canEdit?: boolean;
  canDelete?: boolean;
  onEdit?: (post: BlogPost) => void;
}

export function BlogPostDetailsDrawer({
  open,
  onOpenChange,
  post,
  canEdit,
  canDelete,
  onEdit,
}: BlogPostDetailsDrawerProps) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const deletePost = useDeleteBlogPost();

  if (!post) return null;

  async function handleDelete() {
    try {
      await deletePost.mutateAsync(post!.id);
      toast.success(t("deleted"));
      onOpenChange(false);
    } catch {
      toast.error(t("error"));
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {locale === "fa" ? post.title : post.titleEn}
          </DrawerTitle>
          <DrawerDescription>
            {locale === "fa" ? post.excerpt : post.excerptEn}
          </DrawerDescription>
        </DrawerHeader>
        <div className="space-y-4 px-4 pb-6 sm:px-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">
              {locale === "fa" ? post.category : post.categoryEn}
            </Badge>
            <Badge variant="outline">{t(`statuses.${post.status}`)}</Badge>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {locale === "fa" ? post.content : post.contentEn}
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span>
              {t("author")}:{" "}
              {locale === "fa" ? post.authorName : post.authorNameEn}
            </span>
            <span dir="ltr">{formatDate(post.updatedAt, locale)}</span>
          </div>
          <div className="flex gap-2">
            {canEdit && onEdit ? (
              <Button size="sm" variant="outline" onClick={() => onEdit(post)}>
                <Pencil className="size-4" />
                {t("edit")}
              </Button>
            ) : null}
            {canDelete ? (
              <Button
                size="sm"
                variant="destructive"
                loading={deletePost.isPending}
                onClick={() => void handleDelete()}
              >
                <Trash2 className="size-4" />
                {t("delete")}
              </Button>
            ) : null}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
