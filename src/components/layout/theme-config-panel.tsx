"use client";

import * as React from "react";
import { Check, Copy, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/types";
import { cn } from "@/utils";
import {
  ACCENT_PRESETS,
  LAYOUT_OPTIONS,
  applyAccentToDocument,
  useUiPreferencesStore,
  type LayoutMode,
} from "@/stores/ui-preferences-store";

function LayoutPreview({ mode, active }: { mode: LayoutMode; active: boolean }) {
  return (
    <div
      className={cn(
        "flex h-14 w-full flex-col overflow-hidden rounded-lg border bg-muted/40 p-1",
        active ? "border-primary" : "border-border",
      )}
      aria-hidden
    >
      {mode === "topbar" ? (
        <>
          <div className="h-2 rounded-sm bg-foreground/20" />
          <div className="mt-1 flex-1 rounded-sm bg-card" />
        </>
      ) : null}
      {mode === "stacked" ? (
        <div className="flex h-full gap-1">
          <div className="w-3 rounded-sm bg-foreground/25" />
          <div className="flex flex-1 flex-col gap-1">
            <div className="h-2 rounded-sm bg-foreground/15" />
            <div className="flex-1 rounded-sm bg-card" />
          </div>
        </div>
      ) : null}
      {mode === "collapsible" ? (
        <div className="flex h-full gap-1">
          <div className="w-1.5 rounded-sm bg-foreground/30" />
          <div className="flex flex-1 flex-col gap-1">
            <div className="h-2 rounded-sm bg-foreground/15" />
            <div className="flex-1 rounded-sm bg-card" />
          </div>
        </div>
      ) : null}
      {mode === "frameless" ? (
        <div className="flex h-full items-center justify-center p-1">
          <div className="h-full w-[70%] rounded-sm border border-border bg-card" />
        </div>
      ) : null}
      {mode === "overlapping" ? (
        <div className="relative h-full">
          <div className="absolute inset-0 rounded-sm bg-card" />
          <div className="absolute inset-y-0 start-0 w-3 rounded-sm bg-foreground/35 shadow-float-sm" />
        </div>
      ) : null}
      {mode === "empty" ? (
        <div className="h-full rounded-sm border border-dashed border-border/80 bg-transparent" />
      ) : null}
    </div>
  );
}

export interface ThemeConfigPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Theme / direction / layout configuration drawer — Atlas Editorial. */
export function ThemeConfigPanel({ open, onOpenChange }: ThemeConfigPanelProps) {
  const t = useTranslations("themeConfig");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const accent = useUiPreferencesStore((s) => s.accent);
  const layout = useUiPreferencesStore((s) => s.layout);
  const setAccent = useUiPreferencesStore((s) => s.setAccent);
  const setLayout = useUiPreferencesStore((s) => s.setLayout);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    applyAccentToDocument(accent);
  }, [accent, resolvedTheme]);

  const isDark = mounted && resolvedTheme === "dark";

  async function copyConfig() {
    const payload = {
      theme: resolvedTheme ?? "system",
      direction: locale === "fa" ? "rtl" : "ltr",
      locale,
      accent,
      layout,
    };
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      toast.success(t("copied"));
    } catch {
      toast.error(t("copyFailed"));
    }
  }

  function setDirection(next: "rtl" | "ltr") {
    const nextLocale: Locale = next === "rtl" ? "fa" : "en";
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction={locale === "fa" ? "left" : "right"}
    >
      <DrawerContent className="inset-y-0 start-auto end-0 max-w-sm border-e-0 border-s border-border rounded-e-none rounded-s-surface">
        <DrawerHeader className="flex flex-row items-center justify-between gap-3 border-b border-border px-6 pb-4 pt-6">
          <DrawerTitle className="text-base">{t("title")}</DrawerTitle>
          <DrawerClose asChild>
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              aria-label={t("close")}
            >
              <X className="size-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
          <section className="flex items-start justify-between gap-4">
            <div className="min-w-0 text-start">
              <p className="text-sm font-medium">{t("darkMode")}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {t("darkModeHint")}
              </p>
            </div>
            <Switch
              checked={!!isDark}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              aria-label={t("darkMode")}
            />
          </section>

          <Separator />

          <section className="space-y-3">
            <div className="text-start">
              <p className="text-sm font-medium">{t("direction")}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {t("directionHint")}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(["rtl", "ltr"] as const).map((dir) => {
                const active =
                  (dir === "rtl" && locale === "fa") ||
                  (dir === "ltr" && locale === "en");
                return (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => setDirection(dir)}
                    className={cn(
                      "rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "border-primary bg-primary-soft text-primary"
                        : "border-border bg-card text-foreground hover:bg-muted/60",
                    )}
                  >
                    {dir.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </section>

          <Separator />

          <section className="space-y-3">
            <Label className="text-sm font-medium">{t("theme")}</Label>
            <div className="flex flex-wrap items-center gap-2.5">
              {ACCENT_PRESETS.map((preset) => {
                const active = accent === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    aria-label={t(`accent_${preset.id}`)}
                    aria-pressed={active}
                    onClick={() => setAccent(preset.id)}
                    className={cn(
                      "relative flex size-8 items-center justify-center rounded-full transition-transform hover:scale-105",
                      active && "ring-2 ring-primary ring-offset-2 ring-offset-card",
                    )}
                    style={{ backgroundColor: preset.swatch }}
                  >
                    {active ? (
                      <Check className="size-3.5 text-white drop-shadow" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </section>

          <Separator />

          <section className="space-y-3">
            <Label className="text-sm font-medium">{t("layout")}</Label>
            <div className="grid grid-cols-3 gap-2.5">
              {LAYOUT_OPTIONS.map((mode) => {
                const active = layout === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setLayout(mode)}
                    className={cn(
                      "flex flex-col gap-1.5 rounded-xl border p-2 text-start transition-colors",
                      active
                        ? "border-primary bg-primary-soft/40"
                        : "border-border hover:bg-muted/50",
                    )}
                  >
                    <LayoutPreview mode={mode} active={active} />
                    <span className="text-[11px] font-medium leading-tight">
                      {t(`layout_${mode}`)}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <DrawerFooter className="border-t border-border">
          <Button type="button" className="w-full" onClick={() => void copyConfig()}>
            <Copy className="size-4" />
            {t("copyConfig")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
