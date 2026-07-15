/** Shared factory utilities for deterministic mock seeding. */

export type Rng = () => number;

/** Mulberry32 seeded PRNG. */
export function createSeededRandom(seed: number): Rng {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pick<T>(rng: Rng, items: readonly T[]): T {
  const item = items[Math.floor(rng() * items.length)];
  if (item === undefined) {
    throw new Error("Cannot pick from empty array");
  }
  return item;
}

export function padDigits(value: number, length: number): string {
  return String(value).padStart(length, "0");
}

/** Iranian mobile: 09xxxxxxxxx */
export function generatePhone(rng: Rng): string {
  const rest = Math.floor(rng() * 1_000_000_000);
  return `09${padDigits(rest, 9)}`;
}

/** 10-digit Iranian-style national ID (checksum not enforced). */
export function generateNationalId(rng: Rng): string {
  return padDigits(Math.floor(rng() * 10_000_000_000), 10);
}

/** Company national ID (شناسه ملی) style 11 digits. */
export function generateCompanyNationalId(rng: Rng): string {
  return padDigits(Math.floor(rng() * 100_000_000_000), 11);
}

export function toIsoDate(daysAgo: number, rng: Rng): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - daysAgo);
  date.setUTCHours(
    Math.floor(rng() * 24),
    Math.floor(rng() * 60),
    Math.floor(rng() * 60),
    0,
  );
  return date.toISOString();
}

export function roundToman(value: number): number {
  return Math.round(value / 1000) * 1000;
}
