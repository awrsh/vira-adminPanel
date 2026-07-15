import { dashboardModule } from "@/features/dashboard/module";
import { usersModule } from "@/features/users/module";
import { productsModule } from "@/features/products/module";
import { ordersModule } from "@/features/orders/module";
import { settingsModule } from "@/features/settings/module";
import { analyticsModule } from "@/features/analytics/module";
import { reportsModule } from "@/features/reports/module";
import { teamModule } from "@/features/team/module";
import { billingModule } from "@/features/billing/module";
import { notificationsModule } from "@/features/notifications/module";
import { activityModule } from "@/features/activity/module";
import { filesModule } from "@/features/files/module";
import { crmModule } from "@/features/crm/module";
import { calendarModule } from "@/features/calendar/module";
import { tasksModule } from "@/features/tasks/module";
import { messagesModule } from "@/features/messages/module";
import { aiModule } from "@/features/ai/module";
import { developersModule } from "@/features/developers/module";
import { cmsModule } from "@/features/cms/module";
import { securityModule } from "@/features/security/module";
import { onboardingModule } from "@/features/onboarding/module";
import { showcaseModule } from "@/features/showcase/module";
import { scrumModule } from "@/features/scrum/module";
import { commentsModule } from "@/features/comments/module";
import { blogModule } from "@/features/blog/module";
import { influencersModule } from "@/features/influencers/module";
import { blogBoardModule } from "@/features/blog-board/module";
import { monitoringModule } from "@/features/monitoring/module";
import { meetingsModule } from "@/features/meetings/module";
import { appointmentsModule } from "@/features/appointments/module";
import { contactsModule } from "@/features/contacts/module";
import type {
  CommandItem,
  ModuleDefinition,
  NavItemConfig,
  WidgetDefinition,
} from "@/types";

const registeredModules: ModuleDefinition[] = [
  dashboardModule,
  analyticsModule,
  usersModule,
  productsModule,
  ordersModule,
  reportsModule,
  teamModule,
  crmModule,
  tasksModule,
  calendarModule,
  messagesModule,
  notificationsModule,
  activityModule,
  filesModule,
  aiModule,
  cmsModule,
  billingModule,
  developersModule,
  securityModule,
  onboardingModule,
  scrumModule,
  commentsModule,
  blogModule,
  influencersModule,
  blogBoardModule,
  monitoringModule,
  meetingsModule,
  appointmentsModule,
  contactsModule,
  showcaseModule,
  settingsModule,
];

export function getModules(): ModuleDefinition[] {
  return [...registeredModules];
}

export function registerModule(module: ModuleDefinition): void {
  const index = registeredModules.findIndex((item) => item.id === module.id);
  if (index >= 0) {
    registeredModules[index] = module;
    return;
  }
  registeredModules.push(module);
}

export function getNavItems(): NavItemConfig[] {
  return registeredModules
    .flatMap((module) => module.nav ?? [])
    .sort((a, b) => (a.order ?? 100) - (b.order ?? 100));
}

export function getCommands(): CommandItem[] {
  return registeredModules.flatMap((module) => module.commands ?? []);
}

export function getWidgets(): WidgetDefinition[] {
  return registeredModules
    .flatMap((module) => module.widgets ?? [])
    .sort((a, b) => (a.order ?? 100) - (b.order ?? 100));
}

export function getModuleById(id: string): ModuleDefinition | undefined {
  return registeredModules.find((module) => module.id === id);
}
