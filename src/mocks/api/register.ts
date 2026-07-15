import { registerMockResource } from "@/lib/api/mock-router";
import { activitiesApi } from "@/mocks/api/activities";
import { blogPostsApi } from "@/mocks/api/blog-posts";
import { categoriesApi } from "@/mocks/api/categories";
import { commentsApi } from "@/mocks/api/comments";
import { companiesApi } from "@/mocks/api/companies";
import { invoicesApi } from "@/mocks/api/invoices";
import { messagesApi } from "@/mocks/api/messages";
import { notificationsApi } from "@/mocks/api/notifications";
import { ordersApi } from "@/mocks/api/orders";
import { paymentsApi } from "@/mocks/api/payments";
import { productsApi } from "@/mocks/api/products";
import { scrumCardsApi } from "@/mocks/api/scrum-cards";
import { tasksApi } from "@/mocks/api/tasks";
import { usersApi } from "@/mocks/api/users";

let registered = false;

/** Idempotently wire mock ResourceApis into the HTTP mock router. */
export function registerMockApis(): void {
  if (registered) return;

  registerMockResource("users", usersApi);
  registerMockResource("products", productsApi);
  registerMockResource("orders", ordersApi);
  registerMockResource("companies", companiesApi);
  registerMockResource("categories", categoriesApi);
  registerMockResource("invoices", invoicesApi);
  registerMockResource("tasks", tasksApi);
  registerMockResource("messages", messagesApi);
  registerMockResource("notifications", notificationsApi);
  registerMockResource("payments", paymentsApi);
  registerMockResource("activities", activitiesApi);
  registerMockResource("blog-posts", blogPostsApi);
  registerMockResource("comments", commentsApi);
  registerMockResource("scrum-cards", scrumCardsApi);

  registered = true;
}

registerMockApis();
