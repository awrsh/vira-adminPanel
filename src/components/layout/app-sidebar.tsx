"use client";

import { useLocale, useTranslations } from "next-intl";
import { APP_NAME } from "@/constants";
import { getDirection } from "@/i18n/config";
import { cn } from "@/utils";
import { NavMenu } from "@/components/layout/nav-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface AppSidebarProps {
  className?: string;
  collapsed?: boolean;
  overlapping?: boolean;
}

/**
 * Floating glass sidebar docked to inline-start
 * (right in Persian RTL · left in English LTR).
 */
export function AppSidebar({
  className,
  collapsed = false,
  overlapping = false,
}: AppSidebarProps) {
  const t = useTranslations();
  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <aside
      dir={dir}
      data-collapsed={collapsed ? "true" : undefined}
      className={cn(
        "glass fixed inset-y-[var(--ds-layout-float-offset)] start-[var(--ds-layout-float-offset)] z-[var(--z-shell)] hidden flex-col rounded-[var(--ds-layout-float-radius)] border border-glass-border p-3 shadow-float-lg transition-[width,transform,opacity] duration-[var(--ds-duration-normal)] ease-[var(--ds-ease-out)] lg:flex",
        collapsed
          ? "w-[var(--ds-layout-sidebar-width-collapsed)]"
          : "w-[var(--ds-layout-sidebar-width)]",
        overlapping && "shadow-float-lg",
        className,
      )}
      aria-label={t("common.mainNavigation")}
    >
      <div className={cn("mb-5 px-2 text-start", collapsed && "px-0 text-center")}>
        <p className="text-[0.7rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
          {collapsed ? t("shell.brand") : t("shell.brand")}
        </p>
        {!collapsed ? (
          <p className="mt-1 text-sm font-semibold leading-snug text-foreground text-balance">
            {t("common.appNameShort")}
          </p>
        ) : null}
      </div>

      <ScrollArea className="flex-1 pe-1">
        <NavMenu collapsed={collapsed} />
      </ScrollArea>

      {!collapsed ? (
        <p className="mt-3 truncate px-2 pt-3 text-[10px] leading-relaxed text-muted-foreground text-start">
          {APP_NAME}
        </p>
      ) : null}
    </aside>
  );
}
