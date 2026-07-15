"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import { ApiError } from "@/lib/api/errors";
import { useRegister } from "@/features/auth/hooks";
import { AuthShell } from "@/features/auth/auth-shell";
import { PasswordField } from "@/features/auth/password-field";
import {
  createRegisterSchema,
  type RegisterFormValues,
} from "@/features/auth/schemas";
import { useAuthValidationMessages } from "@/features/auth/use-auth-validation";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const t = useTranslations();
  const router = useRouter();
  const messages = useAuthValidationMessages();
  const schema = useMemo(() => createRegisterSchema(messages), [messages]);
  const register = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    try {
      await register.mutateAsync({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      toast.success(t("auth.registerSuccess"));
      router.replace("/dashboard");
    } catch {
      // shown via Alert
    }
  }

  const errorMessage =
    register.error instanceof ApiError && register.error.code === "CONFLICT"
      ? t("auth.errors.emailTaken")
      : register.error
        ? t("common.errorDescription")
        : null;

  return (
    <AuthShell
      title={t("auth.registerTitle")}
      subtitle={t("auth.registerSubtitle")}
      footer={
        <p className="text-center text-sm text-muted-foreground">
          {t("auth.hasAccount")}{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            {t("auth.login")}
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
          floatingLabel={t("auth.name")}
          autoComplete="name"
          error={form.formState.errors.name?.message}
          {...form.register("name")}
        />
        <Input
          floatingLabel={t("auth.email")}
          type="email"
          autoComplete="email"
          error={form.formState.errors.email?.message}
          {...form.register("email")}
        />
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
          loading={register.isPending}
        >
          {t("auth.register")}
        </Button>
      </form>
    </AuthShell>
  );
}
