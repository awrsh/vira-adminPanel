import type {
  Activity,
  Company,
  Invoice,
  Order,
  Product,
  Task,
  User,
} from "@/types";
import { ACTIVITY_ACTIONS } from "@/mocks/data/templates";
import {
  createSeededRandom,
  padDigits,
  pick,
  toIsoDate,
  type Rng,
} from "@/mocks/factories/shared";

export function createActivityFactory(
  rng: Rng,
  ctx: {
    users: User[];
    products: Product[];
    orders: Order[];
    invoices: Invoice[];
    tasks: Task[];
    companies: Company[];
  },
) {
  return function createActivity(index: number): Activity {
    const actor = pick(rng, ctx.users);
    const action = pick(rng, ACTIVITY_ACTIONS);
    const kind = pick(rng, [
      "user",
      "product",
      "order",
      "invoice",
      "task",
      "company",
      "system",
    ] as const);

    let entityId = "system";
    let entityLabel = "سامانه";
    let entityLabelEn = "System";

    switch (kind) {
      case "user": {
        const target = pick(rng, ctx.users);
        entityId = target.id;
        entityLabel = target.name;
        entityLabelEn = target.nameEn;
        break;
      }
      case "product": {
        const target = pick(rng, ctx.products);
        entityId = target.id;
        entityLabel = target.name;
        entityLabelEn = target.nameEn;
        break;
      }
      case "order": {
        const target = pick(rng, ctx.orders);
        entityId = target.id;
        entityLabel = target.orderNumber;
        entityLabelEn = target.orderNumber;
        break;
      }
      case "invoice": {
        const target = pick(rng, ctx.invoices);
        entityId = target.id;
        entityLabel = target.invoiceNumber;
        entityLabelEn = target.invoiceNumber;
        break;
      }
      case "task": {
        const target = pick(rng, ctx.tasks);
        entityId = target.id;
        entityLabel = target.title;
        entityLabelEn = target.titleEn;
        break;
      }
      case "company": {
        const target = pick(rng, ctx.companies);
        entityId = target.id;
        entityLabel = target.name;
        entityLabelEn = target.nameEn;
        break;
      }
      default:
        break;
    }

    return {
      id: `act-${padDigits(index, 4)}`,
      actorId: actor.id,
      actorName: actor.name,
      actorNameEn: actor.nameEn,
      action: action.fa,
      actionEn: action.en,
      entityType: kind,
      entityId,
      entityLabel,
      entityLabelEn,
      createdAt: toIsoDate(Math.floor(rng() * 30), rng),
    };
  };
}

export function buildActivities(
  count = 50,
  ctx: {
    users: User[];
    products: Product[];
    orders: Order[];
    invoices: Invoice[];
    tasks: Task[];
    companies: Company[];
  },
  seed = 777,
): Activity[] {
  const rng = createSeededRandom(seed);
  const createActivity = createActivityFactory(rng, ctx);
  return Array.from({ length: count }, (_, i) => createActivity(i + 1));
}
