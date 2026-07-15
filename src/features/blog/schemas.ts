import { z } from "zod";
import type { BlogPost } from "@/types";

export const BLOG_STATUSES: readonly BlogPost["status"][] = [
  "draft",
  "published",
  "archived",
] as const;

export function createBlogPostSchema() {
  return z.object({
    title: z.string().min(2),
    titleEn: z.string().min(2),
    slug: z.string().min(2),
    excerpt: z.string().min(2),
    excerptEn: z.string().min(2),
    content: z.string().min(2),
    contentEn: z.string().min(2),
    category: z.string().min(1),
    categoryEn: z.string().min(1),
    status: z.enum(["draft", "published", "archived"]),
    authorName: z.string().min(1),
    authorNameEn: z.string().min(1),
    tags: z.string().optional(),
  });
}

export type BlogPostFormValues = z.infer<
  ReturnType<typeof createBlogPostSchema>
>;

export function tagsToArray(tags?: string) {
  return (tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function tagsToString(tags: string[]) {
  return tags.join(", ");
}
