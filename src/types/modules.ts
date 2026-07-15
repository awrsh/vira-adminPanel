/** Extended domain entities for commercial SaaS modules. */

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

export interface Report {
  id: string;
  name: string;
  nameEn: string;
  type: "revenue" | "users" | "orders" | "custom";
  status: "ready" | "running" | "scheduled" | "failed";
  schedule: "none" | "daily" | "weekly" | "monthly";
  format: "csv" | "pdf" | "xlsx";
  rangeStart: string;
  rangeEnd: string;
  createdBy: string;
  createdByEn: string;
  createdAt: string;
  lastRunAt?: string;
}

export interface TeamMember {
  id: string;
  userId: string;
  name: string;
  nameEn: string;
  email: string;
  role: "admin" | "manager" | "editor" | "support" | "customer";
  status: "active" | "invited" | "suspended";
  invitedAt?: string;
  joinedAt?: string;
  lastActiveAt?: string;
}

export interface TeamInvitation {
  id: string;
  email: string;
  role: "admin" | "manager" | "editor" | "support";
  status: "pending" | "accepted" | "expired" | "revoked";
  invitedBy: string;
  invitedByEn: string;
  createdAt: string;
  expiresAt: string;
}

export interface Subscription {
  id: string;
  plan: "starter" | "pro" | "agency" | "enterprise";
  status: "active" | "past_due" | "cancelled" | "trialing";
  priceMonthly: number;
  renewsAt: string;
  cancelledAt?: string;
  seats: number;
  seatsUsed: number;
}

export interface PaymentMethod {
  id: string;
  brand: string;
  brandEn: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

export interface FileItem {
  id: string;
  name: string;
  nameEn: string;
  type: "folder" | "image" | "pdf" | "doc" | "other";
  mimeType?: string;
  size: number;
  parentId?: string;
  path: string;
  url?: string;
  uploadedBy: string;
  uploadedByEn: string;
  createdAt: string;
}

export interface CrmCustomer {
  id: string;
  name: string;
  nameEn: string;
  email: string;
  phone: string;
  company: string;
  companyEn: string;
  status: "active" | "inactive" | "churned";
  ownerName: string;
  ownerNameEn: string;
  notes: string;
  notesEn: string;
  lifetimeValue: number;
  createdAt: string;
}

export interface CrmLead {
  id: string;
  name: string;
  nameEn: string;
  email: string;
  company: string;
  companyEn: string;
  stage: "new" | "contacted" | "negotiation" | "won" | "lost";
  value: number;
  ownerName: string;
  ownerNameEn: string;
  createdAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  startAt: string;
  endAt: string;
  allDay: boolean;
  location?: string;
  locationEn?: string;
  reminderMinutes?: number;
  createdBy: string;
  createdByEn: string;
}

export interface AiConversation {
  id: string;
  title: string;
  titleEn: string;
  model: string;
  tokenUsage: number;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AiPrompt {
  id: string;
  title: string;
  titleEn: string;
  prompt: string;
  promptEn: string;
  category: string;
  categoryEn: string;
  usageCount: number;
}

export interface ApiKeyRecord {
  id: string;
  name: string;
  nameEn: string;
  prefix: string;
  scopes: string[];
  status: "active" | "revoked";
  lastUsedAt?: string;
  createdAt: string;
}

export interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  status: "active" | "disabled" | "failing";
  secretHint: string;
  createdAt: string;
  lastDeliveryAt?: string;
}

export interface CmsPage {
  id: string;
  title: string;
  titleEn: string;
  slug: string;
  status: "draft" | "published" | "archived";
  seoTitle: string;
  seoTitleEn: string;
  updatedAt: string;
  createdAt: string;
}

export interface CmsPost {
  id: string;
  title: string;
  titleEn: string;
  slug: string;
  category: string;
  categoryEn: string;
  status: "draft" | "published" | "archived";
  authorName: string;
  authorNameEn: string;
  publishedAt?: string;
  createdAt: string;
}

/** Blog post with full editorial content. */
export interface BlogPost {
  id: string;
  title: string;
  titleEn: string;
  slug: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  category: string;
  categoryEn: string;
  status: "draft" | "published" | "archived";
  authorName: string;
  authorNameEn: string;
  tags: string[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/** Customer review / testimonial. */
export interface CustomerComment {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  body: string;
  bodyEn: string;
  rating: number;
  likes: number;
  product: string;
  productEn: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export type ScrumStatus =
  | "backlog"
  | "todo"
  | "in_progress"
  | "review"
  | "done";

/** Scrum board card. */
export interface ScrumCard {
  id: string;
  title: string;
  titleEn: string;
  assignee: string;
  assigneeEn: string;
  points: number;
  priority: "low" | "medium" | "high";
  status: ScrumStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SecuritySession {
  id: string;
  device: string;
  deviceEn: string;
  browser: string;
  ip: string;
  location: string;
  locationEn: string;
  current: boolean;
  lastActiveAt: string;
  createdAt: string;
}

export interface LoginHistoryItem {
  id: string;
  status: "success" | "failed" | "blocked";
  ip: string;
  device: string;
  deviceEn: string;
  location: string;
  locationEn: string;
  createdAt: string;
}

export interface AnalyticsOverview {
  revenue: { total: number; changePercent: number; series: { label: string; value: number }[] };
  users: { total: number; active: number; changePercent: number; series: { label: string; value: number }[] };
  conversionRate: number;
  retentionRate: number;
  traffic: { label: string; value: number }[];
  devices: { label: string; value: number }[];
  geo: { label: string; labelEn: string; value: number }[];
  funnel: { stage: string; stageEn: string; value: number }[];
  cohorts: { cohort: string; week0: number; week1: number; week2: number; week3: number }[];
}
