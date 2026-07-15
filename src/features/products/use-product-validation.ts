"use client";

import { useTranslations } from "next-intl";
import type { ProductValidationMessages } from "@/features/products/schemas";

export function useProductValidationMessages(): ProductValidationMessages {
  const t = useTranslations("products.validation");
  return {
    nameRequired: t("nameRequired"),
    nameMin: t("nameMin"),
    nameEnRequired: t("nameEnRequired"),
    skuRequired: t("skuRequired"),
    skuMin: t("skuMin"),
    categoryRequired: t("categoryRequired"),
    categoryEnRequired: t("categoryEnRequired"),
    priceRequired: t("priceRequired"),
    priceMin: t("priceMin"),
    stockRequired: t("stockRequired"),
    stockMin: t("stockMin"),
    statusRequired: t("statusRequired"),
    descriptionRequired: t("descriptionRequired"),
    descriptionEnRequired: t("descriptionEnRequired"),
  };
}
