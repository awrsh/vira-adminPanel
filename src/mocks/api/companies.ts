import type { Company } from "@/types";
import { createResourceApi } from "@/mocks/api/create-resource-api";
import { getState, setCompanies } from "@/mocks/db/store";

export const companiesApi = createResourceApi<Company>({
  getAll: () => getState().companies,
  setAll: setCompanies,
  searchKeys: [
    "name",
    "nameEn",
    "email",
    "phone",
    "city",
    "cityEn",
    "nationalId",
    "industry",
    "industryEn",
  ],
  defaultSort: "createdAt",
});
