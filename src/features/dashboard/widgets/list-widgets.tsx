"use client";

import { useLocale, useTranslations } from "next-intl";
import { Activity as ActivityIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useActivities, useNotifications, useOrders, usePayments, useTasks } from "@/hooks/api";
import { WidgetShell } from "@/features/dashboard/widget-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils";

export function OrdersWidget({
  colSpan = 7,
  rowSpan = 2,
}: {
  colSpan?: number;
  rowSpan?: number;
}) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const { data, isLoading, isError, refetch } = useOrders({
    page: 1,
    pageSize: 6,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const rows = data?.data ?? [];

  return (
    <WidgetShell
      title={t("orders")}
      description={t("ordersHint")}
      colSpan={colSpan}
      rowSpan={rowSpan}
      isLoading={isLoading}
      isError={isError}
      isEmpty={!isLoading && !isError && rows.length === 0}
      onRetry={() => void refetch()}
      headerAction={
        <Link
          href="/orders"
          className="text-xs font-medium text-primary hover:underline"
        >
          {t("viewAll")}
        </Link>
      }
    >
      <ul className="space-y-2.5">
        {rows.map((order) => (
          <li
            key={order.id}
            className="flex items-center justify-between gap-3 rounded-2xl bg-muted/40 px-3.5 py-3"
          >
            <div className="min-w-0 text-start">
              <p className="truncate text-sm font-medium">{order.orderNumber}</p>
              <p className="truncate text-xs text-muted-foreground">
                {locale === "fa" ? order.customerName : order.customerNameEn}
              </p>
            </div>
            <div className="shrink-0 text-end">
              <p className="text-sm font-medium">
                {formatCurrency(
                  order.total,
                  locale === "fa" ? "fa-IR" : "en-US",
                )}
              </p>
              <Badge variant="secondary" className="mt-1">
                {t(`orderStatus.${order.status}` as "orderStatus.pending")}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </WidgetShell>
  );
}

export function ActivityWidget({
  colSpan = 5,
  rowSpan = 2,
}: {
  colSpan?: number;
  rowSpan?: number;
}) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const { data, isLoading, isError, refetch } = useActivities({
    page: 1,
    pageSize: 7,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const rows = data?.data ?? [];

  return (
    <WidgetShell
      title={t("activity")}
      description={t("activityHint")}
      colSpan={colSpan}
      rowSpan={rowSpan}
      isLoading={isLoading}
      isError={isError}
      isEmpty={!isLoading && !isError && rows.length === 0}
      onRetry={() => void refetch()}
    >
      <ol className="relative space-y-0 border-s border-border/70 ps-5">
        {rows.map((item) => (
          <li key={item.id} className="relative pb-5 last:pb-0">
            <span className="absolute -start-[1.4rem] top-1 flex size-6 items-center justify-center rounded-full bg-primary-soft text-primary">
              <ActivityIcon className="size-3.5" />
            </span>
            <p className="text-sm leading-snug">
              <span className="font-medium">
                {locale === "fa" ? item.actorName : item.actorNameEn}
              </span>{" "}
              <span className="text-muted-foreground">
                {locale === "fa" ? item.action : item.actionEn}
              </span>{" "}
              <span className="font-medium">
                {locale === "fa" ? item.entityLabel : item.entityLabelEn}
              </span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {new Date(item.createdAt).toLocaleString(
                locale === "fa" ? "fa-IR" : "en-US",
                { dateStyle: "medium", timeStyle: "short" },
              )}
            </p>
          </li>
        ))}
      </ol>
    </WidgetShell>
  );
}

export function TasksWidget({
  colSpan = 4,
  rowSpan = 2,
}: {
  colSpan?: number;
  rowSpan?: number;
}) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const { data, isLoading, isError, refetch } = useTasks({
    page: 1,
    pageSize: 5,
    sortBy: "dueDate",
    sortOrder: "asc",
  });

  const rows = data?.data ?? [];

  return (
    <WidgetShell
      title={t("tasks")}
      description={t("tasksHint")}
      colSpan={colSpan}
      rowSpan={rowSpan}
      isLoading={isLoading}
      isError={isError}
      isEmpty={!isLoading && !isError && rows.length === 0}
      onRetry={() => void refetch()}
    >
      <ul className="space-y-3">
        {rows.map((task) => (
          <li
            key={task.id}
            className="rounded-2xl border border-border/60 bg-muted/30 px-3.5 py-3"
          >
            <p className="text-sm font-medium">
              {locale === "fa" ? task.title : task.titleEn}
            </p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="truncate text-xs text-muted-foreground">
                {locale === "fa" ? task.assigneeName : task.assigneeNameEn}
              </p>
              <Badge
                variant={
                  task.priority === "urgent" || task.priority === "high"
                    ? "destructive"
                    : "outline"
                }
              >
                {t(`priority.${task.priority}` as "priority.medium")}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </WidgetShell>
  );
}

export function NotificationsWidget({
  colSpan = 4,
  rowSpan = 2,
}: {
  colSpan?: number;
  rowSpan?: number;
}) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const { data, isLoading, isError, refetch } = useNotifications({
    page: 1,
    pageSize: 5,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const rows = data?.data ?? [];

  return (
    <WidgetShell
      title={t("notifications")}
      colSpan={colSpan}
      rowSpan={rowSpan}
      isLoading={isLoading}
      isError={isError}
      isEmpty={!isLoading && !isError && rows.length === 0}
      onRetry={() => void refetch()}
    >
      <ul className="space-y-2">
        {rows.map((item) => (
          <li key={item.id} className="flex gap-2.5">
            <span
              className={
                item.read
                  ? "mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/40"
                  : "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
              }
            />
            <div className="min-w-0 text-start">
              <p className="truncate text-sm font-medium">
                {locale === "fa" ? item.title : item.titleEn}
              </p>
              <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                {locale === "fa" ? item.body : item.bodyEn}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </WidgetShell>
  );
}

export function PaymentsWidget({
  colSpan = 7,
}: {
  colSpan?: number;
  rowSpan?: number;
}) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const { data, isLoading, isError, refetch } = usePayments({
    page: 1,
    pageSize: 5,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const rows = data?.data ?? [];

  return (
    <WidgetShell
      title={t("payments")}
      description={t("paymentsHint")}
      colSpan={colSpan}
      isLoading={isLoading}
      isError={isError}
      isEmpty={!isLoading && !isError && rows.length === 0}
      onRetry={() => void refetch()}
    >
      <ul className="space-y-2">
        {rows.map((payment) => (
          <li
            key={payment.id}
            className="flex items-center gap-2.5 rounded-xl bg-muted/40 px-3 py-2.5"
          >
            <Avatar className="size-8">
              <AvatarFallback>
                {(locale === "fa" ? payment.userName : payment.userNameEn).slice(
                  0,
                  2,
                )}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 text-start">
              <p className="truncate text-sm font-medium">
                {payment.paymentNumber}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {locale === "fa" ? payment.userName : payment.userNameEn} ·{" "}
                {locale === "fa" ? payment.gateway : payment.gatewayEn}
              </p>
            </div>
            <div className="shrink-0 text-end">
              <p className="text-sm font-medium">
                {formatCurrency(
                  payment.amount,
                  locale === "fa" ? "fa-IR" : "en-US",
                )}
              </p>
              <Badge variant="outline" className="mt-0.5">
                {t(`paymentStatus.${payment.status}` as "paymentStatus.success")}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </WidgetShell>
  );
}
