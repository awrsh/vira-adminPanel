"use client";

import { useTranslations } from "next-intl";
import type { OrderValidationMessages } from "@/features/orders/schemas";

export function useOrderValidationMessages(): OrderValidationMessages {
  const t = useTranslations("orders.validation");
  return {
    orderNumberRequired: t("orderNumberRequired"),
    orderNumberMin: t("orderNumberMin"),
    customerRequired: t("customerRequired"),
    customerMin: t("customerMin"),
    customerEnRequired: t("customerEnRequired"),
    emailRequired: t("emailRequired"),
    emailInvalid: t("emailInvalid"),
    cityRequired: t("cityRequired"),
    cityEnRequired: t("cityEnRequired"),
    totalRequired: t("totalRequired"),
    totalMin: t("totalMin"),
    itemsRequired: t("itemsRequired"),
    itemsMin: t("itemsMin"),
    statusRequired: t("statusRequired"),
    paymentRequired: t("paymentRequired"),
  };
}
