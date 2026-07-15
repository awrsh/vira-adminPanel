import type { Category } from "@/types";
import { PRODUCT_CATEGORIES } from "@/mocks/data/persian";
import {
  createSeededRandom,
  padDigits,
  toIsoDate,
  type Rng,
} from "@/mocks/factories/shared";

const DESCRIPTIONS: ReadonlyArray<{ fa: string; en: string }> = [
  {
    fa: "محصولات و خدمات مرتبط با این دسته‌بندی",
    en: "Products and services related to this category",
  },
  {
    fa: "مجموعه‌ای از اقلام پرکاربرد برای تیم‌های فنی",
    en: "A set of frequently used items for technical teams",
  },
  {
    fa: "دسته‌بندی مناسب برای مشتریان سازمانی",
    en: "Category suited for enterprise customers",
  },
];

export function createCategoryFactory(rng: Rng) {
  return function createCategory(
    index: number,
    base: { fa: string; en: string },
  ): Category {
    const desc = DESCRIPTIONS[index % DESCRIPTIONS.length]!;
    const slug = base.en.toLowerCase().replace(/\s+/g, "-");

    return {
      id: `cat-${padDigits(index, 3)}`,
      name: base.fa,
      nameEn: base.en,
      slug,
      description: desc.fa,
      descriptionEn: desc.en,
      productCount: Math.floor(rng() * 40) + 2,
      status: rng() > 0.12 ? "active" : "archived",
      createdAt: toIsoDate(Math.floor(rng() * 400) + 10, rng),
    };
  };
}

export function buildCategories(seed = 11): Category[] {
  const rng = createSeededRandom(seed);
  const createCategory = createCategoryFactory(rng);
  const extras: ReadonlyArray<{ fa: string; en: string }> = [
    { fa: "زیرساخت", en: "Infrastructure" },
    { fa: "هوش مصنوعی", en: "Artificial Intelligence" },
    { fa: "یکپارچه‌سازی", en: "Integrations" },
    { fa: "منابع انسانی", en: "HR Tools" },
    { fa: "فروش و CRM", en: "Sales & CRM" },
    { fa: "مالی و حسابداری", en: "Finance & Accounting" },
    { fa: "ذخیره‌سازی", en: "Storage" },
  ];

  const all = [...PRODUCT_CATEGORIES, ...extras];
  return all.map((item, index) => createCategory(index + 1, item));
}
