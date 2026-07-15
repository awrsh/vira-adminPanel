"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  useCreateComment,
  useUpdateComment,
} from "@/features/comments/hooks";
import {
  COMMENT_STATUSES,
  createCommentSchema,
  type CommentFormValues,
} from "@/features/comments/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
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
import type { CustomerComment } from "@/types";

interface CommentFormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comment: CustomerComment | null;
}

export function CommentFormDrawer({
  open,
  onOpenChange,
  comment,
}: CommentFormDrawerProps) {
  const t = useTranslations("comments");
  const createComment = useCreateComment();
  const updateComment = useUpdateComment();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(createCommentSchema()),
    values: comment
      ? {
          name: comment.name,
          nameEn: comment.nameEn,
          role: comment.role,
          roleEn: comment.roleEn,
          body: comment.body,
          bodyEn: comment.bodyEn,
          rating: comment.rating,
          product: comment.product,
          productEn: comment.productEn,
          status: comment.status,
        }
      : {
          name: "",
          nameEn: "",
          role: "",
          roleEn: "",
          body: "",
          bodyEn: "",
          rating: 5,
          product: "",
          productEn: "",
          status: "pending",
        },
  });

  async function onSubmit(values: CommentFormValues) {
    try {
      const now = new Date().toISOString();
      if (comment) {
        await updateComment.mutateAsync({
          id: comment.id,
          patch: { ...values, likes: comment.likes },
        });
      } else {
        await createComment.mutateAsync({
          ...values,
          likes: 0,
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
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {comment ? t("edit") : t("create")}
          </DrawerTitle>
        </DrawerHeader>
        <form
          className="space-y-4 px-4 pb-2 sm:px-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("nameFa")}</Label>
              <Input {...form.register("name")} />
            </div>
            <div className="space-y-2">
              <Label>{t("nameEn")}</Label>
              <Input {...form.register("nameEn")} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("roleFa")}</Label>
              <Input {...form.register("role")} />
            </div>
            <div className="space-y-2">
              <Label>{t("roleEn")}</Label>
              <Input {...form.register("roleEn")} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("bodyFa")}</Label>
              <Textarea rows={3} {...form.register("body")} />
            </div>
            <div className="space-y-2">
              <Label>{t("bodyEn")}</Label>
              <Textarea rows={3} {...form.register("bodyEn")} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>{t("productFa")}</Label>
              <Input {...form.register("product")} />
            </div>
            <div className="space-y-2">
              <Label>{t("productEn")}</Label>
              <Input {...form.register("productEn")} />
            </div>
            <div className="space-y-2">
              <Label>{t("rating")}</Label>
              <Input
                type="number"
                min={1}
                max={5}
                {...form.register("rating", { valueAsNumber: true })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>{t("statusLabel")}</Label>
            <Select
              value={form.watch("status")}
              onValueChange={(v) =>
                form.setValue("status", v as CustomerComment["status"])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COMMENT_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {t(`statuses.${status}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DrawerFooter className="px-0">
            <Button
              type="submit"
              loading={createComment.isPending || updateComment.isPending}
            >
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
