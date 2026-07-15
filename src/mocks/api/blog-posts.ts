import type { BlogPost } from "@/types";
import { createResourceApi } from "@/mocks/api/create-resource-api";
import { getState, setBlogPosts } from "@/mocks/db/store";

export const blogPostsApi = createResourceApi<BlogPost>({
  getAll: () => getState().blogPosts,
  setAll: setBlogPosts,
  searchKeys: [
    "title",
    "titleEn",
    "slug",
    "category",
    "categoryEn",
    "authorName",
    "authorNameEn",
    "excerpt",
    "excerptEn",
  ],
  defaultSort: "updatedAt",
});
