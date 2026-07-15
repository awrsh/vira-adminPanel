/** Additional domain entity types for the mock database. */

export interface Company {
  id: string;
  name: string;
  nameEn: string;
  nationalId: string;
  registrationNumber: string;
  city: string;
  cityEn: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  industry: string;
  industryEn: string;
  employeeCount: number;
  status: "active" | "inactive" | "prospect";
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  descriptionEn: string;
  parentId?: string;
  productCount: number;
  status: "active" | "archived";
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId?: string;
  companyId: string;
  companyName: string;
  companyNameEn: string;
  customerName: string;
  customerNameEn: string;
  customerEmail: string;
  amount: number;
  tax: number;
  total: number;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  issueDate: string;
  dueDate: string;
  paidAt?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  assigneeId: string;
  assigneeName: string;
  assigneeNameEn: string;
  status: "todo" | "in_progress" | "review" | "done" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate: string;
  createdAt: string;
  completedAt?: string;
}

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  senderNameEn: string;
  recipientId: string;
  recipientName: string;
  recipientNameEn: string;
  subject: string;
  subjectEn: string;
  body: string;
  bodyEn: string;
  read: boolean;
  starred: boolean;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
  type: "info" | "success" | "warning" | "error" | "system";
  read: boolean;
  href?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  paymentNumber: string;
  orderId?: string;
  invoiceId?: string;
  userId: string;
  userName: string;
  userNameEn: string;
  amount: number;
  method: "card" | "transfer" | "wallet" | "cash";
  gateway: string;
  gatewayEn: string;
  status: "pending" | "success" | "failed" | "refunded";
  referenceCode: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  actorId: string;
  actorName: string;
  actorNameEn: string;
  action: string;
  actionEn: string;
  entityType:
    | "user"
    | "product"
    | "order"
    | "invoice"
    | "task"
    | "company"
    | "system";
  entityId: string;
  entityLabel: string;
  entityLabelEn: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: string;
}
