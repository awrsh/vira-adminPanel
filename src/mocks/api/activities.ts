import type { Activity } from "@/types";
import { createResourceApi } from "@/mocks/api/create-resource-api";
import { getState, setActivities } from "@/mocks/db/store";

export const activitiesApi = createResourceApi<Activity>({
  getAll: () => getState().activities,
  setAll: setActivities,
  searchKeys: [
    "actorName",
    "actorNameEn",
    "action",
    "actionEn",
    "entityLabel",
    "entityLabelEn",
  ],
  defaultSort: "createdAt",
});
