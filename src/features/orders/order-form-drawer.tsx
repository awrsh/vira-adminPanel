"use client";

import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  useCreateOrder,
  useUpdateOrder,
} from "@/features/orders/hooks";
import {
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  createOrderSchema,
  type OrderFormValues,
} from "@/features/orders/schemas";
import { useOrderValidationMessages } from "@/features/orders/use-order-validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import type { Order } from "@/types";

interface OrderFormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
}

export function OrderFormDrawer({
  open,
  onOpenChange,
  order,
}: OrderFormDrawerProps) {
  const t = useTranslations();
  const messages = useOrderValidationMessages();
  const schema = useMemo(() => createOrderSchema(messages), [messages]);
  const createOrder = useCreateOrder();
  const updateOrder = useUpdateOrder();
  const editing = Boolean(order);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(schema),
    values: order
      ? {
          orderNumber: order.orderNumber,
          customerName: order.customerName,
          customerNameEn: order.customerNameEn,
          customerEmail: order.customerEmail,
          city: order.city,
          cityEn: order.cityEn,
          total: order.total,
          items: order.items,
          status: order.status,
          paymentStatus: order.paymentStatus,
        }
      : {
          orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
          customerName: "",
          customerNameEn: "",
          customerEmail: "",
          city: "",
          cityEn: "",
          total: 0,
          items: 1,
          status: "pending",
          paymentStatus: "unpaid",
        },
  });

  const statusValue = useWatch({ control: form.control, name: "status" });
  const paymentValue = useWatch({
    control: form.control,
    name: "paymentStatus",
  });

  async function onSubmit(values: OrderFormValues) {
    try {
      if (order) {
        await updateOrder.mutateAsync({ id: order.id, patch: values });
      } else {
        await createOrder.mutateAsync({
          ...values,
          createdAt: new Date().toISOString(),
        });
      }
      toast.success(t("orders.saved"));
      onOpenChange(false);
    } catch {
      toast.error(t("common.errorDescription"));
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {editing ? t("orders.editTitle") : t("orders.createTitle")}
          </DrawerTitle>
          <DrawerDescription>{t("orders.formHint")}</DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col overflow-hidden"
          noValidate
        >
          <div className="flex-1 space-y-4 overflow-y-auto px-6 pb-4">
            <Input
              floatingLabel={t("orders.orderNumber")}
              error={form.formState.errors.orderNumber?.message}
              {...form.register("orderNumber")}
            />
            <Input
              floatingLabel={t("orders.customer")}
              error={form.formState.errors.customerName?.message}
              {...form.register("customerName")}
            />
            <Input
              floatingLabel={t("orders.customerEn")}
              error={form.formState.errors.customerNameEn?.message}
              {...form.register("customerNameEn")}
            />
            <Input
              floatingLabel={t("orders.customerEmail")}
              type="email"
              autoComplete="email"
              error={form.formState.errors.customerEmail?.message}
              {...form.register("customerEmail")}
            />
            <Input
              floatingLabel={t("orders.city")}
              error={form.formState.errors.city?.message}
              {...form.register("city")}
            />
            <Input
              floatingLabel={t("orders.cityEn")}
              error={form.formState.errors.cityEn?.message}
              {...form.register("cityEn")}
            />
            <Input
              floatingLabel={t("orders.total")}
              type="number"
              inputMode="numeric"
              error={form.formState.errors.total?.message}
              {...form.register("total", { valueAsNumber: true })}
            />
            <Input
              floatingLabel={t("orders.items")}
              type="number"
              inputMode="numeric"
              error={form.formState.errors.items?.message}
              {...form.register("items", { valueAsNumber: true })}
            />

            <div className="space-y-2">
              <Label>{t("orders.fulfillmentStatus")}</Label>
              <Select
                value={statusValue}
                onValueChange={(value) =>
                  form.setValue("status", value as Order["status"], {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              >
                <SelectTrigger
                  aria-invalid={Boolean(form.formState.errors.status)}
                >
                  <SelectValue placeholder={t("orders.fulfillmentStatus")} />
                </SelectTrigger>
                <SelectContent>
                  {ORDER_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {t(`orders.statuses.${status}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("orders.payment")}</Label>
              <Select
                value={paymentValue}
                onValueChange={(value) =>
                  form.setValue(
                    "paymentStatus",
                    value as Order["paymentStatus"],
                    { shouldValidate: true, shouldDirty: true },
                  )
                }
              >
                <SelectTrigger
                  aria-invalid={Boolean(form.formState.errors.paymentStatus)}
                >
                  <SelectValue placeholder={t("orders.payment")} />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {t(`orders.payments.${status}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DrawerFooter>
            <Button
              type="submit"
              loading={createOrder.isPending || updateOrder.isPending}
            >
              {t("common.save")}
            </Button>
            <DrawerClose asChild>
              <Button type="button" variant="outline">
                {t("common.cancel")}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
