"use client";

import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import {
  AuthDemoHeader,
  AuthLayoutSide,
  AuthLayoutSimple,
  AuthLayoutSplit,
  DemoAuthFields,
} from "@/features/showcase/auth-layouts";
import {
  AUTH_DEMOS,
  isAuthDemoSlug,
  type AuthDemoSlug,
} from "@/features/showcase/catalog";
import { toast } from "sonner";

function RegisterDemo() {
  const t = useTranslations("showcase");
  return (
    <>
      <AuthDemoHeader title={t("authRegister")} subtitle={t("authRegisterHint")} />
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          toast.message(t("demoOnly"));
        }}
      >
        <div className="space-y-2">
          <Label>{t("name")}</Label>
          <Input defaultValue="Sara Ahmadi" />
        </div>
        <div className="space-y-2">
          <Label>{t("email")}</Label>
          <Input type="email" defaultValue="sara@atlas.dev" />
        </div>
        <div className="space-y-2">
          <Label>{t("password")}</Label>
          <PasswordInput defaultValue="password" />
        </div>
        <Button type="submit" className="w-full">
          {t("signUp")}
        </Button>
      </form>
    </>
  );
}

function ForgotDemo() {
  const t = useTranslations("showcase");
  return (
    <>
      <AuthDemoHeader title={t("authForgot")} subtitle={t("authForgotHint")} />
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          toast.message(t("demoOnly"));
        }}
      >
        <div className="space-y-2">
          <Label>{t("email")}</Label>
          <Input type="email" defaultValue="admin@atlas.dev" />
        </div>
        <Button type="submit" className="w-full">
          {t("sendCode")}
        </Button>
      </form>
    </>
  );
}

function ResetDemo() {
  const t = useTranslations("showcase");
  return (
    <>
      <AuthDemoHeader title={t("authReset")} subtitle={t("authResetHint")} />
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          toast.message(t("demoOnly"));
        }}
      >
        <div className="space-y-2">
          <Label>{t("password")}</Label>
          <PasswordInput defaultValue="password" />
        </div>
        <div className="space-y-2">
          <Label>{t("confirmPassword")}</Label>
          <PasswordInput defaultValue="password" />
        </div>
        <Button type="submit" className="w-full">
          {t("savePassword")}
        </Button>
      </form>
    </>
  );
}

function OtpDemo() {
  const t = useTranslations("showcase");
  return (
    <>
      <AuthDemoHeader title={t("authOtp")} subtitle={t("authOtpHint")} />
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          toast.message(t("demoOnly"));
        }}
      >
        <div className="flex justify-center" dir="ltr">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button type="submit" className="w-full">
          {t("verify")}
        </Button>
      </form>
    </>
  );
}

function LoginBody({ slug }: { slug: AuthDemoSlug }) {
  const t = useTranslations("showcase");
  if (slug === "register") return <RegisterDemo />;
  if (slug === "forgot-password") return <ForgotDemo />;
  if (slug === "reset-password") return <ResetDemo />;
  if (slug === "otp") return <OtpDemo />;
  return (
    <>
      <AuthDemoHeader title={t("signIn")} subtitle={t("loginHint")} />
      <DemoAuthFields />
    </>
  );
}

export function AuthDemoPage({ slug }: { slug: string }) {
  const t = useTranslations("showcase");
  if (!isAuthDemoSlug(slug)) notFound();

  const meta = AUTH_DEMOS.find((item) => item.slug === slug)!;
  const body = <LoginBody slug={slug} />;

  let layout = <AuthLayoutSide>{body}</AuthLayoutSide>;
  if (slug === "login-simple") layout = <AuthLayoutSimple>{body}</AuthLayoutSimple>;
  if (slug === "login-split") layout = <AuthLayoutSplit>{body}</AuthLayoutSplit>;
  if (
    slug === "register" ||
    slug === "forgot-password" ||
    slug === "reset-password" ||
    slug === "otp"
  ) {
    layout = <AuthLayoutSimple>{body}</AuthLayoutSimple>;
  }

  return (
    <div className="space-y-6">
      <PageHeader title={t(meta.labelKey)} description={t("authDemoHint")} />
      {layout}
    </div>
  );
}
