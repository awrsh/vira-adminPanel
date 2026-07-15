"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  useCreateBlogPost,
  useUpdateBlogPost,
} from "@/features/blog/hooks";
import {
  BLOG_STATUSES,
  createBlogPostSchema,
  tagsToArray,
  tagsToString,
  type BlogPostFormValues,
} from "@/features/blog/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BlogPost } from "@/types";

interface BlogPostFormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: BlogPost | null;
}

export function BlogPostFormDrawer({
  open,
  onOpenChange,
  post,
}: BlogPostFormDrawerProps) {
  const t = useTranslations("blog");
  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();
  const editing = Boolean(post);

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(createBlogPostSchema()),
    values: post
      ? {
          title: post.title,
          titleEn: post.titleEn,
          slug: post.slug,
          excerpt: post.excerpt,
          excerptEn: post.excerptEn,
          content: post.content,
          contentEn: post.contentEn,
          category: post.category,
          categoryEn: post.categoryEn,
          status: post.status,
          authorName: post.authorName,
          authorNameEn: post.authorNameEn,
          tags: tagsToString(post.tags),
        }
      : {
          title: "",
          titleEn: "",
          slug: "",
          excerpt: "",
          excerptEn: "",
          content: "",
          contentEn: "",
          category: "",
          categoryEn: "",
          status: "draft",
          authorName: "",
          authorNameEn: "",
          tags: "",
        },
  });

  async function onSubmit(values: BlogPostFormValues) {
    try {
      const now = new Date().toISOString();
      const payload = {
        ...values,
        tags: tagsToArray(values.tags),
        publishedAt:
          values.status === "published"
            ? post?.publishedAt ?? now
            : undefined,
        updatedAt: now,
      };
      if (post) {
        await updatePost.mutateAsync({ id: post.id, patch: payload });
      } else {
        await createPost.mutateAsync({
          ...payload,
          createdAt: now,
        });
      }
      toast.success(t("saved"));
      onOpenChange(false);
    } catch {
      toast.error(t("error"));
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[92vh]">
        <DrawerHeader>
          <DrawerTitle>{editing ? t("edit") : t("create")}</DrawerTitle>
          <DrawerDescription>{t("formHint")}</DrawerDescription>
        </DrawerHeader>
        <form
          className="space-y-4 overflow-y-auto px-4 pb-2 sm:px-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="blog-title">{t("titleFa")}</Label>
              <Input id="blog-title" {...form.register("title")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog-title-en">{t("titleEn")}</Label>
              <Input id="blog-title-en" {...form.register("titleEn")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="blog-slug">{t("slug")}</Label>
            <Input id="blog-slug" dir="ltr" {...form.register("slug")} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="blog-category">{t("categoryFa")}</Label>
              <Input id="blog-category" {...form.register("category")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog-category-en">{t("categoryEn")}</Label>
              <Input id="blog-category-en" {...form.register("categoryEn")} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="blog-excerpt">{t("excerptFa")}</Label>
              <Textarea id="blog-excerpt" rows={2} {...form.register("excerpt")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog-excerpt-en">{t("excerptEn")}</Label>
              <Textarea
                id="blog-excerpt-en"
                rows={2}
                {...form.register("excerptEn")}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="blog-content">{t("contentFa")}</Label>
              <Textarea id="blog-content" rows={4} {...form.register("content")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog-content-en">{t("contentEn")}</Label>
              <Textarea
                id="blog-content-en"
                rows={4}
                {...form.register("contentEn")}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="blog-author">{t("authorFa")}</Label>
              <Input id="blog-author" {...form.register("authorName")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog-author-en">{t("authorEn")}</Label>
              <Input id="blog-author-en" {...form.register("authorNameEn")} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("status")}</Label>
              <Select
                value={form.watch("status")}
                onValueChange={(v) =>
                  form.setValue("status", v as BlogPost["status"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BLOG_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {t(`statuses.${status}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog-tags">{t("tags")}</Label>
              <Input
                id="blog-tags"
                dir="ltr"
                placeholder="saas, rtl"
                {...form.register("tags")}
              />
            </div>
          </div>
          <DrawerFooter className="px-0">
            <Button type="submit" loading={createPost.isPending || updatePost.isPending}>
              {t("save")}
            </Button>
            <DrawerClose asChild>
              <Button type="button" variant="outline">
                {t("cancel")}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
