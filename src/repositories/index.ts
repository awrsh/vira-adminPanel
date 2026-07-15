import {
  createDirectRepository,
  createHttpRepository,
} from "@/repositories/create-repository";
import type { Repository } from "@/repositories/types";
import type {
  Activity,
  AppNotification,
  BlogPost,
  Category,
  Company,
  CustomerComment,
  Invoice,
  Message,
  Order,
  Payment,
  Product,
  ScrumCard,
  Task,
  User,
} from "@/types";
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

import "@/mocks/api/register";

/**
 * Default repositories talk to the in-memory ResourceApi (fast path for the app).
 * Prefer `*HttpRepository` when you want every call to go through the Axios client.
 */
export const usersRepository: Repository<User> =
  createDirectRepository(usersApi);

export const productsRepository: Repository<Product> =
  createDirectRepository(productsApi);

export const ordersRepository: Repository<Order> =
  createDirectRepository(ordersApi);

export const companiesRepository: Repository<Company> =
  createDirectRepository(companiesApi);

export const categoriesRepository: Repository<Category> =
  createDirectRepository(categoriesApi);

export const invoicesRepository: Repository<Invoice> =
  createDirectRepository(invoicesApi);

export const tasksRepository: Repository<Task> =
  createDirectRepository(tasksApi);

export const messagesRepository: Repository<Message> =
  createDirectRepository(messagesApi);

export const notificationsRepository: Repository<AppNotification> =
  createDirectRepository(notificationsApi);

export const paymentsRepository: Repository<Payment> =
  createDirectRepository(paymentsApi);

export const activitiesRepository: Repository<Activity> =
  createDirectRepository(activitiesApi);

export const blogPostsRepository: Repository<BlogPost> =
  createDirectRepository(blogPostsApi);

export const commentsRepository: Repository<CustomerComment> =
  createDirectRepository(commentsApi);

export const scrumCardsRepository: Repository<ScrumCard> =
  createDirectRepository(scrumCardsApi);

/** HTTP-backed variants — same ResourceApis via the typed Axios mock adapter. */
export const usersHttpRepository = createHttpRepository<User>("users");
export const productsHttpRepository = createHttpRepository<Product>("products");
export const ordersHttpRepository = createHttpRepository<Order>("orders");
export const companiesHttpRepository =
  createHttpRepository<Company>("companies");
export const categoriesHttpRepository =
  createHttpRepository<Category>("categories");
export const invoicesHttpRepository = createHttpRepository<Invoice>("invoices");
export const tasksHttpRepository = createHttpRepository<Task>("tasks");
export const messagesHttpRepository = createHttpRepository<Message>("messages");
export const notificationsHttpRepository =
  createHttpRepository<AppNotification>("notifications");
export const paymentsHttpRepository = createHttpRepository<Payment>("payments");
export const activitiesHttpRepository =
  createHttpRepository<Activity>("activities");
export const blogPostsHttpRepository =
  createHttpRepository<BlogPost>("blog-posts");
export const commentsHttpRepository =
  createHttpRepository<CustomerComment>("comments");
export const scrumCardsHttpRepository =
  createHttpRepository<ScrumCard>("scrum-cards");

export {
  createDirectRepository,
  createHttpRepository,
} from "@/repositories/create-repository";
export type { Repository, RepositoryResource } from "@/repositories/types";
