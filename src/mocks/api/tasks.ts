import type { Task } from "@/types";
import { createResourceApi } from "@/mocks/api/create-resource-api";
import { getState, setTasks } from "@/mocks/db/store";

export const tasksApi = createResourceApi<Task>({
  getAll: () => getState().tasks,
  setAll: setTasks,
  searchKeys: [
    "title",
    "titleEn",
    "description",
    "descriptionEn",
    "assigneeName",
    "assigneeNameEn",
  ],
  defaultSort: "createdAt",
});
