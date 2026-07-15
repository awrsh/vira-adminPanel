import {
  Activity,
  AlertCircle,
  BadgeCheck,
  BarChart3,
  Bell,
  Box,
  CalendarDays,
  CalendarClock,
  Code2,
  Contact,
  CreditCard,
  FileBarChart,
  FolderOpen,
  FormInput,
  Kanban,
  KeyRound,
  LayoutDashboard,
  LayoutGrid,
  LayoutTemplate,
  ListChecks,
  MessageSquare,
  MousePointerClick,
  Newspaper,
  Package,
  PanelsTopLeft,
  Rocket,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  ToggleLeft,
  Users,
  UsersRound,
  Video,
  type LucideIcon,
} from "lucide-react";

/** One link inside a mega-menu category. */
export interface TopNavLink {
  id: string;
  href: string;
  labelKey: string;
  icon: LucideIcon;
  permissions?: string[];
}

/** Category column entry (inline-start / right in RTL). */
export interface TopNavCategory {
  id: string;
  labelKey: string;
  descriptionKey: string;
  icon: LucideIcon;
  items: TopNavLink[];
}

/** Top-level mega menu trigger in the header. */
export interface TopNavGroup {
  id: string;
  labelKey: string;
  icon: LucideIcon;
  categories: TopNavCategory[];
}

/**
 * Grouped mega-navigation for the `topbar` layout.
 * Sidebar continues to use the flat module registry.
 */
export const TOP_NAV_GROUPS: TopNavGroup[] = [
  {
    id: "overview",
    labelKey: "topNav.overview",
    icon: LayoutDashboard,
    categories: [
      {
        id: "home",
        labelKey: "topNav.catHome",
        descriptionKey: "topNav.catHomeDesc",
        icon: LayoutDashboard,
        items: [
          {
            id: "dashboard",
            href: "/dashboard",
            labelKey: "nav.dashboard",
            icon: LayoutDashboard,
            permissions: ["dashboard:view"],
          },
          {
            id: "analytics",
            href: "/analytics",
            labelKey: "nav.analytics",
            icon: BarChart3,
            permissions: ["analytics:view"],
          },
          {
            id: "activity",
            href: "/activity",
            labelKey: "nav.activity",
            icon: Activity,
            permissions: ["activity:view"],
          },
        ],
      },
      {
        id: "ops",
        labelKey: "topNav.catOps",
        descriptionKey: "topNav.catOpsDesc",
        icon: Package,
        items: [
          {
            id: "users",
            href: "/users",
            labelKey: "nav.users",
            icon: Users,
            permissions: ["users:view"],
          },
          {
            id: "products",
            href: "/products",
            labelKey: "nav.products",
            icon: Package,
            permissions: ["products:view"],
          },
          {
            id: "orders",
            href: "/orders",
            labelKey: "nav.orders",
            icon: ShoppingCart,
            permissions: ["orders:view"],
          },
        ],
      },
    ],
  },
  {
    id: "workspace",
    labelKey: "topNav.workspace",
    icon: Kanban,
    categories: [
      {
        id: "collaborate",
        labelKey: "topNav.catCollaborate",
        descriptionKey: "topNav.catCollaborateDesc",
        icon: UsersRound,
        items: [
          {
            id: "team",
            href: "/team",
            labelKey: "nav.team",
            icon: UsersRound,
            permissions: ["team:view"],
          },
          {
            id: "tasks",
            href: "/tasks",
            labelKey: "nav.tasks",
            icon: Kanban,
            permissions: ["tasks:view"],
          },
          {
            id: "scrum",
            href: "/scrum",
            labelKey: "nav.scrum",
            icon: Kanban,
            permissions: ["scrum:view"],
          },
          {
            id: "calendar",
            href: "/calendar",
            labelKey: "nav.calendar",
            icon: CalendarDays,
            permissions: ["calendar:view"],
          },
          {
            id: "messages",
            href: "/messages",
            labelKey: "nav.messages",
            icon: MessageSquare,
            permissions: ["messages:view"],
          },
          {
            id: "comments",
            href: "/comments",
            labelKey: "nav.comments",
            icon: MessageSquare,
            permissions: ["comments:view"],
          },
          {
            id: "meetings",
            href: "/meetings",
            labelKey: "nav.meetings",
            icon: Video,
            permissions: ["meetings:view"],
          },
          {
            id: "contacts",
            href: "/contacts",
            labelKey: "nav.contacts",
            icon: Contact,
            permissions: ["contacts:view"],
          },
        ],
      },
      {
        id: "growth",
        labelKey: "topNav.catGrowth",
        descriptionKey: "topNav.catGrowthDesc",
        icon: Contact,
        items: [
          {
            id: "crm",
            href: "/crm",
            labelKey: "nav.crm",
            icon: Contact,
            permissions: ["crm:view"],
          },
          {
            id: "reports",
            href: "/reports",
            labelKey: "nav.reports",
            icon: FileBarChart,
            permissions: ["reports:view"],
          },
          {
            id: "billing",
            href: "/billing",
            labelKey: "nav.billing",
            icon: CreditCard,
            permissions: ["billing:view"],
          },
          {
            id: "files",
            href: "/files",
            labelKey: "nav.files",
            icon: FolderOpen,
            permissions: ["files:view"],
          },
          {
            id: "influencers",
            href: "/influencers",
            labelKey: "nav.influencers",
            icon: Sparkles,
            permissions: ["influencers:view"],
          },
          {
            id: "appointments",
            href: "/appointments",
            labelKey: "nav.appointments",
            icon: CalendarClock,
            permissions: ["appointments:view"],
          },
        ],
      },
    ],
  },
  {
    id: "platform",
    labelKey: "topNav.platform",
    icon: Code2,
    categories: [
      {
        id: "build",
        labelKey: "topNav.catBuild",
        descriptionKey: "topNav.catBuildDesc",
        icon: Code2,
        items: [
          {
            id: "developers",
            href: "/developers",
            labelKey: "nav.developers",
            icon: Code2,
            permissions: ["developers:view"],
          },
          {
            id: "cms",
            href: "/cms",
            labelKey: "nav.cms",
            icon: Newspaper,
            permissions: ["cms:view"],
          },
          {
            id: "blog",
            href: "/blog",
            labelKey: "nav.blog",
            icon: Newspaper,
            permissions: ["blog:view"],
          },
          {
            id: "blog-board",
            href: "/blog-board",
            labelKey: "nav.blogBoard",
            icon: LayoutGrid,
            permissions: ["blog-board:view"],
          },
          {
            id: "ai",
            href: "/ai",
            labelKey: "nav.ai",
            icon: Sparkles,
            permissions: ["ai:view"],
          },
        ],
      },
      {
        id: "system",
        labelKey: "topNav.catSystem",
        descriptionKey: "topNav.catSystemDesc",
        icon: Settings,
        items: [
          {
            id: "notifications",
            href: "/notifications",
            labelKey: "nav.notifications",
            icon: Bell,
            permissions: ["notifications:view"],
          },
          {
            id: "security",
            href: "/security",
            labelKey: "nav.security",
            icon: ShieldCheck,
            permissions: ["security:view"],
          },
          {
            id: "settings",
            href: "/settings",
            labelKey: "nav.settings",
            icon: Settings,
            permissions: ["settings:view"],
          },
          {
            id: "onboarding",
            href: "/onboarding",
            labelKey: "nav.onboarding",
            icon: Rocket,
            permissions: ["onboarding:view"],
          },
          {
            id: "monitoring",
            href: "/monitoring",
            labelKey: "nav.monitoring",
            icon: Activity,
            permissions: ["monitoring:view"],
          },
        ],
      },
    ],
  },
  {
    id: "ui-kit",
    labelKey: "topNav.uiKit",
    icon: Box,
    categories: [
      {
        id: "common",
        labelKey: "topNav.catCommon",
        descriptionKey: "topNav.catCommonDesc",
        icon: Box,
        items: [
          {
            id: "comp-button",
            href: "/showcase/components/button",
            labelKey: "nav.compButton",
            icon: MousePointerClick,
            permissions: ["showcase:view"],
          },
          {
            id: "comp-badge",
            href: "/showcase/components/badge",
            labelKey: "nav.compBadge",
            icon: BadgeCheck,
            permissions: ["showcase:view"],
          },
          {
            id: "comp-alert",
            href: "/showcase/components/alert",
            labelKey: "nav.compAlert",
            icon: AlertCircle,
            permissions: ["showcase:view"],
          },
          {
            id: "comp-tabs",
            href: "/showcase/components/tabs",
            labelKey: "nav.compTabs",
            icon: PanelsTopLeft,
            permissions: ["showcase:view"],
          },
        ],
      },
      {
        id: "forms",
        labelKey: "topNav.catForms",
        descriptionKey: "topNav.catFormsDesc",
        icon: FormInput,
        items: [
          {
            id: "comp-input",
            href: "/showcase/components/input",
            labelKey: "nav.compInput",
            icon: FormInput,
            permissions: ["showcase:view"],
          },
          {
            id: "comp-switch",
            href: "/showcase/components/switch",
            labelKey: "nav.compSwitch",
            icon: ToggleLeft,
            permissions: ["showcase:view"],
          },
          {
            id: "comp-select",
            href: "/showcase/components/select",
            labelKey: "nav.compSelect",
            icon: LayoutTemplate,
            permissions: ["showcase:view"],
          },
          {
            id: "comp-checkbox",
            href: "/showcase/components/checkbox",
            labelKey: "nav.compCheckbox",
            icon: ListChecks,
            permissions: ["showcase:view"],
          },
          {
            id: "comp-radio",
            href: "/showcase/components/radio",
            labelKey: "nav.compRadio",
            icon: ListChecks,
            permissions: ["showcase:view"],
          },
          {
            id: "comp-textarea",
            href: "/showcase/components/textarea",
            labelKey: "nav.compTextarea",
            icon: FormInput,
            permissions: ["showcase:view"],
          },
          {
            id: "comp-map",
            href: "/showcase/components/map",
            labelKey: "nav.compMap",
            icon: LayoutTemplate,
            permissions: ["showcase:view"],
          },
          {
            id: "comp-charts",
            href: "/showcase/components/charts",
            labelKey: "nav.compCharts",
            icon: BarChart3,
            permissions: ["showcase:view"],
          },
          {
            id: "comp-forms",
            href: "/showcase/components/forms",
            labelKey: "nav.compForms",
            icon: FormInput,
            permissions: ["showcase:view"],
          },
          {
            id: "comp-slider",
            href: "/showcase/components/slider",
            labelKey: "nav.compSlider",
            icon: ToggleLeft,
            permissions: ["showcase:view"],
          },
          {
            id: "comp-table",
            href: "/showcase/components/table",
            labelKey: "nav.compTable",
            icon: ListChecks,
            permissions: ["showcase:view"],
          },
          {
            id: "comp-datetime",
            href: "/showcase/components/datetime",
            labelKey: "nav.compDatetime",
            icon: CalendarDays,
            permissions: ["showcase:view"],
          },
          {
            id: "comp-cards",
            href: "/showcase/components/cards",
            labelKey: "nav.compCards",
            icon: BadgeCheck,
            permissions: ["showcase:view"],
          },
          {
            id: "comp-modal",
            href: "/showcase/components/modal",
            labelKey: "nav.compModal",
            icon: AlertCircle,
            permissions: ["showcase:view"],
          },
          {
            id: "comp-dropdown",
            href: "/showcase/components/dropdown",
            labelKey: "nav.compDropdown",
            icon: MousePointerClick,
            permissions: ["showcase:view"],
          },
        ],
      },
      {
        id: "auth",
        labelKey: "topNav.catAuth",
        descriptionKey: "topNav.catAuthDesc",
        icon: KeyRound,
        items: [
          {
            id: "auth-simple",
            href: "/showcase/auth/login-simple",
            labelKey: "nav.authLoginSimple",
            icon: KeyRound,
            permissions: ["showcase:view"],
          },
          {
            id: "auth-side",
            href: "/showcase/auth/login-side",
            labelKey: "nav.authLoginSide",
            icon: KeyRound,
            permissions: ["showcase:view"],
          },
          {
            id: "auth-split",
            href: "/showcase/auth/login-split",
            labelKey: "nav.authLoginSplit",
            icon: KeyRound,
            permissions: ["showcase:view"],
          },
          {
            id: "auth-register",
            href: "/showcase/auth/register",
            labelKey: "nav.authRegister",
            icon: Users,
            permissions: ["showcase:view"],
          },
        ],
      },
    ],
  },
];
