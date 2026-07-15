"use client";

import * as React from "react";
import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  useCreateProduct,
  useUpdateProduct,
} from "@/features/products/hooks";
import {
  PRODUCT_STATUSES,
  createProductSchema,
  type ProductFormValues,
} from "@/features/products/schemas";
import { useProductValidationMessages } from "@/features/products/use-product-validation";
import { useCategories } from "@/hooks/api";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { ImagePreview } from "@/components/ui/image-preview";
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
import type { Category, Product } from "@/types";

interface ProductFormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export function ProductFormDrawer({
  open,
  onOpenChange,
  product,
}: ProductFormDrawerProps) {
  const t = useTranslations();
  const locale = useLocale();
  const messages = useProductValidationMessages();
  const schema = useMemo(() => createProductSchema(messages), [messages]);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const categoriesQuery = useCategories({ pageSize: 100, sortBy: "name" });
  const editing = Boolean(product);

  const [imageFiles, setImageFiles] = React.useState<File[]>([]);
  const [imagePreview, setImagePreview] = React.useState<string | null>(
    product?.image ?? null,
  );

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(schema),
    values: product
      ? {
          name: product.name,
          nameEn: product.nameEn,
          sku: product.sku,
          category: product.category,
          categoryEn: product.categoryEn,
          price: product.price,
          stock: product.stock,
          status: product.status,
          description: product.description,
          descriptionEn: product.descriptionEn,
        }
      : {
          name: "",
          nameEn: "",
          sku: "",
          category: "",
          categoryEn: "",
          price: 0,
          stock: 0,
          status: "published",
          description: "",
          descriptionEn: "",
        },
  });

  const statusValue = useWatch({ control: form.control, name: "status" });
  const categoryValue = useWatch({ control: form.control, name: "category" });

  const categories = categoriesQuery.data?.data ?? [];

  function revokeIfBlob(url: string | null) {
    if (url?.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  }

  function handleFilesChange(files: File[]) {
    setImageFiles(files);
    setImagePreview((prev) => {
      revokeIfBlob(prev);
      if (files[0]) return URL.createObjectURL(files[0]);
      return product?.image ?? null;
    });
  }

  function handleOpenChange(next: boolean) {
    if (!next) {
      setImagePreview((prev) => {
        revokeIfBlob(prev);
        return product?.image ?? null;
      });
      setImageFiles([]);
    }
    onOpenChange(next);
  }

  function applyCategory(category: Category) {
    form.setValue("category", category.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    form.setValue("categoryEn", category.nameEn, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  async function onSubmit(values: ProductFormValues) {
    try {
      const payload = {
        ...values,
        image: imagePreview ?? undefined,
        createdAt: product?.createdAt ?? new Date().toISOString(),
      };
      if (product) {
        await updateProduct.mutateAsync({ id: product.id, patch: payload });
      } else {
        await createProduct.mutateAsync(payload);
      }
      toast.success(t("products.saved"));
      handleOpenChange(false);
    } catch {
      toast.error(t("common.errorDescription"));
    }
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {editing ? t("products.editTitle") : t("products.createTitle")}
          </DrawerTitle>
          <DrawerDescription>{t("products.formHint")}</DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col overflow-hidden"
          noValidate
        >
          <div className="flex-1 space-y-4 overflow-y-auto px-6 pb-4">
            <div className="space-y-2">
              <Label>{t("products.image")}</Label>
              <FileUpload
                value={imageFiles}
                onChange={handleFilesChange}
                multiple={false}
                maxFiles={1}
                accept={{ "image/*": [] }}
                label={t("products.imageHint")}
                hint={t("products.imageFormats")}
                showPreview
              />
              {imagePreview && imageFiles.length === 0 ? (
                <ImagePreview
                  src={imagePreview}
                  alt={t("products.image")}
                  className="h-28 w-full rounded-2xl object-cover"
                />
              ) : null}
            </div>

            <Input
              floatingLabel={t("products.name")}
              error={form.formState.errors.name?.message}
              {...form.register("name")}
            />
            <Input
              floatingLabel={t("products.nameEn")}
              error={form.formState.errors.nameEn?.message}
              {...form.register("nameEn")}
            />
            <Input
              floatingLabel={t("products.sku")}
              error={form.formState.errors.sku?.message}
              {...form.register("sku")}
            />

            <div className="space-y-2">
              <Label>{t("products.category")}</Label>
              <Select
                value={categoryValue || undefined}
                onValueChange={(value) => {
                  const match = categories.find((item) => item.name === value);
                  if (match) applyCategory(match);
                }}
              >
                <SelectTrigger
                  aria-invalid={Boolean(form.formState.errors.category)}
                >
                  <SelectValue placeholder={t("products.selectCategory")} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {locale === "fa" ? category.name : category.nameEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.category?.message ? (
                <p className="text-xs text-destructive">
                  {form.formState.errors.category.message}
                </p>
              ) : null}
            </div>

            <Input
              floatingLabel={t("products.price")}
              type="number"
              inputMode="numeric"
              error={form.formState.errors.price?.message}
              {...form.register("price", { valueAsNumber: true })}
            />
            <Input
              floatingLabel={t("products.stock")}
              type="number"
              inputMode="numeric"
              error={form.formState.errors.stock?.message}
              {...form.register("stock", { valueAsNumber: true })}
            />

            <div className="space-y-2">
              <Label>{t("common.status")}</Label>
              <Select
                value={statusValue}
                onValueChange={(value) =>
                  form.setValue("status", value as Product["status"], {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              >
                <SelectTrigger
                  aria-invalid={Boolean(form.formState.errors.status)}
                >
                  <SelectValue placeholder={t("common.status")} />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {t(`products.statuses.${status}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Textarea
              floatingLabel={t("products.description")}
              error={form.formState.errors.description?.message}
              {...form.register("description")}
            />
            <Textarea
              floatingLabel={t("products.descriptionEn")}
              error={form.formState.errors.descriptionEn?.message}
              {...form.register("descriptionEn")}
            />
          </div>

          <DrawerFooter>
            <Button
              type="submit"
              loading={createProduct.isPending || updateProduct.isPending}
            >
              {t("common.save")}
            </Button>
            <DrawerClose asChild>
              <Button type="button" variant="outline">
                {t("common.cancel")}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
