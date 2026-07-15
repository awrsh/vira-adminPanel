import { z } from "zod";
import type { CustomerComment } from "@/types";

export const COMMENT_STATUSES: readonly CustomerComment["status"][] = [
  "pending",
  "approved",
  "rejected",
] as const;

export function createCommentSchema() {
  return z.object({
    name: z.string().min(2),
    nameEn: z.string().min(2),
    role: z.string().min(1),
    roleEn: z.string().min(1),
    body: z.string().min(2),
    bodyEn: z.string().min(2),
    rating: z.number().min(1).max(5),
    product: z.string().min(1),
    productEn: z.string().min(1),
    status: z.enum(["pending", "approved", "rejected"]),
  });
}

export type CommentFormValues = z.infer<ReturnType<typeof createCommentSchema>>;
