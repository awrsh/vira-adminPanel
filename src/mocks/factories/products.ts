import type { Product } from "@/types";
import type { Category } from "@/types";
import { PRODUCT_NAMES } from "@/mocks/data/persian";
import {
  createSeededRandom,
  padDigits,
  pick,
  roundToman,
  toIsoDate,
  type Rng,
} from "@/mocks/factories/shared";

const STATUSES: readonly Product["status"][] = [
  "published",
  "published",
  "draft",
  "archived",
];

export function createProductFactory(rng: Rng, categories: Category[]) {
  return function createProduct(index: number): Product {
    const base = pick(rng, PRODUCT_NAMES);
    const category = pick(rng, categories);
    const variant = index > PRODUCT_NAMES.length ? ` ${index}` : "";

    return {
      id: `p-${padDigits(index, 4)}`,
      name: `${base.fa}${variant}`,
      nameEn: `${base.en}${variant}`,
      sku: `SKU-${padDigits(index, 5)}`,
      category: category.name,
      categoryEn: category.nameEn,
      price: roundToman(rng() * 4_500_000 + 150_000),
      stock: Math.floor(rng() * 500),
      status: pick(rng, STATUSES),
      description: base.description,
      descriptionEn: base.descriptionEn,
      createdAt: toIsoDate(Math.floor(rng() * 200) + 1, rng),
    };
  };
}

export function buildProducts(
  count = 60,
  categories: Category[],
  seed = 84,
): Product[] {
  const rng = createSeededRandom(seed);
  const createProduct = createProductFactory(rng, categories);
  return Array.from({ length: count }, (_, i) => createProduct(i + 1));
}
