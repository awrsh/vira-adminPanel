import type { AppNotification, User } from "@/types";
import { NOTIFICATION_TEMPLATES } from "@/mocks/data/templates";
import {
  createSeededRandom,
  padDigits,
  pick,
  toIsoDate,
  type Rng,
} from "@/mocks/factories/shared";

export function createNotificationFactory(rng: Rng, users: User[]) {
  return function createNotification(index: number): AppNotification {
    const user = pick(rng, users);
    const template = pick(rng, NOTIFICATION_TEMPLATES);

    return {
      id: `ntf-${padDigits(index, 4)}`,
      userId: user.id,
      title: template.title,
      titleEn: template.titleEn,
      body: template.body,
      bodyEn: template.bodyEn,
      type: template.type,
      read: rng() > 0.45,
      href: pick(rng, ["/orders", "/products", "/users", "/settings", "/dashboard"]),
      createdAt: toIsoDate(Math.floor(rng() * 20), rng),
    };
  };
}

export function buildNotifications(
  count = 40,
  users: User[],
  seed = 401,
): AppNotification[] {
  const rng = createSeededRandom(seed);
  const createNotification = createNotificationFactory(rng, users);
  return Array.from({ length: count }, (_, i) => createNotification(i + 1));
}
