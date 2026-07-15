import type { User } from "@/types";
import { createResourceApi } from "@/mocks/api/create-resource-api";
import { getState, setUsers } from "@/mocks/db/store";

export const usersApi = createResourceApi<User>({
  getAll: () => getState().users,
  setAll: setUsers,
  searchKeys: [
    "name",
    "nameEn",
    "email",
    "phone",
    "city",
    "cityEn",
    "nationalId",
  ],
  defaultSort: "createdAt",
});
