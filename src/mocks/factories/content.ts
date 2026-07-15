import type { BlogPost, CustomerComment, ScrumCard } from "@/types";
import { toIsoDate, createSeededRandom, pick } from "@/mocks/factories/shared";

const BLOG_TITLES = [
  {
    fa: "راه‌اندازی سریع پنل RTL",
    en: "Fast RTL panel setup",
    cat: { fa: "راهنما", en: "Guide" },
  },
  {
    fa: "دیزاین سیستم مینیمال برای SaaS",
    en: "Minimal design system for SaaS",
    cat: { fa: "طراحی", en: "Design" },
  },
  {
    fa: "مدیریت نقش‌ها و پرمیشن‌ها",
    en: "Roles and permissions in practice",
    cat: { fa: "امنیت", en: "Security" },
  },
  {
    fa: "بهینه‌سازی داشبورد برای تیم فارسی",
    en: "Dashboard tuning for Persian teams",
    cat: { fa: "محصول", en: "Product" },
  },
  {
    fa: "Mock API و توسعه بدون بک‌اند",
    en: "Mock API development without backend",
    cat: { fa: "توسعه", en: "Engineering" },
  },
];

export function buildBlogPosts(count = 12, seed = 901): BlogPost[] {
  const rng = createSeededRandom(seed);
  const statuses: BlogPost["status"][] = [
    "published",
    "published",
    "draft",
    "published",
    "archived",
  ];

  return Array.from({ length: count }, (_, i) => {
    const t = BLOG_TITLES[i % BLOG_TITLES.length];
    const status = pick(rng, statuses);
    const createdAt = toIsoDate(Math.floor(rng() * 120) + 1, rng);
    const slug = `post-${i + 1}-${t.en.toLowerCase().replace(/\s+/g, "-").slice(0, 24)}`;
    return {
      id: `bp-${String(i + 1).padStart(4, "0")}`,
      title: t.fa,
      titleEn: t.en,
      slug,
      excerpt: `خلاصه مقاله ${i + 1}: نکات عملی برای تیم‌های SaaS فارسی.`,
      excerptEn: `Post ${i + 1} excerpt — practical notes for Persian SaaS teams.`,
      content: `متن کامل مقاله ${i + 1}. این محتوا برای دمو Mock API ذخیره می‌شود.`,
      contentEn: `Full body for post ${i + 1}. Stored in the mock API for demo CRUD.`,
      category: t.cat.fa,
      categoryEn: t.cat.en,
      status,
      authorName: "تیم اطلس",
      authorNameEn: "Atlas Team",
      tags: ["saas", "rtl"],
      publishedAt: status === "published" ? createdAt : undefined,
      createdAt,
      updatedAt: createdAt,
    };
  });
}

export function buildComments(count = 8, seed = 902): CustomerComment[] {
  const rng = createSeededRandom(seed);
  const seeds: Omit<CustomerComment, "id" | "createdAt">[] = [
    {
      name: "نیلوفر احمدی",
      nameEn: "Niloufar Ahmadi",
      role: "مدیر محصول",
      roleEn: "Product Manager",
      body: "طراحی RTL واقعاً دقیق است.",
      bodyEn: "RTL polish is exceptional.",
      rating: 5,
      likes: 24,
      product: "پنل مدیریت",
      productEn: "Admin panel",
      status: "approved",
    },
    {
      name: "کاوه رضایی",
      nameEn: "Kaveh Rezaei",
      role: "فاندِر",
      roleEn: "Founder",
      body: "دارک مود و تم‌ها مینیمال و تجاری‌اند.",
      bodyEn: "Themes feel commercial, not template-like.",
      rating: 5,
      likes: 18,
      product: "استارتر کیت",
      productEn: "Starter kit",
      status: "approved",
    },
    {
      name: "سمیرا کریمی",
      nameEn: "Samira Karimi",
      role: "طراح UI",
      roleEn: "UI Designer",
      body: "کامپوننت‌ها یکدست‌اند و فاصله‌ها حساب‌شده.",
      bodyEn: "Components feel cohesive with intentional spacing.",
      rating: 4,
      likes: 12,
      product: "Design System",
      productEn: "Design System",
      status: "approved",
    },
    {
      name: "آرش مرادی",
      nameEn: "Arash Moradi",
      role: "توسعه‌دهنده",
      roleEn: "Engineer",
      body: "رجیستری ماژول کار را خیلی سریع می‌کند.",
      bodyEn: "Module registry made onboarding faster.",
      rating: 5,
      likes: 31,
      product: "Core",
      productEn: "Core",
      status: "approved",
    },
  ];

  return Array.from({ length: count }, (_, i) => {
    const base = seeds[i % seeds.length];
    return {
      ...base,
      id: `cm-${String(i + 1).padStart(4, "0")}`,
      createdAt: toIsoDate(Math.floor(rng() * 60) + 1, rng),
      status:
        i === count - 1
          ? "pending"
          : (base.status as CustomerComment["status"]),
    };
  });
}

export function buildScrumCards(seed = 903): ScrumCard[] {
  const now = new Date().toISOString();
  return [
    {
      id: "sc-0001",
      title: "طراحی صفحه قیمت‌گذاری",
      titleEn: "Design pricing page",
      assignee: "سارا",
      assigneeEn: "Sara",
      points: 5,
      priority: "high",
      status: "backlog",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "sc-0002",
      title: "هماهنگ‌سازی RTL جدول",
      titleEn: "Align DataTable RTL",
      assignee: "علی",
      assigneeEn: "Ali",
      points: 3,
      priority: "medium",
      status: "todo",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "sc-0003",
      title: "اتصال API فاکتور",
      titleEn: "Wire invoice API",
      assignee: "مریم",
      assigneeEn: "Maryam",
      points: 8,
      priority: "high",
      status: "in_progress",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "sc-0004",
      title: "بازبینی دسترسی نقش‌ها",
      titleEn: "Review role permissions",
      assignee: "رضا",
      assigneeEn: "Reza",
      points: 2,
      priority: "low",
      status: "review",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "sc-0005",
      title: "آپلود فایل چندبخشی",
      titleEn: "Multipart file upload",
      assignee: "نگار",
      assigneeEn: "Negar",
      points: 5,
      priority: "medium",
      status: "done",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "sc-0006",
      title: "ویجت درآمد مینیمال",
      titleEn: "Minimal revenue widget",
      assignee: "سارا",
      assigneeEn: "Sara",
      points: 3,
      priority: "medium",
      status: "todo",
      createdAt: now,
      updatedAt: now,
    },
  ];
}
