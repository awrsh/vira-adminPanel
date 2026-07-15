"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import { ApiError } from "@/lib/api/errors";
import { useLogin } from "@/features/auth/hooks";
import { AuthShell } from "@/features/auth/auth-shell";
import { PasswordField } from "@/features/auth/password-field";
import {
  createLoginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas";
import { useAuthValidationMessages } from "@/features/auth/use-auth-validation";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const t = useTranslations();
  const router = useRouter();
  const messages = useAuthValidationMessages();
  const schema = useMemo(() => createLoginSchema(messages), [messages]);
  const login = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "admin@atlas.dev",
      password: "password",
      remember: true,
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      await login.mutateAsync(values);
      toast.success(t("auth.loginSuccess"));
      router.replace("/dashboard");
    } catch {
      // Error surfaces via Alert from mutation state
    }
  }

  const errorMessage =
    login.error instanceof ApiError
      ? t("auth.errors.invalidCredentials")
      : login.error
        ? t("common.errorDescription")
        : null;

  return (
    <AuthShell
      title={t("auth.loginTitle")}
      subtitle={t("auth.loginSubtitle")}
      footer={
        <p className="text-center text-sm text-muted-foreground">
          {t("auth.noAccount")}{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            {t("auth.register")}
          </Link>
        </p>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {errorMessage ? (
          <Alert variant="danger" title={t("common.errorTitle")}>
            <p>{errorMessage}</p>
          </Alert>
        ) : null}

        <Input
          floatingLabel={t("auth.email")}
          type="email"
          autoComplete="email"
          error={form.formState.errors.email?.message}
          {...form.register("email")}
        />

        <PasswordField
          floatingLabel={t("auth.password")}
          autoComplete="current-password"
          error={form.formState.errors.password?.message}
          {...form.register("password")}
        />

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={form.watch("remember")}
              onCheckedChange={(value) =>
                form.setValue("remember", value === true, {
                  shouldDirty: true,
                })
              }
            />
            <Label htmlFor="remember" className="cursor-pointer text-sm">
              {t("auth.rememberMe")}
            </Label>
          </div>
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-primary hover:underline"
          >
            {t("auth.forgotPassword")}
          </Link>
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">
          {t("common.demoCredentials")}
        </p>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          loading={login.isPending}
        >
          {t("auth.login")}
        </Button>
      </form>
    </AuthShell>
  );
}
