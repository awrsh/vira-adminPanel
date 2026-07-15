"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import { useForgotPassword } from "@/features/auth/hooks";
import { AuthShell } from "@/features/auth/auth-shell";
import {
  createForgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/features/auth/schemas";
import { useAuthValidationMessages } from "@/features/auth/use-auth-validation";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ForgotPasswordForm() {
  const t = useTranslations();
  const router = useRouter();
  const messages = useAuthValidationMessages();
  const schema = useMemo(
    () => createForgotPasswordSchema(messages),
    [messages],
  );
  const forgot = useForgotPassword();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    try {
      const result = await forgot.mutateAsync(values);
      toast.success(t("auth.forgotSuccess", { code: result.demoOtp }));
      router.push("/otp");
    } catch {
      // Alert
    }
  }

  return (
    <AuthShell
      title={t("auth.forgotTitle")}
      subtitle={t("auth.forgotSubtitle")}
      footer={
        <p className="text-center text-sm">
          <Link href="/login" className="font-medium text-primary hover:underline">
            {t("auth.backToLogin")}
          </Link>
        </p>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {forgot.error ? (
          <Alert variant="danger" title={t("common.errorTitle")}>
            <p>{t("common.errorDescription")}</p>
          </Alert>
        ) : null}

        <Input
          floatingLabel={t("auth.email")}
          type="email"
          autoComplete="email"
          error={form.formState.errors.email?.message}
          {...form.register("email")}
        />

        <Alert variant="info" title={t("auth.demoOtpHintTitle")}>
          <p>{t("auth.demoOtpHint")}</p>
        </Alert>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          loading={forgot.isPending}
        >
          {t("auth.sendCode")}
        </Button>
      </form>
    </AuthShell>
  );
}
