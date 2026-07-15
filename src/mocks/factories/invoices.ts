import type { Company, Invoice, Order, User } from "@/types";
import {
  createSeededRandom,
  padDigits,
  pick,
  roundToman,
  toIsoDate,
  type Rng,
} from "@/mocks/factories/shared";

const STATUSES: readonly Invoice["status"][] = [
  "draft",
  "sent",
  "paid",
  "paid",
  "overdue",
  "cancelled",
];

export function createInvoiceFactory(
  rng: Rng,
  companies: Company[],
  orders: Order[],
  users: User[],
) {
  return function createInvoice(index: number): Invoice {
    const company = pick(rng, companies);
    const order = orders.length > 0 && rng() > 0.35 ? pick(rng, orders) : undefined;
    const customer = pick(rng, users);
    const amount = order
      ? order.total
      : roundToman(rng() * 8_000_000 + 200_000);
    const tax = roundToman(amount * 0.09);
    const status = pick(rng, STATUSES);
    const issueDaysAgo = Math.floor(rng() * 120) + 1;
    const issueDate = toIsoDate(issueDaysAgo, rng);
    const dueDate = toIsoDate(Math.max(issueDaysAgo - 15, 0), rng);

    return {
      id: `inv-${padDigits(index, 4)}`,
      invoiceNumber: `INV-1403-${padDigits(index, 4)}`,
      orderId: order?.id,
      companyId: company.id,
      companyName: company.name,
      companyNameEn: company.nameEn,
      customerName: order?.customerName ?? customer.name,
      customerNameEn: order?.customerNameEn ?? customer.nameEn,
      customerEmail: order?.customerEmail ?? customer.email,
      amount,
      tax,
      total: amount + tax,
      status,
      issueDate,
      dueDate,
      paidAt: status === "paid" ? toIsoDate(Math.floor(rng() * issueDaysAgo), rng) : undefined,
      createdAt: issueDate,
    };
  };
}

export function buildInvoices(
  count = 40,
  companies: Company[],
  orders: Order[],
  users: User[],
  seed = 201,
): Invoice[] {
  const rng = createSeededRandom(seed);
  const createInvoice = createInvoiceFactory(rng, companies, orders, users);
  return Array.from({ length: count }, (_, i) => createInvoice(i + 1));
}
