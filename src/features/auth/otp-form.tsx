"use client";

import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import { ApiError } from "@/lib/api/errors";
import { useAuthFlowStore } from "@/features/auth/auth-flow-store";
import { useResendOtp, useVerifyOtp } from "@/features/auth/hooks";
import { AuthShell } from "@/features/auth/auth-shell";
import {
  createOtpSchema,
  type OtpFormValues,
} from "@/features/auth/schemas";
import { useAuthValidationMessages } from "@/features/auth/use-auth-validation";
import { createDemoSession, useAuthStore } from "@/stores/auth-store";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OtpFormProps {
  mode?: "otp" | "twoFactor";
}

export function OtpForm({ mode = "otp" }: OtpFormProps) {
  const t = useTranslations();
  const router = useRouter();
  const messages = useAuthValidationMessages();
  const schema = useMemo(() => createOtpSchema(messages), [messages]);
  const recoveryEmail = useAuthFlowStore((s) => s.recoveryEmail);
  const setSession = useAuthStore((s) => s.setSession);
  const verify = useVerifyOtp();
  const resend = useResendOtp();

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { code: "" },
  });

  useEffect(() => {
    if (mode === "otp" && !recoveryEmail) {
      router.replace("/forgot-password");
    }
  }, [mode, recoveryEmail, router]);

  async function onSubmit(values: OtpFormValues) {
    if (mode === "twoFactor") {
      if (values.code !== "123456") {
        form.setError("code", { message: t("auth.errors.invalidOtp") });
        return;
      }
      setSession(createDemoSession(), true);
      toast.success(t("auth.otpSuccess"));
      router.replace("/dashboard");
      return;
    }

    if (!recoveryEmail) return;

    try {
      await verify.mutateAsync({ email: recoveryEmail, code: values.code });
      toast.success(t("auth.otpSuccess"));
      router.push("/reset-password");
    } catch (error) {
      const message =
        error instanceof ApiError
          ? t("auth.errors.invalidOtp")
          : t("common.errorDescription");
      form.setError("code", { message });
    }
  }

  async function handleResend() {
    if (!recoveryEmail) return;
    try {
      const result = await resend.mutateAsync({ email: recoveryEmail });
      toast.success(t("auth.resendSuccess", { code: result.demoOtp }));
    } catch {
      toast.error(t("common.errorDescription"));
    }
  }

  const errorMessage =
    form.formState.errors.code?.message ??
    (verify.error ? t("auth.errors.invalidOtp") : null);

  return (
    <AuthShell
      title={mode === "otp" ? t("auth.otpTitle") : t("auth.twoFactorTitle")}
      subtitle={
        mode === "otp" ? t("auth.otpSubtitle") : t("auth.twoFactorSubtitle")
      }
      footer={
        mode === "otp" ? (
          <p className="text-center text-sm">
            <Link
              href="/forgot-password"
              className="font-medium text-primary hover:underline"
            >
              {t("common.back")}
            </Link>
          </p>
        ) : null
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {mode === "otp" && recoveryEmail ? (
          <p className="text-center text-sm text-muted-foreground">
            {t("auth.codeSentTo", { email: recoveryEmail })}
          </p>
        ) : null}

        {errorMessage ? (
          <Alert variant="danger" title={t("common.errorTitle")}>
            <p>{errorMessage}</p>
          </Alert>
        ) : null}

        <Controller
          control={form.control}
          name="code"
          render={({ field }) => (
            <div className="flex justify-center" dir="ltr">
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
                autoFocus
              >
                <InputOTPGroup>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
          )}
        />

        <Alert variant="info" title={t("auth.demoOtpHintTitle")}>
          <p>{t("auth.demoOtpHint")}</p>
        </Alert>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          loading={verify.isPending}
          disabled={form.watch("code").length < 6}
        >
          {t("auth.verify")}
        </Button>

        {mode === "otp" ? (
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            loading={resend.isPending}
            onClick={handleResend}
          >
            {t("auth.resendCode")}
          </Button>
        ) : null}
      </form>
    </AuthShell>
  );
}
