/** Iranian first names (Persian + Latin transliteration). */
export const FIRST_NAMES: ReadonlyArray<{ fa: string; en: string }> = [
  { fa: "آرش", en: "Arash" },
  { fa: "سارا", en: "Sara" },
  { fa: "محمد", en: "Mohammad" },
  { fa: "فاطمه", en: "Fatemeh" },
  { fa: "علی", en: "Ali" },
  { fa: "زهرا", en: "Zahra" },
  { fa: "حسین", en: "Hossein" },
  { fa: "مریم", en: "Maryam" },
  { fa: "رضا", en: "Reza" },
  { fa: "نرگس", en: "Narges" },
  { fa: "امیر", en: "Amir" },
  { fa: "الهام", en: "Elham" },
  { fa: "مهدی", en: "Mehdi" },
  { fa: "نازنین", en: "Nazanin" },
  { fa: "کامران", en: "Kamran" },
  { fa: "شیرین", en: "Shirin" },
  { fa: "بهنام", en: "Behnam" },
  { fa: "لیلا", en: "Leila" },
  { fa: "پوریا", en: "Pouria" },
  { fa: "ندا", en: "Neda" },
  { fa: "سینا", en: "Sina" },
  { fa: "مینا", en: "Mina" },
  { fa: "فرهاد", en: "Farhad" },
  { fa: "پریسا", en: "Parisa" },
  { fa: "کیان", en: "Kian" },
  { fa: "آیدا", en: "Aida" },
  { fa: "نیما", en: "Nima" },
  { fa: "هانیه", en: "Hanieh" },
  { fa: "بابک", en: "Babak" },
  { fa: "سپیده", en: "Sepideh" },
];

/** Iranian last names. */
export const LAST_NAMES: ReadonlyArray<{ fa: string; en: string }> = [
  { fa: "محمدی", en: "Mohammadi" },
  { fa: "احمدی", en: "Ahmadi" },
  { fa: "حسینی", en: "Hosseini" },
  { fa: "رضایی", en: "Rezaei" },
  { fa: "کریمی", en: "Karimi" },
  { fa: "موسوی", en: "Mousavi" },
  { fa: "جعفری", en: "Jafari" },
  { fa: "نوری", en: "Nouri" },
  { fa: "صادقی", en: "Sadeghi" },
  { fa: "اکبری", en: "Akbari" },
  { fa: "کاظمی", en: "Kazemi" },
  { fa: "میرزایی", en: "Mirzaei" },
  { fa: "غفاری", en: "Ghaffari" },
  { fa: "حیدری", en: "Heidari" },
  { fa: "باقری", en: "Bagheri" },
  { fa: "طاهری", en: "Taheri" },
  { fa: "شریفی", en: "Sharifi" },
  { fa: "یوسفی", en: "Yousefi" },
  { fa: "مرادی", en: "Moradi" },
  { fa: "قربانی", en: "Ghorbani" },
  { fa: "اسدی", en: "Asadi" },
  { fa: "نظری", en: "Nazari" },
  { fa: "رحیمی", en: "Rahimi" },
  { fa: "آقایی", en: "Aghaei" },
];

/** Major Iranian cities. */
export const CITIES: ReadonlyArray<{ fa: string; en: string }> = [
  { fa: "تهران", en: "Tehran" },
  { fa: "اصفهان", en: "Isfahan" },
  { fa: "شیراز", en: "Shiraz" },
  { fa: "مشهد", en: "Mashhad" },
  { fa: "تبریز", en: "Tabriz" },
  { fa: "کرج", en: "Karaj" },
  { fa: "اهواز", en: "Ahvaz" },
  { fa: "قم", en: "Qom" },
  { fa: "کرمانشاه", en: "Kermanshah" },
  { fa: "ارومیه", en: "Urmia" },
  { fa: "رشت", en: "Rasht" },
  { fa: "زاهدان", en: "Zahedan" },
  { fa: "همدان", en: "Hamedan" },
  { fa: "کرمان", en: "Kerman" },
  { fa: "یزد", en: "Yazd" },
  { fa: "اردبیل", en: "Ardabil" },
  { fa: "بندرعباس", en: "Bandar Abbas" },
  { fa: "زنجان", en: "Zanjan" },
  { fa: "ساری", en: "Sari" },
  { fa: "قزوین", en: "Qazvin" },
];

/** Persian company / brand names for SaaS context. */
export const COMPANY_NAMES: ReadonlyArray<{ fa: string; en: string }> = [
  { fa: "ابر نوآ", en: "Abr Nova" },
  { fa: "دیجیتال پارس", en: "Digital Pars" },
  { fa: "فناوران شرق", en: "Sharq Tech" },
  { fa: "پیک سلیمان", en: "Peyk Soleiman" },
  { fa: "نیک‌پرداز", en: "Nikpardaz" },
  { fa: "آینده‌سازان", en: "Ayandeh Sazan" },
  { fa: "رایان‌گستر", en: "Rayan Gostar" },
  { fa: "سپهر داده", en: "Sepehr Data" },
  { fa: "مهنتک", en: "MehnTech" },
  { fa: "هوشمندرایان", en: "Hooshmand Rayan" },
];

/** Product categories. */
export const PRODUCT_CATEGORIES: ReadonlyArray<{ fa: string; en: string }> = [
  { fa: "نرم‌افزار", en: "Software" },
  { fa: "سخت‌افزار", en: "Hardware" },
  { fa: "اشتراک ابری", en: "Cloud Subscription" },
  { fa: "پشتیبانی", en: "Support" },
  { fa: "آموزش", en: "Training" },
  { fa: "امنیت", en: "Security" },
  { fa: "تحلیل داده", en: "Analytics" },
  { fa: "بازاریابی", en: "Marketing" },
];

/** Product names. */
export const PRODUCT_NAMES: ReadonlyArray<{
  fa: string;
  en: string;
  description: string;
  descriptionEn: string;
}> = [
  {
    fa: "بسته پایه CRM",
    en: "CRM Starter Pack",
    description: "مدیریت مشتریان و پیگیری فروش برای تیم‌های کوچک",
    descriptionEn: "Customer management and sales tracking for small teams",
  },
  {
    fa: "پنل مدیریت پروژه",
    en: "Project Management Panel",
    description: "برنامه‌ریزی وظایف و همکاری تیمی در یک داشبورد",
    descriptionEn: "Task planning and team collaboration in one dashboard",
  },
  {
    fa: "اشتراک فضای ابری ۱۰۰ گیگ",
    en: "Cloud Storage 100GB",
    description: "ذخیره‌سازی امن فایل‌ها با همگام‌سازی چنددستگاهی",
    descriptionEn: "Secure file storage with multi-device sync",
  },
  {
    fa: "لایسنس آنتی‌ویروس سازمانی",
    en: "Enterprise Antivirus License",
    description: "حفاظت چندلایه برای ایستگاه‌های کاری سازمان",
    descriptionEn: "Multi-layer protection for enterprise workstations",
  },
  {
    fa: "دوره آموزش React پیشرفته",
    en: "Advanced React Course",
    description: "آموزش الگوهای مدرن و معماری فرانت‌اند",
    descriptionEn: "Modern patterns and frontend architecture training",
  },
  {
    fa: "پکیج پشتیبانی طلایی",
    en: "Gold Support Package",
    description: "پشتیبانی ۲۴ ساعته با پاسخ‌گویی اولویت‌دار",
    descriptionEn: "24/7 support with priority response",
  },
  {
    fa: "ماژول گزارش‌گیری مالی",
    en: "Finance Reporting Module",
    description: "گزارش‌های مالی و صورتحساب خودکار",
    descriptionEn: "Financial reports and automated invoicing",
  },
  {
    fa: "سامانه تیکتینگ",
    en: "Ticketing System",
    description: "مدیریت درخواست‌های پشتیبانی مشتریان",
    descriptionEn: "Customer support request management",
  },
  {
    fa: "API Gateway سازمانی",
    en: "Enterprise API Gateway",
    description: "مدیریت و امنیت نقاط انتهایی سرویس",
    descriptionEn: "Manage and secure service endpoints",
  },
  {
    fa: "افزونه پیامک انبوه",
    en: "Bulk SMS Add-on",
    description: "ارسال پیامک انبوه با قالب‌های فارسی",
    descriptionEn: "Bulk SMS with Persian templates",
  },
  {
    fa: "مانیتورینگ سرور",
    en: "Server Monitoring",
    description: "نظارت لحظه‌ای منابع و هشدار downtime",
    descriptionEn: "Real-time resource monitoring and downtime alerts",
  },
  {
    fa: "کیف پول دیجیتال سازمانی",
    en: "Enterprise Digital Wallet",
    description: "پرداخت داخلی و شارژ کیف‌پول کارکنان",
    descriptionEn: "Internal payments and employee wallet top-ups",
  },
  {
    fa: "پلتفرم وبینار",
    en: "Webinar Platform",
    description: "برگزاری وبینار با اتاق پرسش و پاسخ",
    descriptionEn: "Host webinars with Q&A rooms",
  },
  {
    fa: "اسکنر آسیب‌پذیری",
    en: "Vulnerability Scanner",
    description: "اسکن خودکار و گزارش امنیتی دوره‌ای",
    descriptionEn: "Automated scans and periodic security reports",
  },
  {
    fa: "ابزار تحلیل قیف فروش",
    en: "Sales Funnel Analyzer",
    description: "تحلیل مراحل قیف فروش و نرخ تبدیل",
    descriptionEn: "Analyze sales funnel stages and conversion rates",
  },
  {
    fa: "لیست ایمیل مارکتینگ",
    en: "Email Marketing Suite",
    description: "کمپین ایمیلی با پیگیری باز کردن و کلیک",
    descriptionEn: "Email campaigns with open and click tracking",
  },
  {
    fa: "چت‌بات هوشمند فارسی",
    en: "Persian Smart Chatbot",
    description: "پاسخ‌گویی خودکار به مشتریان به زبان فارسی",
    descriptionEn: "Automated customer replies in Persian",
  },
  {
    fa: "پکیج CDN ایران",
    en: "Iran CDN Package",
    description: "توزیع محتوا با نودهای داخلی و سرعت بالا",
    descriptionEn: "Content delivery with domestic nodes and high speed",
  },
  {
    fa: "سیستم حضور و غیاب",
    en: "Attendance System",
    description: "ثبت ورود و خروج و گزارش کارکرد ماهانه",
    descriptionEn: "Clock-in/out tracking and monthly work reports",
  },
  {
    fa: "موتور جستجوی داخلی",
    en: "Internal Search Engine",
    description: "جستجوی سریع در اسناد و دانش سازمانی",
    descriptionEn: "Fast search across docs and institutional knowledge",
  },
];

/** Iranian street names for addresses. */
export const STREET_NAMES: ReadonlyArray<{ fa: string; en: string }> = [
  { fa: "خیابان ولیعصر", en: "Valiasr Street" },
  { fa: "خیابان انقلاب", en: "Enghelab Street" },
  { fa: "خیابان آزادی", en: "Azadi Street" },
  { fa: "بلوار کشاورز", en: "Keshavarz Boulevard" },
  { fa: "خیابان شریعتی", en: "Shariati Street" },
  { fa: "خیابان مطهری", en: "Motahari Street" },
  { fa: "خیابان پاسداران", en: "Pasdaran Street" },
  { fa: "خیابان جردن", en: "Jordan Street" },
  { fa: "خیابان سعادت‌آباد", en: "Saadat Abad Street" },
  { fa: "خیابان کارگر شمالی", en: "Northern Kargar Street" },
  { fa: "خیابان امام خمینی", en: "Imam Khomeini Street" },
  { fa: "خیابان فردوسی", en: "Ferdowsi Street" },
  { fa: "خیابان طالقانی", en: "Taleqani Street" },
  { fa: "بلوار میرداماد", en: "Mirdamad Boulevard" },
  { fa: "خیابان بهشتی", en: "Beheshti Street" },
];

/** Domains used for generated emails. */
export const EMAIL_DOMAINS: readonly string[] = [
  "atlas.dev",
  "example.ir",
  "mail.ir",
  "pars.co",
  "nova.ir",
  "rayan.dev",
];
