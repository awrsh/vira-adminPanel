# نقشه Routeها و امکانات صفحات

سند مرجع مسیرهای App Router در **Persian SaaS Starter Kit Pro**.

همه مسیرها زیر prefix زبان هستند: `fa` (پیش‌فرض، RTL) یا `en` (LTR).

مثال: `/fa/dashboard` · `/en/login`

---

## قواعد کلی

| مورد | توضیح |
|------|--------|
| Locale | همیشه در URL: `/(fa\|en)/...` |
| پیش‌فرض | `fa` — middleware و `localePrefix: "always"` |
| تم | روشن / تاریک / سیستم (تقریباً همه سطوح UI) |
| Guard داشبورد | بدون لاگین → هدایت به `/login` |
| Demo login | `admin@atlas.dev` / `password` |

---

## جدول خلاصه

| Route | گروه | Guard | توضیح کوتاه |
|-------|------|-------|-------------|
| `/[locale]` | Marketing | عمومی | لندینگ تجاری |
| `/[locale]/design-system` | Public | عمومی | QA دیزاین سیستم |
| `/[locale]/login` | Auth | عمومی | ورود |
| `/[locale]/register` | Auth | عمومی | ثبت‌نام |
| `/[locale]/forgot-password` | Auth | عمومی | درخواست بازیابی |
| `/[locale]/otp` | Auth | عمومی | تأیید کد OTP |
| `/[locale]/reset-password` | Auth | عمومی | رمز جدید |
| `/[locale]/two-factor` | Auth | عمومی | احراز دومرحله‌ای |
| `/[locale]/dashboard` | Dashboard | احراز هویت | ویجت‌های خانه |
| `/[locale]/analytics` | Dashboard | احراز هویت + مجوز | تحلیل درآمد/کاربر/قیف |
| `/[locale]/users` | Dashboard | احراز هویت + مجوز | CRUD کاربران |
| `/[locale]/products` | Dashboard | احراز هویت + مجوز | CRUD محصولات |
| `/[locale]/orders` | Dashboard | احراز هویت + مجوز | CRUD سفارش‌ها |
| `/[locale]/reports` | Dashboard | احراز هویت + مجوز | گزارش‌ها و خروجی |
| `/[locale]/team` | Dashboard | احراز هویت + مجوز | اعضای تیم و دعوت |
| `/[locale]/crm` | Dashboard | احراز هویت + مجوز | مشتریان و قیف سرنخ |
| `/[locale]/tasks` | Dashboard | احراز هویت + مجوز | کانبان وظایف |
| `/[locale]/calendar` | Dashboard | احراز هویت + مجوز | رویدادها (Jalali/Gregorian) |
| `/[locale]/messages` | Dashboard | احراز هویت + مجوز | اینباکس و گفتگو |
| `/[locale]/notifications` | Dashboard | احراز هویت + مجوز | مرکز اعلان |
| `/[locale]/activity` | Dashboard | احراز هویت + مجوز | خط زمانی فعالیت |
| `/[locale]/files` | Dashboard | احراز هویت + مجوز | مدیریت فایل |
| `/[locale]/ai` | Dashboard | احراز هویت + مجوز | چت AI و پرامپت |
| `/[locale]/cms` | Dashboard | احراز هویت + مجوز | صفحات و وبلاگ |
| `/[locale]/billing` | Dashboard | احراز هویت + مجوز | پلن و صورتحساب |
| `/[locale]/developers` | Dashboard | احراز هویت + مجوز | API Key و وب‌هوک |
| `/[locale]/security` | Dashboard | احراز هویت + مجوز | نشست و تاریخچه ورود |
| `/[locale]/onboarding` | Dashboard | احراز هویت + مجوز | جادوگر راه‌اندازی |
| `/[locale]/settings` | Dashboard | احراز هویت + مجوز | تنظیمات فضای کار |

---

## ۱. Marketing — عمومی

### `/[locale]` — Landing

**فایل:** `src/app/[locale]/(marketing)/page.tsx` → `LandingPage`

**امکانات / بخش‌ها:**

- Header چسبان: برند، ناوبری، سوییچ زبان، سوییچ تم، ورود
- Hero: برند، تیتر، CTA (ثبت‌نام / دمو زنده)، پیش‌نمای Product Chrome
- Features: لیست شش‌گانه (دیزاین، RTL، Mock API، ماژول، CmdK، Auth)
- Benefits: سه نتیجه تجاری (Ship / RTL / Scale)
- UI Showcase: پیش‌نمای رابط + نکات کیفیت UI
- RTL Showcase: مقایسه سمت‌به‌سمت FA RTL و EN LTR
- Dark Mode Showcase: مقایسه Light و Dark
- Pricing: پلن‌های Starter / Pro / Agency + لیست امکانات
- FAQ: آکاردئون ۶ سوال
- Testimonials: نقل‌قول‌های تحریریه‌ای
- Documentation CTA → `/design-system`
- Contact CTA (mailto)
- Footer با لینک‌های سریع

**Query / Action:** ندارد

---

### `/[locale]/design-system` — Design System QA

**فایل:** `src/app/[locale]/design-system/page.tsx`

**امکانات:**

- بازرسی توکن‌ها و کامپوننت‌های پایه Atlas Editorial
- تست همزمان Light/Dark و fa/en
- خارج از شِل داشبورد (صفحه عمومی)

---

## ۲. Auth — عمومی (بدون AppShell)

کروم مشترک: `AuthShell` (پنل برند + فرم، سوییچ زبان/تم)

### `/[locale]/login`

**امکانات:**

- فرم ایمیل + رمز (Zod + RHF)
- نمایش/مخفی کردن رمز (`PasswordField`)
- Remember me
- لینک فراموشی رمز و ثبت‌نام
- ورود Mock با نقش و permissions

### `/[locale]/register`

**امکانات:**

- نام، ایمیل، رمز، تأیید رمز
- اعتبارسنجی و خطای ایمیل تکراری (CONFLICT)
- پس از موفقیت → ورود به داشبورد / فلوی احراز هویت

### `/[locale]/forgot-password`

**امکانات:**

- ورود ایمیل بازیابی
- هدایت به `/otp` پس از ارسال Mock

### `/[locale]/otp`

**امکانات:**

- وارد کردن کد OTP (InputOTP)
- ارسال مجدد کد
- پس از تأیید → `/reset-password`
- نیازمند ایمیل بازیابی در جریان قبلی

### `/[locale]/reset-password`

**امکانات:**

- رمز جدید + تأیید
- به‌روزرسانی رمز Mock
- بازگشت به login پس از موفقیت

### `/[locale]/two-factor`

**امکانات:**

- همان `OtpForm` با `mode="twoFactor"`
- UI احراز دومرحله‌ای (جدا از فلوی بازیابی رمز)

---

## ۳. Dashboard — نیازمند لاگین (+ مجوزها)

کروم: `AuthGuard` + `AppShell` (سایدبار شناور، هدر، اعلان، CmdK، breadcrumb، سوییچ زبان/تم، منوی کاربر)

### `/[locale]/dashboard`

**مجوز:** `dashboard:view` (ویجت سفارش‌ها: `orders:view`)

**امکانات / ویجت‌ها:**

| ویجت | امکانات |
|------|---------|
| Revenue | نمودار درآمد |
| Sales | فروش |
| Visitors | بازدید |
| Orders | لیست/نمای سفارش‌های اخیر |
| Activity | تایم‌لاین فعالیت |
| Calendar | رویدادهای تقویم |
| Tasks | وظایف |
| Quick Actions | اکشن‌های سریع (مثلاً ایجاد) |
| Notifications | اعلان‌ها |
| Storage | مصرف فضای ذخیره‌سازی |
| Traffic | ترافیک |
| Payments | پرداخت‌ها |

- گرید نامتقارن از ماژول رجیستری
- حالت Loading / Empty / Error

**Command palette:** رفتن به داشبورد

---

### `/[locale]/users`

**مجوزها:** `users:view` · `create` · `edit` · `delete`

**امکانات:**

- DataTable: جستجو، فیلتر نقش/وضعیت، مرتب‌سازی، صفحه‌بندی
- انتخاب ردیف + حذف گروهی
- تغییر نقش گروهی (bulk role)
- خروجی export
- Drawer ایجاد / ویرایش کاربر (CRUD)
- Drawer جزئیات کاربر
- باز کردن فرم ایجاد با `?action=create`
- نمودار/آمار خلاصه در بالای صفحه (در صورت وجود در UI)
- Badge نقش و وضعیت
- i18n دو‌زبانه نام‌ها

**Commands:** رفتن به کاربران · ایجاد کاربر

---

### `/[locale]/products`

**مجوزها:** `products:view` · `create` · `edit` · `delete`

**امکانات:**

- DataTable: جستجو، فیلتر دسته و وضعیت، sort، pagination
- نمودار موجودی (inventory chart)
- آمار: تعداد محصول، موجودی کل، low-stock
- Badge کمبود موجودی
- آپلود/پیش‌نمای تصویر (`FileUpload` / `ImagePreview`)
- Drawer ایجاد / ویرایش محصول
- Drawer جزئیات
- حذف تکی و گروهی
- `?action=create`
- Export

**Commands:** رفتن به محصولات · ایجاد محصول

---

### `/[locale]/orders`

**مجوزها:** `orders:view` · `create` · `edit` · `delete`

**امکانات:**

- DataTable: جستجو (شماره، مشتری، ایمیل)، فیلتر وضعیت ارسال و پرداخت
- Sort و pagination سمت سرور Mock
- نمودار روند درآمد
- آمار: کل سفارش‌ها، درآمد صفحه، unpaid در صفحه
- Drawer ایجاد / ویرایش سفارش (وضعیت ارسال + پرداخت)
- Drawer جزئیات:
  - اطلاعات مشتری
  - اطلاعات پرداخت / مبلغ
  - مدیریت سریع status و paymentStatus
  - پیش‌نمایش فاکتور + چاپ
- حذف تکی و گروهی
- `?action=create`
- Export

**Commands:** رفتن به سفارش‌ها · ایجاد سفارش

---

### `/[locale]/settings`

**مجوزها:** `settings:view` · `settings:edit`

**امکانات (تب‌ها):**

| تب | محتوا |
|----|--------|
| General | تنظیمات عمومی فضای کار |
| Company | اطلاعات شرکت |
| Security | امنیت، اشاره به 2FA |
| Theme | Light / Dark / System |
| Language | سوییچ `fa` / `en` با تغییر `dir` |
| Notifications | ترجیحات اعلان |
| Profile | پروفایل کاربر لاگین‌شده |

**Commands:** رفتن به تنظیمات · تغییر تم

---

## ۴. Query params مشترک ماژول‌ها

| پارامتر | صفحات | اثر |
|---------|--------|-----|
| `?action=create` | `/users` · `/products` · `/orders` | باز کردن Drawer ایجاد (در صورت داشتن مجوز create) |

---

## ۵. مجوزها بر اساس نقش (خلاصه)

| نقش | دسترسی تقریبی |
|-----|----------------|
| `admin` | همه view/create/edit/delete + settings + billing/team |
| `manager` | تقریباً کامل بدون delete برخی منابع |
| `editor` | مشاهده کاربران/سفارش‌ها؛ ویرایش محصولات |
| `support` | مشاهده + ویرایش سفارش‌ها |
| `customer` | داشبورد، مشاهده سفارش/محصول، تنظیمات |

جزئیات کامل: `src/constants/index.ts` → `ROLE_PERMISSIONS`

---

## ۶. امکانات سراسری شِل داشبورد (همه صفحات Dashboard)

- Sidebar شناور با آیتم‌های ماژول رجیستری
- Header: جستجو، اعلان‌ها، تم، زبان، منوی کاربر
- Command Palette (`Ctrl+K` / Spotlight)
- Breadcrumb
- Skip link دسترس‌پذیری
- پشتیبانی کامل RTL/LTR و Dark/Light

---

## ۷. ساختار فایل Route ↔ Feature

```
src/app/[locale]/
  (marketing)/page.tsx          → features/marketing
  design-system/page.tsx        → design-system QA
  (auth)/login|register|…       → features/auth
  (dashboard)/
    dashboard/page.tsx          → features/dashboard
    analytics/page.tsx          → features/analytics
    users|products|orders/…     → features/{module}
    reports|team|crm|tasks/…
    calendar|messages|notifications|activity|files/…
    ai|cms|billing|developers|security|onboarding/…
    settings/page.tsx           → features/settings
```

رجیستری ماژول‌ها: `src/lib/modules/registry.ts`

---

## ۸. ماژول‌های تجاری جدید (جزئیات)

### `/[locale]/analytics`
کارت‌های KPI، نمودار درآمد/رشد، ترافیک، دستگاه، جغرافیا، قیف، جدول کوهورت، فیلتر بازه، خروجی.

### `/[locale]/reports`
لیست گزارش‌ها، نوع/وضعیت/زمان‌بندی/فرمت، ایجاد و خروجی CSV/PDF (mock toast).

### `/[locale]/team`
اعضای تیم، نقش‌ها، دعوت‌های در انتظار — مجوزهای `team:*`.

### `/[locale]/billing`
پلن فعلی، Starter/Pro/Agency/Enterprise، ارتقاء/لغو، روش پرداخت، فاکتورها (mock invoices).

### `/[locale]/notifications`
لیست اعلان‌ها (mock API)، خوانده/نخوانده، فیلتر نوع، ترجیحات.

### `/[locale]/activity`
خط زمانی فعالیت‌ها از mock activities API.

### `/[locale]/files`
پوشه/فایل، آپلود (FileUpload)، پیش‌نمایش تصویر، آمار فضای ذخیره‌سازی.

### `/[locale]/crm`
تب مشتریان + کانبان سرنخ‌ها (New → Contacted → Negotiation → Won).

### `/[locale]/calendar`
نمای ماه/هفته/روز، Jalali در fa، ایجاد/حذف رویداد و یادآور.

### `/[locale]/tasks`
کانبان Todo / Doing / Review / Done روی mock tasks API.

### `/[locale]/messages`
اینباکس دو ستونه + بدنه گفتگو و پیوست mock.

### `/[locale]/ai`
چت mock، کتابخانه پرامپت، آمار توکن، تاریخچه.

### `/[locale]/developers`
کلید API، وب‌هوک، لاگ، مستندات/SDK.

### `/[locale]/cms`
صفحات، پست‌ها، دسته‌ها، رسانه، SEO.

### `/[locale]/security`
2FA، نشست‌های فعال، تاریخچه ورود.

### `/[locale]/onboarding`
جادوگر ۵ مرحله‌ای: workspace → profile → invite → settings → done.

---

## ۹. نقش‌ها و مجوزها (خلاصه به‌روز)

جزئیات کامل: `src/constants/index.ts` و `Permission` در `src/types/index.ts`.

هر ماژول جدید مجوزهای `view` (+ در صورت نیاز `create`/`edit`/`delete`) دارد و از طریق رجیستری در سایدبار و Command Palette ظاهر می‌شود.

---

*آخرین به‌روزرسانی: شامل ۱۶ ماژول تجاری جدید + معماری رجیستری/مجوزها.*
