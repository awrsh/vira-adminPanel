"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Pencil, Printer, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useUpdateOrder } from "@/features/orders/hooks";
import {
  ORDER_STATUSES,
  PAYMENT_STATUSES,
} from "@/features/orders/schemas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Surface } from "@/components/ui/surface";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency, formatDate, formatNumber } from "@/utils";
import type { Order } from "@/types";

interface OrderDetailsDrawerProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (order: Order) => void;
  onDelete?: (order: Order) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <dt className="shrink-0 text-sm text-muted-foreground">{label}</dt>
      <dd className="min-w-0 text-end text-sm font-medium text-foreground">
        {value}
      </dd>
    </div>
  );
}

export function OrderDetailsDrawer({
  order,
  open,
  onOpenChange,
  onEdit,
  onDelete,
  canEdit = true,
  canDelete = true,
}: OrderDetailsDrawerProps) {
  const t = useTranslations();
  const locale = useLocale();
  const updateOrder = useUpdateOrder();
  const [status, setStatus] = React.useState<Order["status"]>(
    order?.status ?? "pending",
  );
  const [paymentStatus, setPaymentStatus] =
    React.useState<Order["paymentStatus"]>(order?.paymentStatus ?? "unpaid");

  if (!order) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent />
      </Drawer>
    );
  }

  const localeTag = locale === "fa" ? "fa-IR" : "en-US";
  const customerName =
    locale === "fa" ? order.customerName : order.customerNameEn;
  const city = locale === "fa" ? order.city : order.cityEn;
  const tax = Math.round(order.total * 0.09);
  const subtotal = order.total;
  const grandTotal = subtotal + tax;

  async function persistStatus(
    nextStatus: Order["status"],
    nextPayment: Order["paymentStatus"],
  ) {
    if (!canEdit || !order) return;
    try {
      await updateOrder.mutateAsync({
        id: order.id,
        patch: { status: nextStatus, paymentStatus: nextPayment },
      });
      toast.success(t("orders.statusUpdated"));
    } catch {
      toast.error(t("common.errorDescription"));
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{order.orderNumber}</DrawerTitle>
          <DrawerDescription>{customerName}</DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 pb-2">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={
                status === "delivered"
                  ? "success"
                  : status === "cancelled"
                    ? "destructive"
                    : status === "pending"
                      ? "warning"
                      : "secondary"
              }
            >
              {t(`orders.statuses.${status}`)}
            </Badge>
            <Badge
              variant={
                paymentStatus === "paid"
                  ? "success"
                  : paymentStatus === "refunded"
                    ? "outline"
                    : "warning"
              }
            >
              {t(`orders.payments.${paymentStatus}`)}
            </Badge>
          </div>

          {canEdit ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>{t("orders.fulfillmentStatus")}</Label>
                <Select
                  value={status}
                  onValueChange={(value) => {
                    const next = value as Order["status"];
                    setStatus(next);
                    void persistStatus(next, paymentStatus);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_STATUSES.map((item) => (
                      <SelectItem key={item} value={item}>
                        {t(`orders.statuses.${item}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("orders.payment")}</Label>
                <Select
                  value={paymentStatus}
                  onValueChange={(value) => {
                    const next = value as Order["paymentStatus"];
                    setPaymentStatus(next);
                    void persistStatus(status, next);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_STATUSES.map((item) => (
                      <SelectItem key={item} value={item}>
                        {t(`orders.payments.${item}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : null}

          <section>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
              {t("orders.customerInfo")}
            </h3>
            <dl>
              <DetailRow label={t("orders.customer")} value={customerName} />
              <DetailRow
                label={t("orders.customerEmail")}
                value={order.customerEmail}
              />
              <DetailRow label={t("orders.city")} value={city} />
            </dl>
          </section>

          <Separator />

          <section>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
              {t("orders.paymentInfo")}
            </h3>
            <dl>
              <DetailRow
                label={t("orders.items")}
                value={formatNumber(order.items, localeTag)}
              />
              <DetailRow
                label={t("orders.total")}
                value={formatCurrency(order.total, localeTag)}
              />
              <DetailRow
                label={t("orders.createdAt")}
                value={formatDate(order.createdAt, localeTag)}
              />
            </dl>
          </section>

          <Separator />

          <section className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                {t("orders.invoicePreview")}
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => window.print()}
              >
                <Printer className="size-4" />
                {t("orders.printInvoice")}
              </Button>
            </div>

            <Surface className="space-y-4 p-4 print:shadow-none">
              <div className="flex items-start justify-between gap-3">
                <div className="text-start">
                  <p className="font-persian text-lg font-semibold">
                    {t("shell.brand")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("orders.invoiceTitle")}
                  </p>
                </div>
                <div className="text-end text-sm">
                  <p className="font-medium">{order.orderNumber}</p>
                  <p className="text-muted-foreground">
                    {formatDate(order.createdAt, localeTag)}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div className="text-start">
                  <p className="text-xs text-muted-foreground">
                    {t("orders.billTo")}
                  </p>
                  <p className="font-medium">{customerName}</p>
                  <p className="text-muted-foreground">{order.customerEmail}</p>
                  <p className="text-muted-foreground">{city}</p>
                </div>
                <div className="text-start sm:text-end">
                  <p className="text-xs text-muted-foreground">
                    {t("orders.payment")}
                  </p>
                  <p className="font-medium">
                    {t(`orders.payments.${paymentStatus}`)}
                  </p>
                  <p className="text-muted-foreground">
                    {t(`orders.statuses.${status}`)}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-muted/40 px-3 py-3 text-sm">
                <div className="mb-2 flex justify-between gap-3">
                  <span className="text-muted-foreground">
                    {t("orders.lineItems")}
                  </span>
                  <span>
                    {formatNumber(order.items, localeTag)} ×{" "}
                    {formatCurrency(
                      Math.round(order.total / Math.max(order.items, 1)),
                      localeTag,
                    )}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">
                    {t("orders.subtotal")}
                  </span>
                  <span>{formatCurrency(subtotal, localeTag)}</span>
                </div>
                <div className="mt-1 flex justify-between gap-3">
                  <span className="text-muted-foreground">
                    {t("orders.tax")}
                  </span>
                  <span>{formatCurrency(tax, localeTag)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between gap-3 font-semibold">
                  <span>{t("orders.grandTotal")}</span>
                  <span>{formatCurrency(grandTotal, localeTag)}</span>
                </div>
              </div>
            </Surface>
          </section>
        </div>

        <DrawerFooter>
          {canEdit && onEdit ? (
            <Button type="button" onClick={() => onEdit(order)}>
              <Pencil className="size-4" />
              {t("common.edit")}
            </Button>
          ) : null}
          {canDelete && onDelete ? (
            <Button
              type="button"
              variant="destructive"
              onClick={() => onDelete(order)}
            >
              <Trash2 className="size-4" />
              {t("common.delete")}
            </Button>
          ) : null}
          <DrawerClose asChild>
            <Button type="button" variant="outline">
              {t("common.close")}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
