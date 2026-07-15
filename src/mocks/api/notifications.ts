import type { AppNotification } from "@/types";
import { createResourceApi } from "@/mocks/api/create-resource-api";
import { getState, setNotifications } from "@/mocks/db/store";

export const notificationsApi = createResourceApi<AppNotification>({
  getAll: () => getState().notifications,
  setAll: setNotifications,
  searchKeys: ["title", "titleEn", "body", "bodyEn"],
  defaultSort: "createdAt",
});
