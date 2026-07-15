/**
 * Scaffolds commercial SaaS modules (routes, feature folders, module registry entries).
 * Run: node scripts/scaffold-modules.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const modules = [
  { id: "analytics", href: "/analytics", order: 5, icon: "BarChart3", perms: ["analytics:view"], viewOnly: true },
  { id: "reports", href: "/reports", order: 6, icon: "FileBarChart", perms: ["reports:view", "reports:create", "reports:edit", "reports:delete"] },
  { id: "team", href: "/team", order: 7, icon: "UsersRound", perms: ["team:view", "team:create", "team:edit", "team:delete"] },
  { id: "billing", href: "/billing", order: 8, icon: "CreditCard", perms: ["billing:view", "billing:edit"] },
  { id: "notifications", href: "/notifications", order: 9, icon: "Bell", perms: ["notifications:view", "notifications:edit"] },
  { id: "activity", href: "/activity", order: 10, icon: "Activity", perms: ["activity:view"], viewOnly: true },
  { id: "files", href: "/files", order: 11, icon: "FolderOpen", perms: ["files:view", "files:create", "files:edit", "files:delete"] },
  { id: "crm", href: "/crm", order: 12, icon: "Contact", perms: ["crm:view", "crm:create", "crm:edit", "crm:delete"] },
  { id: "calendar", href: "/calendar", order: 13, icon: "CalendarDays", perms: ["calendar:view", "calendar:create", "calendar:edit", "calendar:delete"] },
  { id: "tasks", href: "/tasks", order: 14, icon: "Kanban", perms: ["tasks:view", "tasks:create", "tasks:edit", "tasks:delete"] },
  { id: "messages", href: "/messages", order: 15, icon: "MessageSquare", perms: ["messages:view", "messages:create", "messages:edit", "messages:delete"] },
  { id: "ai", href: "/ai", order: 16, icon: "Sparkles", perms: ["ai:view"], viewOnly: true },
  { id: "developers", href: "/developers", order: 17, icon: "Code2", perms: ["developers:view", "developers:edit"] },
  { id: "cms", href: "/cms", order: 18, icon: "Newspaper", perms: ["cms:view", "cms:create", "cms:edit", "cms:delete"] },
  { id: "security", href: "/security", order: 19, icon: "ShieldCheck", perms: ["security:view", "security:edit"] },
  { id: "onboarding", href: "/onboarding", order: 20, icon: "Rocket", perms: ["onboarding:view", "onboarding:edit"], hideNav: false },
];

function pascal(id) {
  return id
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeIfMissing(file, content) {
  if (fs.existsSync(file)) return false;
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content, "utf8");
  return true;
}

for (const mod of modules) {
  const P = pascal(mod.id);
  const featureDir = path.join(root, "src/features", mod.id);
  const routeDir = path.join(root, "src/app/[locale]/(dashboard)", mod.id);

  const moduleTs = `import { ${mod.icon} } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const ${mod.id}Module: ModuleDefinition = {
  id: "${mod.id}",
  permissions: ${JSON.stringify(mod.perms)},
  nav: [
    {
      id: "${mod.id}",
      href: "${mod.href}",
      labelKey: "nav.${mod.id}",
      icon: ${mod.icon},
      order: ${mod.order},
      permissions: ["${mod.perms[0]}"],
    },
  ],
  routes: [{ path: "${mod.href}", labelKey: "nav.${mod.id}" }],
  commands: [
    {
      id: "go-${mod.id}",
      labelKey: "command.go${P}",
      href: "${mod.href}",
      group: "pages",
      icon: ${mod.icon},
      keywords: ["${mod.id}"],
      permissions: ["${mod.perms[0]}"],
    },
  ],
};
`;

  const pageView = `"use client";

import { ${P}PageView } from "@/features/${mod.id}/${mod.id}-page";

export default function ${P}Page() {
  return <${P}PageView />;
}
`;

  const indexTs = `export { ${mod.id}Module } from "@/features/${mod.id}/module";
export { ${P}PageView } from "@/features/${mod.id}/${mod.id}-page";
`;

  // Placeholder — real UI filled by feature files written separately if missing
  const featurePage = `"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/shared/page-header";
import { Surface } from "@/components/ui/surface";
import { EmptyState } from "@/components/shared/empty-state";

/** ${P} module workspace — Atlas Editorial shell. */
export function ${P}PageView() {
  const t = useTranslations("${mod.id}");

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("subtitle")} />
      <Surface elevated className="p-6">
        <EmptyState title={t("emptyTitle")} description={t("emptyDescription")} />
      </Surface>
    </div>
  );
}
`;

  writeIfMissing(path.join(featureDir, "module.ts"), moduleTs);
  writeIfMissing(path.join(featureDir, "index.ts"), indexTs);
  writeIfMissing(path.join(featureDir, `${mod.id}-page.tsx`), featurePage);
  writeIfMissing(path.join(routeDir, "page.tsx"), pageView);
}

// Registry file
const registry = `import { dashboardModule } from "@/features/dashboard/module";
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
  return registeredModules.find((module) => module.id === module.id);
}
`;

// Fix typo in getModuleById
const registryFixed = registry.replace(
  "registeredModules.find((module) => module.id === module.id)",
  "registeredModules.find((module) => module.id === id)",
);

fs.writeFileSync(path.join(root, "src/lib/modules/registry.ts"), registryFixed, "utf8");
console.log(`Scaffolded ${modules.length} modules + registry`);
