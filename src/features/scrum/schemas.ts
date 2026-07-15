import { z } from "zod";
import type { ScrumCard, ScrumStatus } from "@/types";

export const SCRUM_COLUMNS: readonly ScrumStatus[] = [
  "backlog",
  "todo",
  "in_progress",
  "review",
  "done",
] as const;

export const SCRUM_PRIORITIES: readonly ScrumCard["priority"][] = [
  "low",
  "medium",
  "high",
] as const;

export function createScrumCardSchema() {
  return z.object({
    title: z.string().min(2),
    titleEn: z.string().min(2),
    assignee: z.string().min(1),
    assigneeEn: z.string().min(1),
    points: z.number().min(1).max(21),
    priority: z.enum(["low", "medium", "high"]),
    status: z.enum([
      "backlog",
      "todo",
      "in_progress",
      "review",
      "done",
    ]),
  });
}

export type ScrumCardFormValues = z.infer<
  ReturnType<typeof createScrumCardSchema>
>;
