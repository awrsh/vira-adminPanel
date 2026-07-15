import type { Task, User } from "@/types";
import { TASK_TEMPLATES } from "@/mocks/data/templates";
import {
  createSeededRandom,
  padDigits,
  pick,
  toIsoDate,
  type Rng,
} from "@/mocks/factories/shared";

const STATUSES: readonly Task["status"][] = [
  "todo",
  "in_progress",
  "review",
  "done",
  "cancelled",
];

const PRIORITIES: readonly Task["priority"][] = [
  "low",
  "medium",
  "medium",
  "high",
  "urgent",
];

export function createTaskFactory(rng: Rng, users: User[]) {
  const assignees = users.filter((u) =>
    ["admin", "manager", "editor", "support"].includes(u.role),
  );
  const pool = assignees.length > 0 ? assignees : users;

  return function createTask(index: number): Task {
    const template = pick(rng, TASK_TEMPLATES);
    const assignee = pick(rng, pool);
    const status = pick(rng, STATUSES);
    const createdDaysAgo = Math.floor(rng() * 60) + 1;

    return {
      id: `task-${padDigits(index, 4)}`,
      title: `${template.fa}${index > TASK_TEMPLATES.length ? ` #${index}` : ""}`,
      titleEn: `${template.en}${index > TASK_TEMPLATES.length ? ` #${index}` : ""}`,
      description: template.description,
      descriptionEn: template.descriptionEn,
      assigneeId: assignee.id,
      assigneeName: assignee.name,
      assigneeNameEn: assignee.nameEn,
      status,
      priority: pick(rng, PRIORITIES),
      dueDate: toIsoDate(Math.max(createdDaysAgo - Math.floor(rng() * 20), 0), rng),
      createdAt: toIsoDate(createdDaysAgo, rng),
      completedAt:
        status === "done"
          ? toIsoDate(Math.floor(rng() * createdDaysAgo), rng)
          : undefined,
    };
  };
}

export function buildTasks(count = 50, users: User[], seed = 301): Task[] {
  const rng = createSeededRandom(seed);
  const createTask = createTaskFactory(rng, users);
  return Array.from({ length: count }, (_, i) => createTask(i + 1));
}
