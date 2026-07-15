"use client";

import { useState } from "react";
import { Menu, Settings2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { GlobalSearch } from "@/components/layout/global-search";
import { LanguageSwitcher } from "@/components/layout/locale-switcher";
import { ThemeSwitcher } from "@/components/layout/theme-toggle";
import { ThemeConfigPanel } from "@/components/layout/theme-config-panel";
import { TopNav } from "@/components/layout/top-nav";
import { NotificationMenu } from "@/components/layout/notification-menu";
import { UserMenu } from "@/components/layout/user-menu";
import { useUiPreferencesStore } from "@/stores/ui-preferences-store";

export interface AppHeaderProps {
  onMenuClick?: () => void;
  className?: string;
}

/** Floating glass header with search, chrome menus, and session controls. */
export function AppHeader({ onMenuClick, className }: AppHeaderProps) {
  const t = useTranslations("common");
  const tc = useTranslations("themeConfig");
  const [themeOpen, setThemeOpen] = useState(false);
  const layout = useUiPreferencesStore((s) => s.layout);
  const isTopbar = layout === "topbar";

  return (
    <>
      <header
        className={cn(
          "glass sticky top-[var(--ds-layout-float-offset)] z-[var(--z-shell)] flex items-center gap-2 rounded-[var(--ds-layout-float-radius)] border border-glass-border px-3 shadow-float-md transition-[box-shadow,background-color,height] duration-[var(--ds-duration-normal)] ease-[var(--ds-ease-out)] sm:px-4",
          isTopbar
            ? "h-auto min-h-[var(--ds-layout-header-height)] overflow-visible py-1.5"
            : "h-[var(--ds-layout-header-height)]",
          className,
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={cn(isTopbar ? "lg:hidden" : "lg:hidden")}
          onClick={onMenuClick}
          aria-label={t("openMenu")}
        >
          <Menu className="size-4" />
        </Button>

        {isTopbar ? (
          <>
            <p className="hidden shrink-0 text-sm font-semibold text-foreground sm:block">
              {t("appNameShort")}
            </p>
            <TopNav className="order-3 w-full basis-full lg:order-none lg:mx-2 lg:w-auto lg:flex-1 lg:basis-auto" />
            <div className="ms-auto flex shrink-0 items-center gap-1.5">
              <div className="hidden md:block md:max-w-44 lg:max-w-52">
                <GlobalSearch />
              </div>
              <LanguageSwitcher />
              <ThemeSwitcher />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={tc("open")}
                aria-haspopup="dialog"
                aria-expanded={themeOpen}
                onClick={() => setThemeOpen(true)}
              >
                <Settings2 className="size-4" />
              </Button>
              <NotificationMenu />
              <UserMenu />
            </div>
          </>
        ) : (
          <>
            <GlobalSearch />
            <div className="ms-auto flex items-center gap-1.5">
              <LanguageSwitcher />
              <ThemeSwitcher />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={tc("open")}
                aria-haspopup="dialog"
                aria-expanded={themeOpen}
                onClick={() => setThemeOpen(true)}
              >
                <Settings2 className="size-4" />
              </Button>
              <NotificationMenu />
              <UserMenu />
            </div>
          </>
        )}
      </header>

      <ThemeConfigPanel open={themeOpen} onOpenChange={setThemeOpen} />
    </>
  );
}
