"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { getCommands, getNavItems } from "@/lib/modules/registry";
import { useAuthStore } from "@/stores/auth-store";
import {
  runThemeTransition,
  motionTokens,
  nextThemeMode,
  type ThemeMode,
} from "@/design-system";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import type { Permission } from "@/types";

/**
 * Shell command palette (Ctrl/Cmd+K).
 * Uses nav/commands from the module registry — no business data fetching.
 */
export function CommandPalette() {
  const t = useTranslations();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const hasPermission = useAuthStore((s) => s.hasPermission);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("atlas:open-command", onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("atlas:open-command", onOpen);
    };
  }, []);

  function canAccess(permissions?: Permission[]) {
    if (!permissions?.length) return true;
    return permissions.some((permission) => hasPermission(permission));
  }

  const navItems = getNavItems()
    .flatMap((item) => [
      ...(item.href ? [item] : []),
      ...(item.children ?? []).filter((child) => child.href),
    ])
    .filter((item) => canAccess(item.permissions));
  const commands = getCommands().filter(
    (item) =>
      canAccess(item.permissions) &&
      (item.group === "commands" || item.action),
  );

  function go(href?: string) {
    setOpen(false);
    if (href) router.push(href);
  }

  function toggleTheme() {
    setOpen(false);
    runThemeTransition(motionTokens.durationMs.theme);
    setTheme(nextThemeMode((theme as ThemeMode | undefined) ?? "system"));
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title={t("command.placeholder")}
    >
      <Command shouldFilter label={t("command.placeholder")}>
        <CommandInput placeholder={t("command.placeholder")} />
        <CommandList>
          <CommandEmpty>{t("command.noResults")}</CommandEmpty>

          <CommandGroup heading={t("command.pages")}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <CommandItem
                  key={item.id}
                  value={`${item.labelKey} ${item.href}`}
                  onSelect={() => go(item.href)}
                >
                  <Icon className="size-4" />
                  {t(item.labelKey as "nav.dashboard")}
                </CommandItem>
              );
            })}
          </CommandGroup>

          {commands.length > 0 ? (
            <>
              <CommandSeparator />
              <CommandGroup heading={t("command.commands")}>
                {commands.map((item) => {
                  const Icon = item.icon;
                  return (
                    <CommandItem
                      key={item.id}
                      value={`${item.labelKey} ${item.keywords?.join(" ") ?? ""}`}
                      onSelect={() => {
                        if (item.action === "toggle-theme") {
                          toggleTheme();
                          return;
                        }
                        go(item.href);
                      }}
                    >
                      {Icon ? <Icon className="size-4" /> : null}
                      {t(item.labelKey)}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </>
          ) : null}

          <CommandSeparator />
          <CommandGroup heading={t("command.commands")}>
            <CommandItem
              value={t("command.toggleTheme")}
              onSelect={toggleTheme}
            >
              {t("command.toggleTheme")}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
