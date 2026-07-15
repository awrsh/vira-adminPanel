"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getDirection } from "@/i18n/config";
import { getNavItems } from "@/lib/modules/registry";
import { useAuthStore } from "@/stores/auth-store";
import type { NavItemConfig, Permission } from "@/types";
import { cn } from "@/utils";

export interface NavMenuProps {
  onNavigate?: () => void;
  collapsed?: boolean;
  className?: string;
}

function canAccessItem(
  item: NavItemConfig,
  hasPermission: (p: Permission) => boolean,
) {
  if (item.disabled) return false;
  if (!item.permissions?.length) return true;
  return item.permissions.some((p) => hasPermission(p));
}

function isPathActive(pathname: string, href?: string) {
  if (!href) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function itemOrChildActive(pathname: string, item: NavItemConfig): boolean {
  if (isPathActive(pathname, item.href)) return true;
  return (item.children ?? []).some((child) =>
    itemOrChildActive(pathname, child),
  );
}

/** Primary navigation menu driven by the module registry (supports accordion groups). */
export function NavMenu({
  onNavigate,
  collapsed = false,
  className,
}: NavMenuProps) {
  const t = useTranslations();
  const locale = useLocale();
  const dir = getDirection(locale);
  const pathname = usePathname();
  const hasPermission = useAuthStore((s) => s.hasPermission);
  const tooltipSide = locale === "fa" ? "left" : "right";

  const items = React.useMemo(
    () => getNavItems().filter((item) => canAccessItem(item, hasPermission)),
    [hasPermission],
  );

  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(
    {},
  );

  React.useEffect(() => {
    setOpenGroups((prev) => {
      const next = { ...prev };
      for (const item of items) {
        if (item.children?.length && itemOrChildActive(pathname, item)) {
          next[item.id] = true;
        }
      }
      return next;
    });
  }, [pathname, items]);

  function toggleGroup(id: string) {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function renderLeaf(item: NavItemConfig, nested = false) {
    if (!item.href) return null;
    const Icon = item.icon;
    const active = isPathActive(pathname, item.href);
    const label = t(item.labelKey as "nav.dashboard");

    const link = (
      <Link
        href={item.href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className={cn(
          "group relative flex w-full items-center gap-2.5 rounded-xl text-sm font-medium transition-[background-color,color,transform] duration-[var(--ds-duration-fast)] ease-[var(--ds-ease-out)]",
          nested ? "px-2.5 py-1.5" : "px-2.5 py-2",
          collapsed && !nested ? "justify-center px-2" : "justify-start",
          active
            ? nested
              ? "bg-primary-soft text-primary"
              : "bg-sidebar-accent text-sidebar-accent-foreground shadow-float-sm"
            : "text-sidebar-foreground/75 hover:bg-muted/80 hover:text-foreground",
        )}
      >
        {!nested ? (
          <span
            aria-hidden
            className={cn(
              "absolute inset-y-1.5 start-0 w-1 rounded-full bg-primary transition-opacity",
              active ? "opacity-100" : "opacity-0 group-hover:opacity-40",
            )}
          />
        ) : (
          <span
            aria-hidden
            className={cn(
              "size-1.5 shrink-0 rounded-full",
              active ? "bg-primary" : "bg-muted-foreground/40",
            )}
          />
        )}
        {!nested ? (
          <Icon className="relative z-[1] size-4 shrink-0" aria-hidden />
        ) : null}
        {!collapsed || nested ? (
          <span className="relative z-[1] min-w-0 flex-1 truncate text-start">
            {label}
          </span>
        ) : null}
      </Link>
    );

    if (collapsed && !nested) {
      return (
        <Tooltip key={item.id}>
          <TooltipTrigger asChild>{link}</TooltipTrigger>
          <TooltipContent side={tooltipSide}>{label}</TooltipContent>
        </Tooltip>
      );
    }

    return <div key={item.id}>{link}</div>;
  }

  function renderGroup(item: NavItemConfig) {
    const Icon = item.icon;
    const label = t(item.labelKey as "nav.dashboard");
    const children = (item.children ?? []).filter((child) =>
      canAccessItem(child, hasPermission),
    );
    if (!children.length) return renderLeaf(item);

    const open = openGroups[item.id] ?? false;
    const active = itemOrChildActive(pathname, item);

    if (collapsed) {
      return (
        <Tooltip key={item.id}>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => toggleGroup(item.id)}
              className={cn(
                "flex w-full items-center justify-center rounded-xl px-2 py-2 text-sidebar-foreground/75 hover:bg-muted/80",
                active && "bg-sidebar-accent text-sidebar-accent-foreground",
              )}
              aria-expanded={open}
              aria-label={label}
            >
              <Icon className="size-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side={tooltipSide}>{label}</TooltipContent>
        </Tooltip>
      );
    }

    return (
      <div key={item.id} className="space-y-0.5">
        <div
          className={cn(
            "group flex w-full items-center gap-1 rounded-xl text-sm font-medium transition-colors",
            active
              ? "text-sidebar-accent-foreground"
              : "text-sidebar-foreground/75 hover:bg-muted/80 hover:text-foreground",
          )}
        >
          {item.href ? (
            <Link
              href={item.href}
              onClick={onNavigate}
              className="flex min-w-0 flex-1 items-center gap-2.5 px-2.5 py-2"
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              <span className="min-w-0 flex-1 truncate text-start">{label}</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => toggleGroup(item.id)}
              className="flex min-w-0 flex-1 items-center gap-2.5 px-2.5 py-2"
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              <span className="min-w-0 flex-1 truncate text-start">{label}</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => toggleGroup(item.id)}
            aria-expanded={open}
            aria-label={label}
            className="me-1 rounded-lg p-1.5 hover:bg-muted"
          >
            <ChevronDown
              className={cn(
                "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                open && "rotate-180",
              )}
              aria-hidden
            />
          </button>
        </div>
        {open ? (
          <div className="ms-2 space-y-0.5 border-s border-border/70 ps-2">
            {children.map((child) => renderLeaf(child, true))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <nav
      dir={dir}
      className={cn("flex flex-col gap-0.5", className)}
      aria-label={t("common.mainNavigation")}
    >
      {items.map((item) =>
        item.children?.length ? renderGroup(item) : renderLeaf(item),
      )}
    </nav>
  );
}
