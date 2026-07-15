import type { CustomerComment } from "@/types";
import { createResourceApi } from "@/mocks/api/create-resource-api";
import { getState, setComments } from "@/mocks/db/store";

export const commentsApi = createResourceApi<CustomerComment>({
  getAll: () => getState().comments,
  setAll: setComments,
  searchKeys: [
    "name",
    "nameEn",
    "body",
    "bodyEn",
    "product",
    "productEn",
    "role",
    "roleEn",
  ],
  defaultSort: "createdAt",
});
