import type { LucideIcon } from "lucide-react";

export type Locale = "fa" | "en";
export type ThemeMode = "light" | "dark" | "system";
export type Role = "admin" | "manager" | "editor" | "support" | "customer";

export type Permission =
  | "dashboard:view"
  | "users:view"
  | "users:create"
  | "users:edit"
  | "users:delete"
  | "products:view"
  | "products:create"
  | "products:edit"
  | "products:delete"
  | "orders:view"
  | "orders:create"
  | "orders:edit"
  | "orders:delete"
  | "settings:view"
  | "settings:edit"
  | "analytics:view"
  | "reports:view"
  | "reports:create"
  | "reports:edit"
  | "reports:delete"
  | "team:view"
  | "team:create"
  | "team:edit"
  | "team:delete"
  | "billing:view"
  | "billing:edit"
  | "notifications:view"
  | "notifications:edit"
  | "activity:view"
  | "files:view"
  | "files:create"
  | "files:edit"
  | "files:delete"
  | "crm:view"
  | "crm:create"
  | "crm:edit"
  | "crm:delete"
  | "calendar:view"
  | "calendar:create"
  | "calendar:edit"
  | "calendar:delete"
  | "tasks:view"
  | "tasks:create"
  | "tasks:edit"
  | "tasks:delete"
  | "messages:view"
  | "messages:create"
  | "messages:edit"
  | "messages:delete"
  | "ai:view"
  | "developers:view"
  | "developers:edit"
  | "cms:view"
  | "cms:create"
  | "cms:edit"
  | "cms:delete"
  | "security:view"
  | "security:edit"
  | "onboarding:view"
  | "onboarding:edit"
  | "showcase:view"
  | "scrum:view"
  | "scrum:create"
  | "scrum:edit"
  | "scrum:delete"
  | "comments:view"
  | "comments:create"
  | "comments:edit"
  | "comments:delete"
  | "blog:view"
  | "blog:create"
  | "blog:edit"
  | "blog:delete"
  | "influencers:view"
  | "blog-board:view"
  | "monitoring:view"
  | "meetings:view"
  | "appointments:view"
  | "contacts:view";

export interface NavItemConfig {
  id: string;
  /** Omit when the item is a collapsible group with children only. */
  href?: string;
  labelKey: string;
  icon: LucideIcon;
  order?: number;
  permissions?: Permission[];
  badgeKey?: string;
  disabled?: boolean;
  /** Nested sidebar children (accordion groups). */
  children?: NavItemConfig[];
}

export interface CommandItem {
  id: string;
  labelKey: string;
  href?: string;
  keywords?: string[];
  group?: "pages" | "commands" | "users" | "products" | "settings" | "modules";
  icon?: LucideIcon;
  action?: string;
  permissions?: Permission[];
}

export interface WidgetDefinition {
  id: string;
  component: string;
  /** CSS grid column span at lg breakpoint */
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** CSS grid row span */
  rowSpan?: 1 | 2 | 3;
  order?: number;
  permissions?: Permission[];
}

export interface RouteManifest {
  path: string;
  labelKey: string;
}

export interface ModuleDefinition {
  id: string;
  nav?: NavItemConfig[];
  routes?: RouteManifest[];
  commands?: CommandItem[];
  permissions?: Permission[];
  widgets?: WidgetDefinition[];
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: Record<string, string | number | boolean | undefined>;
}

export interface User {
  id: string;
  name: string;
  nameEn: string;
  email: string;
  phone: string;
  nationalId: string;
  city: string;
  cityEn: string;
  address: string;
  role: Role;
  status: "active" | "inactive" | "pending";
  avatar?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  sku: string;
  category: string;
  categoryEn: string;
  price: number;
  stock: number;
  status: "published" | "draft" | "archived";
  image?: string;
  description: string;
  descriptionEn: string;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerNameEn: string;
  customerEmail: string;
  city: string;
  cityEn: string;
  total: number;
  items: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "paid" | "unpaid" | "refunded";
  createdAt: string;
}

export interface SessionUser {
  id: string;
  name: string;
  nameEn: string;
  email: string;
  role: Role;
  avatar?: string;
  permissions: Permission[];
}

export type {
  Company,
  Category,
  Invoice,
  Task,
  Message,
  AppNotification,
  Payment,
  Activity,
} from "./entities";

export type {
  Report,
  TeamMember,
  TeamInvitation,
  Subscription,
  PaymentMethod,
  FileItem,
  CrmCustomer,
  CrmLead,
  CalendarEvent,
  AiConversation,
  AiPrompt,
  ApiKeyRecord,
  WebhookEndpoint,
  CmsPage,
  CmsPost,
  BlogPost,
  CustomerComment,
  ScrumCard,
  ScrumStatus,
  SecuritySession,
  LoginHistoryItem,
  AnalyticsOverview,
} from "./modules";

/** Alias used across the app for in-app notifications. */
export type { AppNotification as Notification } from "./entities";
