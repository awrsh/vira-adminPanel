"use client";

import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { Link } from "@/i18n/navigation";
import { cn } from "@/utils";

/** Non-submitting demo credentials form for layout showcases. */
export function DemoAuthFields({ className }: { className?: string }) {
  const t = useTranslations("showcase");

  return (
    <form
      className={cn("space-y-4", className)}
      onSubmit={(e) => {
        e.preventDefault();
        toast.message(t("demoOnly"));
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="demo-email">{t("email")}</Label>
        <Input
          id="demo-email"
          type="email"
          defaultValue="admin@atlas.dev"
          autoComplete="username"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="demo-password">{t("password")}</Label>
          <span className="text-xs text-muted-foreground">
            {t("forgotShort")}
          </span>
        </div>
        <PasswordInput id="demo-password" defaultValue="password" />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="demo-remember" defaultChecked />
        <Label htmlFor="demo-remember" className="font-normal">
          {t("remember")}
        </Label>
      </div>
      <Button type="submit" className="w-full">
        {t("signIn")}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        {t("noAccount")}{" "}
        <Link href="/showcase/auth/register" className="text-primary underline-offset-2 hover:underline">
          {t("signUp")}
        </Link>
      </p>
    </form>
  );
}

export function AuthDemoHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <header className="mb-6 space-y-2 text-start">
      <h1 className="font-persian text-2xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </header>
  );
}

/** Centered single-card auth layout. */
export function AuthLayoutSimple({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[32rem] items-center justify-center overflow-hidden rounded-2xl border border-border bg-background p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_60%)]"
      />
      <div className="relative w-full max-w-md rounded-surface border border-border/80 bg-card p-6 shadow-float-lg sm:p-8">
        {children}
      </div>
    </div>
  );
}

/** Side brand panel + form (current Atlas AuthShell feel). */
export function AuthLayoutSide({ children }: { children: React.ReactNode }) {
  const t = useTranslations("showcase");
  return (
    <div className="grid min-h-[32rem] overflow-hidden rounded-2xl border border-border bg-background lg:grid-cols-2">
      <aside className="hidden flex-col justify-between bg-muted/40 p-8 lg:flex">
        <div className="space-y-3 text-start">
          <p className="font-persian text-3xl font-semibold">{t("brand")}</p>
          <p className="max-w-xs text-sm text-muted-foreground">
            {t("brandTagline")}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">{t("demoBadge")}</p>
      </aside>
      <div className="flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

/** Split media + form layout. */
export function AuthLayoutSplit({ children }: { children: React.ReactNode }) {
  const t = useTranslations("showcase");
  return (
    <div className="grid min-h-[32rem] overflow-hidden rounded-2xl border border-border lg:grid-cols-2">
      <div className="relative hidden min-h-72 bg-[linear-gradient(145deg,color-mix(in_oklab,var(--primary)_35%,#0f172a),#0b1220)] p-8 text-white lg:flex lg:flex-col lg:justify-end">
        <p className="text-sm/relaxed text-white/80">{t("splitHint")}</p>
        <p className="mt-2 font-persian text-2xl font-semibold">{t("brand")}</p>
      </div>
      <div className="flex items-center justify-center bg-card p-6 sm:p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
