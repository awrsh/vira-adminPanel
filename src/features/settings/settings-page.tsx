"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import {
  Bell,
  Building2,
  CreditCard,
  Globe2,
  KeyRound,
  Palette,
  Shield,
  SlidersHorizontal,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/utils";

const SECTIONS = [
  { id: "general", icon: SlidersHorizontal },
  { id: "company", icon: Building2 },
  { id: "security", icon: Shield },
  { id: "theme", icon: Palette },
  { id: "language", icon: Globe2 },
  { id: "notifications", icon: Bell },
  { id: "profile", icon: UserRound },
  { id: "api", icon: KeyRound },
  { id: "billing", icon: CreditCard },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

function SettingsSection({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/70 pb-5">
        <div className="max-w-xl space-y-1 text-start">
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function SettingRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 border-b border-border/50 py-4 last:border-b-0 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:items-center sm:gap-8">
      <div className="space-y-1 text-start">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint ? (
          <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p>
        ) : null}
      </div>
      <div className="min-w-0 sm:justify-self-stretch">{children}</div>
    </div>
  );
}

/** Settings hub with profile, workspace, security, theme, language, billing. */
export function SettingsPageView() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const user = useAuthStore((s) => s.user);
  const [section, setSection] = React.useState<SectionId>("general");

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
  }

  function save() {
    toast.success(t("common.success"));
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={t("settings.title")}
        description={t("settings.subtitle")}
      />

      <div className="grid gap-8 lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-10">
        <nav
          className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
          aria-label={t("settings.navLabel")}
        >
          {SECTIONS.map(({ id, icon: Icon }) => {
            const active = section === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSection(id)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary-soft font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                )}
              >
                <Icon className="size-4 shrink-0 opacity-80" aria-hidden />
                <span className="whitespace-nowrap">
                  {t(`settings.${id === "api" ? "apiKeys" : id}`)}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="min-w-0 rounded-surface border border-border/80 bg-card/40 px-5 py-6 sm:px-7 sm:py-8">
          {section === "general" ? (
            <SettingsSection
              title={t("settings.general")}
              description={t("settings.generalHint")}
              action={
                <Button size="sm" onClick={save}>
                  {t("common.save")}
                </Button>
              }
            >
              <SettingRow label={t("common.appName")}>
                <Input defaultValue={t("common.appName")} />
              </SettingRow>
              <SettingRow
                label={t("settings.timezone")}
                hint={t("settings.timezoneHint")}
              >
                <Input defaultValue="Asia/Tehran" />
              </SettingRow>
            </SettingsSection>
          ) : null}

          {section === "company" ? (
            <SettingsSection
              title={t("settings.company")}
              description={t("settings.companyHint")}
              action={
                <Button size="sm" onClick={save}>
                  {t("common.save")}
                </Button>
              }
            >
              <SettingRow label={t("settings.companyName")}>
                <Input defaultValue="Atlas Soft" />
              </SettingRow>
              <SettingRow label={t("settings.website")}>
                <Input defaultValue="https://atlas.dev" />
              </SettingRow>
              <SettingRow label={t("settings.taxId")}>
                <Input defaultValue="1400-123456" />
              </SettingRow>
            </SettingsSection>
          ) : null}

          {section === "security" ? (
            <SettingsSection
              title={t("settings.security")}
              description={t("settings.securityHint")}
            >
              <SettingRow
                label={t("auth.twoFactor")}
                hint={t("auth.twoFactorSubtitle")}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Switch defaultChecked />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/two-factor")}
                  >
                    {t("settings.configure2fa")}
                  </Button>
                </div>
              </SettingRow>
            </SettingsSection>
          ) : null}

          {section === "theme" ? (
            <SettingsSection
              title={t("settings.theme")}
              description={t("settings.themeHint")}
            >
              <SettingRow label={t("settings.appearance")}>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">{t("common.light")}</SelectItem>
                    <SelectItem value="dark">{t("common.dark")}</SelectItem>
                    <SelectItem value="system">{t("common.system")}</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
            </SettingsSection>
          ) : null}

          {section === "language" ? (
            <SettingsSection
              title={t("settings.language")}
              description={t("settings.languageHint")}
            >
              <SettingRow label={t("settings.interfaceLanguage")}>
                <Select value={locale} onValueChange={switchLocale}>
                  <SelectTrigger className="max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fa">فارسی</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
            </SettingsSection>
          ) : null}

          {section === "notifications" ? (
            <SettingsSection
              title={t("settings.notifications")}
              description={t("settings.notificationsHint")}
            >
              {(
                [
                  {
                    id: "email",
                    label: t("settings.notifyEmail"),
                    defaultChecked: true,
                  },
                  {
                    id: "push",
                    label: t("settings.notifyPush"),
                    defaultChecked: true,
                  },
                  {
                    id: "sms",
                    label: t("settings.notifySms"),
                    defaultChecked: false,
                  },
                ] as const
              ).map((channel) => (
                <SettingRow key={channel.id} label={channel.label}>
                  <div className="flex justify-end sm:justify-start">
                    <Switch defaultChecked={channel.defaultChecked} />
                  </div>
                </SettingRow>
              ))}
            </SettingsSection>
          ) : null}

          {section === "profile" ? (
            <SettingsSection
              title={t("settings.profile")}
              description={t("settings.profileHint")}
              action={
                <Button size="sm" onClick={save}>
                  {t("common.save")}
                </Button>
              }
            >
              <SettingRow label={t("auth.name")}>
                <Input defaultValue={user?.name ?? ""} />
              </SettingRow>
              <SettingRow label={t("auth.email")}>
                <Input defaultValue={user?.email ?? ""} />
              </SettingRow>
              <SettingRow label={t("users.role")}>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{user?.role}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {t("settings.permissionCount", {
                      count: user?.permissions.length ?? 0,
                    })}
                  </span>
                </div>
              </SettingRow>
            </SettingsSection>
          ) : null}

          {section === "api" ? (
            <SettingsSection
              title={t("settings.apiKeys")}
              description={t("settings.apiHint")}
              action={
                <Button variant="outline" size="sm" onClick={save}>
                  {t("settings.rotateKeys")}
                </Button>
              }
            >
              <SettingRow label={t("settings.publishableKey")}>
                <Input defaultValue="pk_live_atlas_••••••••" readOnly />
              </SettingRow>
              <SettingRow label={t("settings.secretKey")}>
                <Input defaultValue="sk_live_atlas_••••••••" readOnly />
              </SettingRow>
            </SettingsSection>
          ) : null}

          {section === "billing" ? (
            <SettingsSection
              title={t("settings.billing")}
              description={t("settings.billingHint")}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-muted/40 px-4 py-4">
                <div className="space-y-1 text-start">
                  <p className="font-medium">{t("landing.planPro")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("landing.planProDesc")}
                  </p>
                </div>
                <Badge variant="success">{t("common.active")}</Badge>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm">
                  {t("landing.buyNow")}
                </Button>
              </div>
            </SettingsSection>
          ) : null}
        </div>
      </div>
    </div>
  );
}
