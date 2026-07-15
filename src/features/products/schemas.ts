import { z } from "zod";
import type { Product } from "@/types";

export const PRODUCT_STATUSES: readonly Product["status"][] = [
  "published",
  "draft",
  "archived",
] as const;

export interface ProductValidationMessages {
  nameRequired: string;
  nameMin: string;
  nameEnRequired: string;
  skuRequired: string;
  skuMin: string;
  categoryRequired: string;
  categoryEnRequired: string;
  priceRequired: string;
  priceMin: string;
  stockRequired: string;
  stockMin: string;
  statusRequired: string;
  descriptionRequired: string;
  descriptionEnRequired: string;
}

export function createProductSchema(messages: ProductValidationMessages) {
  return z.object({
    name: z.string().min(1, messages.nameRequired).min(2, messages.nameMin),
    nameEn: z
      .string()
      .min(1, messages.nameEnRequired)
      .min(2, messages.nameMin),
    sku: z.string().min(1, messages.skuRequired).min(2, messages.skuMin),
    category: z.string().min(1, messages.categoryRequired),
    categoryEn: z.string().min(1, messages.categoryEnRequired),
    price: z
      .number({ message: messages.priceRequired })
      .min(0, messages.priceMin),
    stock: z
      .number({ message: messages.stockRequired })
      .min(0, messages.stockMin)
      .int(messages.stockMin),
    status: z.enum(["published", "draft", "archived"], {
      message: messages.statusRequired,
    }),
    description: z
      .string()
      .min(1, messages.descriptionRequired)
      .min(2, messages.descriptionRequired),
    descriptionEn: z
      .string()
      .min(1, messages.descriptionEnRequired)
      .min(2, messages.descriptionEnRequired),
  });
}

export type ProductFormValues = z.infer<
  ReturnType<typeof createProductSchema>
>;
