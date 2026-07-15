import type { Product } from "@/types";
import { createResourceApi } from "@/mocks/api/create-resource-api";
import { getState, setProducts } from "@/mocks/db/store";

export const productsApi = createResourceApi<Product>({
  getAll: () => getState().products,
  setAll: setProducts,
  searchKeys: [
    "name",
    "nameEn",
    "sku",
    "category",
    "categoryEn",
    "description",
    "descriptionEn",
  ],
  defaultSort: "createdAt",
});
