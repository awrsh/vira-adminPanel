"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { getDirection } from "@/i18n/config";
import {
  TOP_NAV_GROUPS,
  type TopNavCategory,
  type TopNavGroup,
} from "@/lib/modules/top-nav-groups";
import { useAuthStore } from "@/stores/auth-store";
import type { Permission } from "@/types";
import { cn } from "@/utils";

function canAccess(
  permissions: string[] | undefined,
  hasPermission: (p: Permission) => boolean,
) {
  if (!permissions?.length) return true;
  return permissions.some((p) => hasPermission(p as Permission));
}

function filterGroup(
  group: TopNavGroup,
  hasPermission: (p: Permission) => boolean,
): TopNavGroup | null {
  const categories = group.categories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        canAccess(item.permissions, hasPermission),
      ),
    }))
    .filter((category) => category.items.length > 0);

  if (!categories.length) return null;
  return { ...group, categories };
}

function groupActive(pathname: string, group: TopNavGroup) {
  return group.categories.some((category) =>
    category.items.some(
      (item) =>
        pathname === item.href || pathname.startsWith(`${item.href}/`),
    ),
  );
}

function MegaPanel({
  categories,
  activeCategoryId,
  onCategoryChange,
  onNavigate,
}: {
  categories: TopNavCategory[];
  activeCategoryId: string;
  onCategoryChange: (id: string) => void;
  onNavigate: () => void;
}) {
  const t = useTranslations();
  const active =
    categories.find((category) => category.id === activeCategoryId) ??
    categories[0];

  return (
    <div className="flex min-h-[16rem] w-[min(40rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-card shadow-float-lg">
      {/* Categories — inline-start (right in RTL) */}
      <aside className="w-52 shrink-0 border-e border-border bg-muted/20 p-3">
        <ul className="space-y-1">
          {categories.map((category) => {
            const Icon = category.icon;
            const selected = category.id === active.id;
            return (
              <li key={category.id}>
                <button
                  type="button"
                  onMouseEnter={() => onCategoryChange(category.id)}
                  onFocus={() => onCategoryChange(category.id)}
                  onClick={() => onCategoryChange(category.id)}
                  className={cn(
                    "flex w-full items-start gap-2.5 rounded-xl px-2.5 py-2.5 text-start transition-colors",
                    selected
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold leading-tight">
                      {t(category.labelKey as "topNav.catCommon")}
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
                      {t(category.descriptionKey as "topNav.catCommonDesc")}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Items grid */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-1">
          {active.items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onNavigate}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted/70"
              >
                <Icon
                  className="size-4 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                <span className="truncate font-medium">
                  {t(item.labelKey as "nav.dashboard")}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export interface TopNavProps {
  className?: string;
}

/**
 * Horizontal mega-menu navigation for the `topbar` shell layout.
 * Matches the editorial two-pane mega menu (categories + item grid).
 */
export function TopNav({ className }: TopNavProps) {
  const t = useTranslations();
  const locale = useLocale();
  const dir = getDirection(locale);
  const pathname = usePathname();
  const hasPermission = useAuthStore((s) => s.hasPermission);

  const groups = React.useMemo(
    () =>
      TOP_NAV_GROUPS.map((group) => filterGroup(group, hasPermission)).filter(
        (group): group is TopNavGroup => group !== null,
      ),
    [hasPermission],
  );

  const [openId, setOpenId] = React.useState<string | null>(null);
  const [categoryByGroup, setCategoryByGroup] = React.useState<
    Record<string, string>
  >({});
  const closeTimer = React.useRef<number | null>(null);

  function clearCloseTimer() {
    if (closeTimer.current != null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function openGroup(id: string) {
    clearCloseTimer();
    setOpenId(id);
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpenId(null), 140);
  }

  React.useEffect(() => {
    setOpenId(null);
  }, [pathname]);

  React.useEffect(
    () => () => {
      clearCloseTimer();
    },
    [],
  );

  return (
    <nav
      dir={dir}
      aria-label={t("common.mainNavigation")}
      className={cn(
        "relative hidden min-w-0 flex-1 items-center gap-1 lg:flex",
        className,
      )}
      onMouseLeave={scheduleClose}
    >
      {groups.map((group) => {
        const open = openId === group.id;
        const active = groupActive(pathname, group);
        const categoryId =
          categoryByGroup[group.id] ?? group.categories[0]?.id ?? "";

        return (
          <div
            key={group.id}
            className="relative"
            onMouseEnter={() => {
              openGroup(group.id);
              if (!categoryByGroup[group.id] && group.categories[0]) {
                setCategoryByGroup((prev) => ({
                  ...prev,
                  [group.id]: group.categories[0].id,
                }));
              }
            }}
          >
            <button
              type="button"
              aria-expanded={open}
              aria-haspopup="true"
              onFocus={() => openGroup(group.id)}
              onClick={() =>
                setOpenId((current) => (current === group.id ? null : group.id))
              }
              className={cn(
                "inline-flex h-9 shrink-0 items-center gap-1 rounded-lg px-3 text-sm font-medium whitespace-nowrap transition-colors",
                open || active
                  ? "bg-muted text-foreground"
                  : "text-foreground/80 hover:bg-muted/70 hover:text-foreground",
              )}
            >
              <span>{t(group.labelKey as "topNav.uiKit")}</span>
              <ChevronDown
                className={cn(
                  "size-3.5 opacity-50 transition-transform",
                  open && "rotate-180",
                )}
                aria-hidden
              />
            </button>

            {open ? (
              <div
                className="absolute top-full start-0 z-[var(--z-overlay)] pt-2"
                onMouseEnter={clearCloseTimer}
              >
                <MegaPanel
                  categories={group.categories}
                  activeCategoryId={categoryId}
                  onCategoryChange={(id) =>
                    setCategoryByGroup((prev) => ({
                      ...prev,
                      [group.id]: id,
                    }))
                  }
                  onNavigate={() => setOpenId(null)}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
