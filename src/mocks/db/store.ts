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
import { seedDatabase } from "@/mocks/db/seed";

export interface DbState {
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

function cloneState(state: DbState): DbState {
  return structuredClone(state);
}

const initial = seedDatabase();

let state: DbState = cloneState(initial);

export function getState(): DbState {
  return state;
}

export function setUsers(users: User[]): void {
  state = { ...state, users };
}

export function setProducts(products: Product[]): void {
  state = { ...state, products };
}

export function setOrders(orders: Order[]): void {
  state = { ...state, orders };
}

export function setCompanies(companies: Company[]): void {
  state = { ...state, companies };
}

export function setCategories(categories: Category[]): void {
  state = { ...state, categories };
}

export function setInvoices(invoices: Invoice[]): void {
  state = { ...state, invoices };
}

export function setTasks(tasks: Task[]): void {
  state = { ...state, tasks };
}

export function setMessages(messages: Message[]): void {
  state = { ...state, messages };
}

export function setNotifications(notifications: AppNotification[]): void {
  state = { ...state, notifications };
}

export function setPayments(payments: Payment[]): void {
  state = { ...state, payments };
}

export function setActivities(activities: Activity[]): void {
  state = { ...state, activities };
}

export function setBlogPosts(blogPosts: BlogPost[]): void {
  state = { ...state, blogPosts };
}

export function setComments(comments: CustomerComment[]): void {
  state = { ...state, comments };
}

export function setScrumCards(scrumCards: ScrumCard[]): void {
  state = { ...state, scrumCards };
}

/** Reset the in-memory store to a fresh seeded dataset. */
export function reset(): void {
  state = cloneState(seedDatabase());
}

/** Total records currently in memory. */
export function getRecordCount(): number {
  const s = state;
  return (
    s.users.length +
    s.products.length +
    s.orders.length +
    s.companies.length +
    s.categories.length +
    s.invoices.length +
    s.tasks.length +
    s.messages.length +
    s.notifications.length +
    s.payments.length +
    s.activities.length +
    s.blogPosts.length +
    s.comments.length +
    s.scrumCards.length
  );
}
