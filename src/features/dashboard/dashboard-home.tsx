"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { getWidgets } from "@/lib/modules/registry";
import { useAuthStore } from "@/stores/auth-store";
import { resolveDashboardWidget } from "@/features/dashboard/widget-registry";
import type { Permission, WidgetDefinition } from "@/types";

function filterByPermission(
  widgets: WidgetDefinition[],
  hasPermission: (permission: Permission) => boolean,
): WidgetDefinition[] {
  return widgets.filter((widget) => {
    if (!widget.permissions?.length) return true;
    return widget.permissions.every((permission) => hasPermission(permission));
  });
}

/** Asymmetrical editorial dashboard composed from the module widget registry. */
export function DashboardHome() {
  const t = useTranslations("dashboard");
  const hasPermission = useAuthStore((s) => s.hasPermission);

  const widgets = useMemo(
    () => filterByPermission(getWidgets(), hasPermission),
    [hasPermission],
  );

  return (
    <div className="space-y-6">
      <header className="max-w-2xl space-y-1.5 text-start">
        <h1 className="font-persian text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("title")}
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t("subtitle")}
        </p>
      </header>

      <div className="grid auto-rows-min grid-cols-12 gap-3 lg:gap-4">
        {widgets.map((definition) => {
          const Widget = resolveDashboardWidget(definition);
          if (!Widget) return null;
          return (
            <Widget
              key={definition.id}
              colSpan={definition.colSpan}
              rowSpan={definition.rowSpan}
            />
          );
        })}
      </div>
    </div>
  );
}
