import type { ScrumCard } from "@/types";
import { createResourceApi } from "@/mocks/api/create-resource-api";
import { getState, setScrumCards } from "@/mocks/db/store";

export const scrumCardsApi = createResourceApi<ScrumCard>({
  getAll: () => getState().scrumCards,
  setAll: setScrumCards,
  searchKeys: [
    "title",
    "titleEn",
    "assignee",
    "assigneeEn",
    "status",
    "priority",
  ],
  defaultSort: "updatedAt",
});
