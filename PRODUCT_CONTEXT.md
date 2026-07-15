# Persian SaaS Starter Kit Pro

## Product Vision

Persian SaaS Starter Kit Pro is a premium commercial SaaS foundation designed for developers, startups, agencies, and companies.

The goal is to provide a production-ready foundation for building SaaS applications without rebuilding common infrastructure repeatedly.

This product should save development time while maintaining premium design quality, clean architecture, scalability, and excellent developer experience.

---

# Target Users

- Frontend developers
- Full-stack developers
- Software agencies
- Startups
- SaaS founders
- Freelancers
- Enterprise teams

---

# Product Goals

The product must provide:

- Premium SaaS UI
- Scalable architecture
- Modern React ecosystem
- Full RTL/LTR support
- Persian-first experience
- English localization
- Dark and Light themes
- Reusable component system
- Mock backend
- Production-ready patterns

---

# Design Philosophy

The product must NOT look like a generic AI-generated dashboard.

Avoid:

- Default shadcn dashboard style
- AdminLTE style
- Old enterprise dashboards
- Copy-paste templates

The design should feel:

- Premium
- Modern
- Minimal
- Elegant
- Professional
- Unique

Design inspiration:

- Linear
- Arc Browser
- Raycast
- Notion
- Stripe

Do not copy them.

---

# Core Principles

## Quality over speed

Every feature must be production quality.

## Reusability

No duplicated UI or business logic.

## Scalability

Future modules must be added without architectural changes.

## Consistency

Every screen must follow the design system.

---

# Technology Stack

## Framework

- Next.js 16 App Router
- React 19
- TypeScript Strict Mode

## Styling

- Tailwind CSS v4
- shadcn/ui customized
- Framer Motion

## State

- Zustand
- TanStack Query

## Forms

- React Hook Form
- Zod

## Data

- TanStack Table
- ECharts

## Localization

- next-intl

---

# Architecture Rules

Use feature-based architecture.

Recommended structure:

src/

app/

components/

features/

hooks/

services/

stores/

providers/

types/

utils/

lib/

constants/

mocks/

styles/


Rules:

- Components must be reusable.
- Business logic must stay inside features.
- UI components must not contain API logic.
- API communication must use services.
- Types must be shared.
- Avoid any type.
- Use strict TypeScript.

---

# Coding Standards

Always:

- Use TypeScript.
- Use meaningful names.
- Keep components small.
- Extract reusable logic.
- Add loading states.
- Add error states.
- Add empty states.

Never:

- Create duplicated components.
- Hardcode text.
- Use inline random styles.
- Ignore RTL.
- Ignore mobile layouts.

---

# Localization Rules

Supported languages:

- Persian
- English


Default:

Persian


Persian requirements:

- Full RTL
- Right aligned text
- Right sidebar
- RTL forms
- RTL tables
- RTL dialogs
- RTL dropdowns
- RTL notifications
- Persian calendar support


English requirements:

- Full LTR
- Mirrored layout

Never implement translation only.

The entire interface direction must change.

---

# Theme Rules

Supported:

- Light
- Dark
- System


Dark mode:

Never use pure black.

Use premium dark surfaces.

Light mode:

Avoid pure white everywhere.

Use soft backgrounds.

---

# Component Rules

All components must support:

- RTL
- LTR
- Dark mode
- Light mode
- Responsive behavior
- Accessibility


---

# Product Modules

Main modules:

- Dashboard
- Analytics
- Users
- Products
- Orders
- Reports
- Team
- CRM
- Tasks
- Calendar
- Messages
- Notifications
- Activity Logs
- File Manager
- AI Center
- CMS
- Billing
- Developer Center
- Security
- Onboarding
- Settings
- Authentication

Future modules must integrate via the module registry (nav, commands, permissions, routes) without architectural changes.

---

# Data Rules

No real backend.

Use:

- Mock database
- Mock API
- Service layer

Data must be realistic.

Never use:

Lorem Ipsum

Generate:

- Persian names
- Companies
- Products
- Orders
- Addresses
- Payments

---

# Commercial Requirements

The final product must include:

- Demo-ready UI
- Documentation
- Landing page
- Professional screenshots
- Easy installation
- Clean source code

The product should be suitable for selling in marketplaces.