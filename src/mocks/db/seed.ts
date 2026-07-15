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
import {
  buildActivities,
  buildBlogPosts,
  buildCategories,
  buildComments,
  buildCompanies,
  buildInvoices,
  buildMessages,
  buildNotifications,
  buildOrders,
  buildPayments,
  buildProducts,
  buildScrumCards,
  buildTasks,
  buildUsers,
  createSeededRandom,
} from "@/mocks/factories";

export { createSeededRandom };

export interface SeedCounts {
  users: number;
  products: number;
  orders: number;
  companies: number;
  invoices: number;
  tasks: number;
  messages: number;
  notifications: number;
  payments: number;
  activities: number;
}

export const DEFAULT_SEED_COUNTS: SeedCounts = {
  users: 80,
  products: 60,
  orders: 70,
  companies: 35,
  invoices: 40,
  tasks: 50,
  messages: 45,
  notifications: 40,
  payments: 45,
  activities: 50,
};

export interface SeedResult {
  users: User[];
  products: Product[];
  orders: Order[];
  companies: Company[];
  categories: Category[];
  invoices: Invoice[];
  tasks: Task[];
  messages: Message[];
  notifications: AppNotification[];
  payments: Payment[];
  activities: Activity[];
  blogPosts: BlogPost[];
  comments: CustomerComment[];
  scrumCards: ScrumCard[];
}

/** Total record count helper. */
export function countSeedRecords(result: SeedResult): number {
  return (
    result.users.length +
    result.products.length +
    result.orders.length +
    result.companies.length +
    result.categories.length +
    result.invoices.length +
    result.tasks.length +
    result.messages.length +
    result.notifications.length +
    result.payments.length +
    result.activities.length +
    result.blogPosts.length +
    result.comments.length +
    result.scrumCards.length
  );
}

export function seedUsers(count = DEFAULT_SEED_COUNTS.users, seed = 42): User[] {
  return buildUsers(count, seed);
}

export function seedProducts(
  count = DEFAULT_SEED_COUNTS.products,
  seed = 84,
  categories?: Category[],
): Product[] {
  const cats = categories ?? buildCategories(seed + 1);
  return buildProducts(count, cats, seed);
}

export function seedOrders(
  count = DEFAULT_SEED_COUNTS.orders,
  users: User[],
  seed = 126,
): Order[] {
  return buildOrders(count, users, seed);
}

export function seedCompanies(
  count = DEFAULT_SEED_COUNTS.companies,
  seed = 55,
): Company[] {
  return buildCompanies(count, seed);
}

export function seedCategories(seed = 11): Category[] {
  return buildCategories(seed);
}

export function seedInvoices(
  count = DEFAULT_SEED_COUNTS.invoices,
  companies: Company[],
  orders: Order[],
  users: User[],
  seed = 201,
): Invoice[] {
  return buildInvoices(count, companies, orders, users, seed);
}

export function seedTasks(
  count = DEFAULT_SEED_COUNTS.tasks,
  users: User[],
  seed = 301,
): Task[] {
  return buildTasks(count, users, seed);
}

export function seedMessages(
  count = DEFAULT_SEED_COUNTS.messages,
  users: User[],
  seed = 333,
): Message[] {
  return buildMessages(count, users, seed);
}

export function seedNotifications(
  count = DEFAULT_SEED_COUNTS.notifications,
  users: User[],
  seed = 401,
): AppNotification[] {
  return buildNotifications(count, users, seed);
}

export function seedPayments(
  count = DEFAULT_SEED_COUNTS.payments,
  users: User[],
  orders: Order[],
  invoices: Invoice[],
  seed = 512,
): Payment[] {
  return buildPayments(count, users, orders, invoices, seed);
}

export function seedActivities(
  count = DEFAULT_SEED_COUNTS.activities,
  ctx: {
    users: User[];
    products: Product[];
    orders: Order[];
    invoices: Invoice[];
    tasks: Task[];
    companies: Company[];
  },
  seed = 777,
): Activity[] {
  return buildActivities(count, ctx, seed);
}

/**
 * Seeds the full mock database (≥300 realistic Persian records).
 * Deterministic for a given seed value.
 */
export function seedDatabase(
  seed = 42,
  counts: Partial<SeedCounts> = {},
): SeedResult {
  const c = { ...DEFAULT_SEED_COUNTS, ...counts };

  const users = seedUsers(c.users, seed);
  const categories = seedCategories(seed + 1);
  const products = seedProducts(c.products, seed + 42, categories);
  const companies = seedCompanies(c.companies, seed + 55);
  const orders = seedOrders(c.orders, users, seed + 84);
  const invoices = seedInvoices(
    c.invoices,
    companies,
    orders,
    users,
    seed + 201,
  );
  const tasks = seedTasks(c.tasks, users, seed + 301);
  const messages = seedMessages(c.messages, users, seed + 333);
  const notifications = seedNotifications(
    c.notifications,
    users,
    seed + 401,
  );
  const payments = seedPayments(
    c.payments,
    users,
    orders,
    invoices,
    seed + 512,
  );
  const activities = seedActivities(
    c.activities,
    { users, products, orders, invoices, tasks, companies },
    seed + 777,
  );

  const blogPosts = buildBlogPosts(12, seed + 901);
  const comments = buildComments(8, seed + 902);
  const scrumCards = buildScrumCards(seed + 903);

  const categoriesWithCounts = categories.map((category) => ({
    ...category,
    productCount: products.filter((p) => p.category === category.name).length,
  }));

  return {
    users,
    products,
    orders,
    companies,
    categories: categoriesWithCounts,
    invoices,
    tasks,
    messages,
    notifications,
    payments,
    activities,
    blogPosts,
    comments,
    scrumCards,
  };
}
