/** Persian industries for company seeding. */
export const INDUSTRIES: ReadonlyArray<{ fa: string; en: string }> = [
  { fa: "فناوری اطلاعات", en: "Information Technology" },
  { fa: "نرم‌افزار سازمانی", en: "Enterprise Software" },
  { fa: "تجارت الکترونیک", en: "E-commerce" },
  { fa: "خدمات مالی", en: "Financial Services" },
  { fa: "مخابرات", en: "Telecommunications" },
  { fa: "حمل‌ونقل و لجستیک", en: "Logistics" },
  { fa: "تولید صنعتی", en: "Manufacturing" },
  { fa: "سلامت دیجیتال", en: "Digital Health" },
  { fa: "آموزش آنلاین", en: "Online Education" },
  { fa: "رسانه و تبلیغات", en: "Media & Advertising" },
];

/** Payment gateway labels. */
export const PAYMENT_GATEWAYS: ReadonlyArray<{ fa: string; en: string }> = [
  { fa: "زرین‌پال", en: "Zarinpal" },
  { fa: "آیدی‌پی", en: "IDPay" },
  { fa: "نکست‌پی", en: "NextPay" },
  { fa: "پی‌پینگ", en: "PayPing" },
  { fa: "انتقال بانکی", en: "Bank Transfer" },
];

/** Task titles (Persian + English). */
export const TASK_TEMPLATES: ReadonlyArray<{
  fa: string;
  en: string;
  description: string;
  descriptionEn: string;
}> = [
  {
    fa: "بررسی صورتحساب مشتریان",
    en: "Review customer invoices",
    description: "بررسی صورتحساب‌های معوق و ارسال یادآوری",
    descriptionEn: "Review overdue invoices and send reminders",
  },
  {
    fa: "آماده‌سازی گزارش ماهانه",
    en: "Prepare monthly report",
    description: "تهیه گزارش عملکرد فروش برای مدیریت",
    descriptionEn: "Prepare sales performance report for management",
  },
  {
    fa: "پاسخ به تیکت پشتیبانی",
    en: "Reply to support ticket",
    description: "پیگیری تیکت‌های باز با اولویت بالا",
    descriptionEn: "Follow up high-priority open tickets",
  },
  {
    fa: "به‌روزرسانی موجودی انبار",
    en: "Update inventory stock",
    description: "همگام‌سازی موجودی محصولات با سیستم انبار",
    descriptionEn: "Sync product stock with warehouse system",
  },
  {
    fa: "هماهنگی جلسه دمو",
    en: "Schedule product demo",
    description: "تنظیم جلسه دمو برای مشتری سازمانی",
    descriptionEn: "Schedule a demo meeting for enterprise customer",
  },
  {
    fa: "بازبینی دسترسی کاربران",
    en: "Audit user permissions",
    description: "بررسی نقش‌ها و دسترسی‌های تیم پشتیبانی",
    descriptionEn: "Review support team roles and permissions",
  },
  {
    fa: "ارسال فاکتور به شرکت",
    en: "Send invoice to company",
    description: "صدور و ارسال فاکتور فصلی برای مشتری حقوقی",
    descriptionEn: "Issue and send quarterly invoice to company client",
  },
  {
    fa: "رفع باگ گزارش‌گیری",
    en: "Fix reporting bug",
    description: "رفع خطای محاسبه مالیات در گزارش فروش",
    descriptionEn: "Fix tax calculation error in sales report",
  },
];

/** Message subjects and bodies. */
export const MESSAGE_TEMPLATES: ReadonlyArray<{
  subject: string;
  subjectEn: string;
  body: string;
  bodyEn: string;
}> = [
  {
    subject: "تأیید سفارش جدید",
    subjectEn: "New order confirmation",
    body: "سفارش شما با موفقیت ثبت شد و در صف پردازش قرار گرفت.",
    bodyEn: "Your order was registered successfully and is queued for processing.",
  },
  {
    subject: "یادآوری پرداخت فاکتور",
    subjectEn: "Invoice payment reminder",
    body: "لطفاً نسبت به پرداخت فاکتور معوق تا پایان هفته اقدام کنید.",
    bodyEn: "Please settle the overdue invoice by end of week.",
  },
  {
    subject: "دعوت به وبینار محصول",
    subjectEn: "Product webinar invitation",
    body: "وبینار معرفی نسخه جدید پنل، سه‌شنبه ساعت ۱۷ برگزار می‌شود.",
    bodyEn: "New panel webinar is scheduled for Tuesday at 5 PM.",
  },
  {
    subject: "گزارش وضعیت سرور",
    subjectEn: "Server status report",
    body: "همه سرویس‌ها در وضعیت عادی هستند. زمان پاسخ API زیر ۵۰ میلی‌ثانیه است.",
    bodyEn: "All services are healthy. API latency is under 50ms.",
  },
  {
    subject: "درخواست ارتقای پلن",
    subjectEn: "Plan upgrade request",
    body: "برای افزایش سهمیه فضای ابری، پلن حرفه‌ای را پیشنهاد می‌کنیم.",
    bodyEn: "We recommend the Pro plan to increase your cloud quota.",
  },
];

/** Notification copy templates. */
export const NOTIFICATION_TEMPLATES: ReadonlyArray<{
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
  type: "info" | "success" | "warning" | "error" | "system";
}> = [
  {
    title: "سفارش جدید ثبت شد",
    titleEn: "New order placed",
    body: "یک سفارش جدید در صف پردازش قرار گرفت.",
    bodyEn: "A new order entered the processing queue.",
    type: "info",
  },
  {
    title: "پرداخت موفق",
    titleEn: "Payment succeeded",
    body: "پرداخت مشتری از طریق درگاه با موفقیت انجام شد.",
    bodyEn: "Customer payment succeeded via gateway.",
    type: "success",
  },
  {
    title: "موجودی در حال اتمام",
    titleEn: "Low stock alert",
    body: "موجودی یکی از محصولات به زیر ۱۰ واحد رسیده است.",
    bodyEn: "One product stock fell below 10 units.",
    type: "warning",
  },
  {
    title: "خطای همگام‌سازی",
    titleEn: "Sync failure",
    body: "همگام‌سازی با سرویس انبار ناموفق بود. دوباره تلاش کنید.",
    bodyEn: "Warehouse sync failed. Please retry.",
    type: "error",
  },
  {
    title: "به‌روزرسانی سامانه",
    titleEn: "System update",
    body: "نسخه جدید پنل امشب ساعت ۲ بامداد نصب می‌شود.",
    bodyEn: "A new panel version installs tonight at 2 AM.",
    type: "system",
  },
];

/** Activity action verbs. */
export const ACTIVITY_ACTIONS: ReadonlyArray<{ fa: string; en: string }> = [
  { fa: "ایجاد کرد", en: "created" },
  { fa: "ویرایش کرد", en: "updated" },
  { fa: "حذف کرد", en: "deleted" },
  { fa: "تأیید کرد", en: "approved" },
  { fa: "ارسال کرد", en: "sent" },
  { fa: "پرداخت کرد", en: "paid" },
  { fa: "ارجاع داد", en: "assigned" },
  { fa: "بسته شد", en: "closed" },
];
