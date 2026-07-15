"use client";

import { useTranslations } from "next-intl";
import type { AuthValidationMessages } from "@/features/auth/schemas";

/** Localized Zod messages for auth forms. */
export function useAuthValidationMessages(): AuthValidationMessages {
  const t = useTranslations("auth.validation");
  return {
    emailRequired: t("emailRequired"),
    emailInvalid: t("emailInvalid"),
    passwordRequired: t("passwordRequired"),
    passwordMin: t("passwordMin"),
    confirmRequired: t("confirmRequired"),
    passwordsMismatch: t("passwordsMismatch"),
    nameRequired: t("nameRequired"),
    nameMin: t("nameMin"),
    otpRequired: t("otpRequired"),
    otpLength: t("otpLength"),
  };
}
