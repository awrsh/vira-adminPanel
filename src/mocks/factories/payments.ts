import type { Invoice, Order, Payment, User } from "@/types";
import { PAYMENT_GATEWAYS } from "@/mocks/data/templates";
import {
  createSeededRandom,
  padDigits,
  pick,
  roundToman,
  toIsoDate,
  type Rng,
} from "@/mocks/factories/shared";

const METHODS: readonly Payment["method"][] = [
  "card",
  "card",
  "transfer",
  "wallet",
  "cash",
];

const STATUSES: readonly Payment["status"][] = [
  "success",
  "success",
  "pending",
  "failed",
  "refunded",
];

export function createPaymentFactory(
  rng: Rng,
  users: User[],
  orders: Order[],
  invoices: Invoice[],
) {
  return function createPayment(index: number): Payment {
    const user = pick(rng, users);
    const order = orders.length > 0 && rng() > 0.3 ? pick(rng, orders) : undefined;
    const invoice =
      invoices.length > 0 && rng() > 0.4 ? pick(rng, invoices) : undefined;
    const gateway = pick(rng, PAYMENT_GATEWAYS);
    const amount = order
      ? order.total
      : invoice
        ? invoice.total
        : roundToman(rng() * 3_000_000 + 80_000);

    return {
      id: `pay-${padDigits(index, 4)}`,
      paymentNumber: `PAY-${padDigits(index, 6)}`,
      orderId: order?.id,
      invoiceId: invoice?.id,
      userId: user.id,
      userName: user.name,
      userNameEn: user.nameEn,
      amount,
      method: pick(rng, METHODS),
      gateway: gateway.fa,
      gatewayEn: gateway.en,
      status: pick(rng, STATUSES),
      referenceCode: `IRR${padDigits(Math.floor(rng() * 1_000_000_000), 9)}`,
      createdAt: toIsoDate(Math.floor(rng() * 150), rng),
    };
  };
}

export function buildPayments(
  count = 45,
  users: User[],
  orders: Order[],
  invoices: Invoice[],
  seed = 512,
): Payment[] {
  const rng = createSeededRandom(seed);
  const createPayment = createPaymentFactory(rng, users, orders, invoices);
  return Array.from({ length: count }, (_, i) => createPayment(i + 1));
}
