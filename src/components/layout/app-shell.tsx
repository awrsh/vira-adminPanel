"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { AppBreadcrumb } from "@/components/layout/app-breadcrumb";
import { MobileNav } from "@/components/layout/mobile-nav";
import { CommandPalette } from "@/components/layout/command-palette";
import { getDirection } from "@/i18n/config";
import {
  applyAccentToDocument,
  useUiPreferencesStore,
} from "@/stores/ui-preferences-store";
import { cn } from "@/utils";

export interface AppShellProps {
  children: React.ReactNode;
}

/**
 * Premium editorial application shell.
 * Floating sidebar + header, RTL-aware (sidebar/drawer on inline-start).
 * Layout + accent come from the theme configuration panel.
 */
export function AppShell({ children }: AppShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const locale = useLocale();
  const dir = getDirection(locale);
  const { resolvedTheme } = useTheme();
  const accent = useUiPreferencesStore((s) => s.accent);
  const layout = useUiPreferencesStore((s) => s.layout);

  useEffect(() => {
    applyAccentToDocument(accent);
  }, [accent, resolvedTheme]);

  const hideSidebar =
    layout === "topbar" || layout === "empty" || layout === "frameless";
  const collapsed = layout === "collapsible";
  const overlapping = layout === "overlapping";
  const boxed = layout === "frameless";

  const contentOffsetClass = hideSidebar
    ? ""
    : collapsed
      ? "lg:ps-[calc(var(--ds-layout-sidebar-width-collapsed)+var(--ds-layout-float-offset)*2)]"
      : overlapping
        ? ""
        : "lg:ps-[calc(var(--ds-layout-sidebar-width)+var(--ds-layout-float-offset)*2)]";

  return (
    <div
      className="relative min-h-dvh bg-background"
      dir={dir}
      data-layout={layout}
      data-accent={accent}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--primary)_12%,transparent),transparent_55%)]"
      />

      {!hideSidebar ? (
        <AppSidebar collapsed={collapsed} overlapping={overlapping} />
      ) : null}
      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />

      <div
        className={cn(
          "relative flex min-h-dvh flex-col transition-[padding] duration-[var(--ds-duration-normal)] ease-[var(--ds-ease-out)]",
          contentOffsetClass,
        )}
      >
        <div
          className={cn(
            "px-[var(--ds-shell-pad)]",
            boxed && "mx-auto w-full max-w-6xl",
          )}
        >
          <AppHeader onMenuClick={() => setMobileNavOpen(true)} />
        </div>

        {layout !== "empty" ? (
          <div
            className={cn(
              "px-[var(--ds-shell-pad)] pt-3",
              boxed && "mx-auto w-full max-w-6xl",
            )}
          >
            <AppBreadcrumb />
          </div>
        ) : null}

        <main
          id="main-content"
          className={cn(
            "relative flex-1 px-[var(--ds-shell-pad)] py-5 lg:py-6",
            boxed && "mx-auto w-full max-w-6xl",
            overlapping && !hideSidebar && "lg:ps-[var(--ds-shell-pad)]",
          )}
        >
          {children}
        </main>
      </div>

      <CommandPalette />
    </div>
  );
}
