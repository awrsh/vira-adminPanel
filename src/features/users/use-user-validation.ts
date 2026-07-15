"use client";

import { useTranslations } from "next-intl";
import type { UserValidationMessages } from "@/features/users/schemas";

export function useUserValidationMessages(): UserValidationMessages {
  const t = useTranslations("users.validation");
  return {
    nameRequired: t("nameRequired"),
    nameMin: t("nameMin"),
    nameEnRequired: t("nameEnRequired"),
    emailRequired: t("emailRequired"),
    emailInvalid: t("emailInvalid"),
    phoneRequired: t("phoneRequired"),
    phoneMin: t("phoneMin"),
    nationalIdRequired: t("nationalIdRequired"),
    nationalIdMin: t("nationalIdMin"),
    cityRequired: t("cityRequired"),
    cityEnRequired: t("cityEnRequired"),
    addressRequired: t("addressRequired"),
    roleRequired: t("roleRequired"),
    statusRequired: t("statusRequired"),
  };
}
