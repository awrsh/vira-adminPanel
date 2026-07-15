import type { Order, User } from "@/types";
import {
  createSeededRandom,
  padDigits,
  pick,
  roundToman,
  toIsoDate,
  type Rng,
} from "@/mocks/factories/shared";

const ORDER_STATUSES: readonly Order["status"][] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const PAYMENT_STATUSES: readonly Order["paymentStatus"][] = [
  "paid",
  "paid",
  "unpaid",
  "refunded",
];

export function createOrderFactory(rng: Rng, users: User[]) {
  const customers = users.filter((u) => u.role === "customer");
  const pool = customers.length > 0 ? customers : users;

  return function createOrder(index: number): Order {
    const customer = pick(rng, pool);
    const items = Math.floor(rng() * 8) + 1;
    const unit = roundToman(rng() * 2_000_000 + 50_000);
    const status = pick(rng, ORDER_STATUSES);
    const paymentStatus =
      status === "cancelled"
        ? rng() > 0.5
          ? "refunded"
          : "unpaid"
        : pick(rng, PAYMENT_STATUSES);

    return {
      id: `o-${padDigits(index, 4)}`,
      orderNumber: `ORD-${2024000 + index}`,
      customerName: customer.name,
      customerNameEn: customer.nameEn,
      customerEmail: customer.email,
      city: customer.city,
      cityEn: customer.cityEn,
      total: unit * items,
      items,
      status,
      paymentStatus,
      createdAt: toIsoDate(Math.floor(rng() * 180), rng),
    };
  };
}

export function buildOrders(
  count = 70,
  users: User[],
  seed = 126,
): Order[] {
  const rng = createSeededRandom(seed);
  const createOrder = createOrderFactory(rng, users);
  return Array.from({ length: count }, (_, i) => createOrder(i + 1));
}
