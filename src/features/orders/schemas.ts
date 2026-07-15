import { z } from "zod";
import type { Order } from "@/types";

export const ORDER_STATUSES: readonly Order["status"][] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export const PAYMENT_STATUSES: readonly Order["paymentStatus"][] = [
  "paid",
  "unpaid",
  "refunded",
] as const;

export interface OrderValidationMessages {
  orderNumberRequired: string;
  orderNumberMin: string;
  customerRequired: string;
  customerMin: string;
  customerEnRequired: string;
  emailRequired: string;
  emailInvalid: string;
  cityRequired: string;
  cityEnRequired: string;
  totalRequired: string;
  totalMin: string;
  itemsRequired: string;
  itemsMin: string;
  statusRequired: string;
  paymentRequired: string;
}

export function createOrderSchema(messages: OrderValidationMessages) {
  return z.object({
    orderNumber: z
      .string()
      .min(1, messages.orderNumberRequired)
      .min(2, messages.orderNumberMin),
    customerName: z
      .string()
      .min(1, messages.customerRequired)
      .min(2, messages.customerMin),
    customerNameEn: z
      .string()
      .min(1, messages.customerEnRequired)
      .min(2, messages.customerMin),
    customerEmail: z
      .string()
      .min(1, messages.emailRequired)
      .email(messages.emailInvalid),
    city: z.string().min(1, messages.cityRequired).min(2, messages.cityRequired),
    cityEn: z
      .string()
      .min(1, messages.cityEnRequired)
      .min(2, messages.cityEnRequired),
    total: z
      .number({ message: messages.totalRequired })
      .min(0, messages.totalMin),
    items: z
      .number({ message: messages.itemsRequired })
      .min(1, messages.itemsMin)
      .int(messages.itemsMin),
    status: z.enum(
      ["pending", "processing", "shipped", "delivered", "cancelled"],
      { message: messages.statusRequired },
    ),
    paymentStatus: z.enum(["paid", "unpaid", "refunded"], {
      message: messages.paymentRequired,
    }),
  });
}

export type OrderFormValues = z.infer<ReturnType<typeof createOrderSchema>>;
