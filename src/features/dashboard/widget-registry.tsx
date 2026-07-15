"use client";

import type { ComponentType } from "react";
import type { WidgetDefinition } from "@/types";
import {
  RevenueWidget,
  SalesWidget,
  StorageWidget,
  TrafficWidget,
  VisitorsWidget,
} from "@/features/dashboard/widgets/metric-widgets";
import {
  ActivityWidget,
  NotificationsWidget,
  OrdersWidget,
  PaymentsWidget,
  TasksWidget,
} from "@/features/dashboard/widgets/list-widgets";
import {
  CalendarWidget,
  QuickActionsWidget,
} from "@/features/dashboard/widgets/utility-widgets";
import { ContactsWidget } from "@/features/contacts/contacts-widget";

type WidgetComponent = ComponentType<{
  colSpan?: number;
  rowSpan?: number;
}>;

export const DASHBOARD_WIDGET_REGISTRY: Record<string, WidgetComponent> = {
  RevenueWidget,
  SalesWidget,
  VisitorsWidget,
  OrdersWidget,
  ActivityWidget,
  CalendarWidget,
  TasksWidget,
  QuickActionsWidget,
  NotificationsWidget,
  StorageWidget,
  TrafficWidget,
  PaymentsWidget,
  ContactsWidget,
};

export function resolveDashboardWidget(
  definition: WidgetDefinition,
): WidgetComponent | null {
  return DASHBOARD_WIDGET_REGISTRY[definition.component] ?? null;
}
