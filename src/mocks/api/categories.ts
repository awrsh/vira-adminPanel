import type { Category } from "@/types";
import { createResourceApi } from "@/mocks/api/create-resource-api";
import { getState, setCategories } from "@/mocks/db/store";

export const categoriesApi = createResourceApi<Category>({
  getAll: () => getState().categories,
  setAll: setCategories,
  searchKeys: ["name", "nameEn", "slug", "description", "descriptionEn"],
  defaultSort: "name",
});
