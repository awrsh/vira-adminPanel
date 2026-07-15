"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import {
  runThemeTransition,
  motionTokens,
  type ThemeMode,
} from "@/design-system";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ICONS = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

/** Theme switcher: light · dark · system with transition. */
export function ThemeSwitcher() {
  const t = useTranslations("common");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  function applyTheme(next: string) {
    runThemeTransition(motionTokens.durationMs.theme);
    setTheme(next);
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon-sm" aria-hidden disabled>
        <Sun className="size-4" />
      </Button>
    );
  }

  const mode = (theme as ThemeMode | undefined) ?? "system";
  const Icon = ICONS[mode];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={t("theme")}
          title={t(mode)}
        >
          <span dir="ltr" className="inline-flex">
            <Icon className="size-4" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        <DropdownMenuRadioGroup value={mode} onValueChange={applyTheme}>
          <DropdownMenuRadioItem value="light" className="gap-2">
            <span dir="ltr" className="inline-flex">
              <Sun className="size-4" />
            </span>
            {t("light")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" className="gap-2">
            <span dir="ltr" className="inline-flex">
              <Moon className="size-4" />
            </span>
            {t("dark")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system" className="gap-2">
            <span dir="ltr" className="inline-flex">
              <Monitor className="size-4" />
            </span>
            {t("system")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** @deprecated Prefer ThemeSwitcher — kept for compatibility. */
export { ThemeSwitcher as ThemeToggle };
