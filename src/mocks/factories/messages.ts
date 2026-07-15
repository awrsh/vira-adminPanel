import type { Message, User } from "@/types";
import { MESSAGE_TEMPLATES } from "@/mocks/data/templates";
import {
  createSeededRandom,
  padDigits,
  pick,
  toIsoDate,
  type Rng,
} from "@/mocks/factories/shared";

export function createMessageFactory(rng: Rng, users: User[]) {
  return function createMessage(index: number): Message {
    const sender = pick(rng, users);
    let recipient = pick(rng, users);
    if (recipient.id === sender.id) {
      recipient = pick(rng, users);
    }
    const template = pick(rng, MESSAGE_TEMPLATES);
    const threadId = `thread-${padDigits(Math.floor(index / 2) + 1, 3)}`;

    return {
      id: `msg-${padDigits(index, 4)}`,
      threadId,
      senderId: sender.id,
      senderName: sender.name,
      senderNameEn: sender.nameEn,
      recipientId: recipient.id,
      recipientName: recipient.name,
      recipientNameEn: recipient.nameEn,
      subject: template.subject,
      subjectEn: template.subjectEn,
      body: template.body,
      bodyEn: template.bodyEn,
      read: rng() > 0.4,
      starred: rng() > 0.85,
      createdAt: toIsoDate(Math.floor(rng() * 45), rng),
    };
  };
}

export function buildMessages(
  count = 45,
  users: User[],
  seed = 333,
): Message[] {
  const rng = createSeededRandom(seed);
  const createMessage = createMessageFactory(rng, users);
  return Array.from({ length: count }, (_, i) => createMessage(i + 1));
}
