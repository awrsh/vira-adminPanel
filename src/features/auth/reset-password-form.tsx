"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuthFlowStore } from "@/features/auth/auth-flow-store";
import { useResetPassword } from "@/features/auth/hooks";
import { AuthShell } from "@/features/auth/auth-shell";
import { PasswordField } from "@/features/auth/password-field";
import {
  createResetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/features/auth/schemas";
import { useAuthValidationMessages } from "@/features/auth/use-auth-validation";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function ResetPasswordForm() {
  const t = useTranslations();
  const router = useRouter();
  const messages = useAuthValidationMessages();
  const schema = useMemo(
    () => createResetPasswordSchema(messages),
    [messages],
  );
  const recoveryEmail = useAuthFlowStore((s) => s.recoveryEmail);
  const reset = useResetPassword();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (!recoveryEmail) {
      router.replace("/forgot-password");
    }
  }, [recoveryEmail, router]);

  async function onSubmit(values: ResetPasswordFormValues) {
    if (!recoveryEmail) return;
    try {
      await reset.mutateAsync({
        email: recoveryEmail,
        password: values.password,
      });
      toast.success(t("auth.resetSuccess"));
      router.replace("/login");
    } catch {
      // Alert
    }
  }

  return (
    <AuthShell
      title={t("auth.resetTitle")}
      subtitle={t("auth.resetSubtitle")}
      footer={
        <p className="text-center text-sm">
          <Link href="/login" className="font-medium text-primary hover:underline">
            {t("auth.backToLogin")}
          </Link>
        </p>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {reset.error ? (
          <Alert variant="danger" title={t("common.errorTitle")}>
            <p>{t("auth.errors.resetFailed")}</p>
          </Alert>
        ) : null}

        <PasswordField
          floatingLabel={t("auth.password")}
          autoComplete="new-password"
          error={form.formState.errors.password?.message}
          {...form.register("password")}
        />
        <PasswordField
          floatingLabel={t("auth.confirmPassword")}
          autoComplete="new-password"
          error={form.formState.errors.confirmPassword?.message}
          {...form.register("confirmPassword")}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full"
          loading={reset.isPending}
        >
          {t("auth.resetPassword")}
        </Button>
      </form>
    </AuthShell>
  );
}
