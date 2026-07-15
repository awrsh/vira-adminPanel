const fs = require("fs");

function merge(loc) {
  const file = `messages/${loc}.json`;
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const fa = loc === "fa";

  const extra = {
    reports: {
      name: fa ? "نام" : "Name",
      type: fa ? "نوع" : "Type",
      status: fa ? "وضعیت" : "Status",
      schedule: fa ? "زمان‌بندی" : "Schedule",
      format: fa ? "فرمت" : "Format",
    },
    team: {
      member: fa ? "عضو" : "Member",
      email: fa ? "ایمیل" : "Email",
      role: fa ? "نقش" : "Role",
      status: fa ? "وضعیت" : "Status",
      invite: fa ? "دعوت" : "Invite",
      inviteSent: fa ? "دعوت ارسال شد" : "Invite sent",
      pendingInvites: fa ? "دعوت‌های در انتظار" : "Pending invitations",
      noInvites: fa ? "دعوت معلقی نیست" : "No pending invites",
    },
    billing: {
      currentPlan: fa ? "پلن فعلی" : "Current plan",
      planStarter: "Starter",
      planPro: "Pro",
      planAgency: "Agency",
      planEnterprise: "Enterprise",
      renewsOn: fa ? "تمدید" : "Renews on",
      upgrade: fa ? "ارتقاء" : "Upgrade",
      cancel: fa ? "لغو اشتراک" : "Cancel subscription",
      cancelled: fa ? "اشتراک لغو شد" : "Subscription cancelled",
      upgraded: fa ? "پلن به‌روز شد" : "Plan updated",
      popular: fa ? "محبوب" : "Popular",
      custom: fa ? "سفارشی" : "Custom",
      seatIncluded: fa ? "صندلی تیم" : "Team seats",
      supportIncluded: fa ? "پشتیبانی" : "Support",
      choosePlan: fa ? "انتخاب پلن" : "Choose plan",
      paymentMethods: fa ? "روش‌های پرداخت" : "Payment methods",
      default: fa ? "پیش‌فرض" : "Default",
      invoice: fa ? "فاکتور" : "Invoice",
      amount: fa ? "مبلغ" : "Amount",
      status: fa ? "وضعیت" : "Status",
      date: fa ? "تاریخ" : "Date",
    },
    notifications: {
      titleCol: fa ? "عنوان" : "Title",
      category: fa ? "دسته" : "Category",
      status: fa ? "وضعیت" : "Status",
      actions: fa ? "اقدامات" : "Actions",
      read: fa ? "خوانده‌شده" : "Read",
      unread: fa ? "خوانده‌نشده" : "Unread",
      markRead: fa ? "خوانده شد" : "Mark read",
      markUnread: fa ? "نخوانده" : "Mark unread",
      markAllRead: fa ? "همه خوانده شد" : "Mark all read",
      allRead: fa ? "همه اعلان‌ها خوانده شدند" : "All notifications marked read",
      allTypes: fa ? "همه انواع" : "All types",
      preferences: fa ? "ترجیحات" : "Preferences",
      email: fa ? "ایمیل" : "Email",
      push: fa ? "پوش" : "Push",
      sms: "SMS",
    },
    tasks: {
      todo: fa ? "انجام‌نشده" : "Todo",
      in_progress: fa ? "در حال انجام" : "Doing",
      review: fa ? "بازبینی" : "Review",
      done: fa ? "انجام‌شده" : "Done",
    },
    messages: {
      unread: fa ? "جدید" : "Unread",
      selectThread: fa ? "یک گفتگو انتخاب کنید" : "Select a conversation",
      attachments: fa ? "پیوست‌ها" : "Attachments",
    },
    files: {
      storage: fa ? "فضای ذخیره‌سازی" : "Storage",
      folder: fa ? "پوشه" : "Folder",
      upload: fa ? "آپلود" : "Upload",
      noUpload: fa ? "مجوز آپلود ندارید" : "No upload permission",
      preview: fa ? "پیش‌نمایش" : "Preview",
    },
    crm: {
      customer: fa ? "مشتری" : "Customer",
      email: fa ? "ایمیل" : "Email",
      status: fa ? "وضعیت" : "Status",
      ltv: "LTV",
      notes: fa ? "یادداشت" : "Notes",
      customers: fa ? "مشتریان" : "Customers",
      leads: fa ? "سرنخ‌ها" : "Leads",
      new: fa ? "جدید" : "New",
      contacted: fa ? "تماس گرفته" : "Contacted",
      negotiation: fa ? "مذاکره" : "Negotiation",
      won: fa ? "برنده" : "Won",
    },
    calendar: {
      month: fa ? "ماه" : "Month",
      week: fa ? "هفته" : "Week",
      day: fa ? "روز" : "Day",
      events: fa ? "رویدادها" : "Events",
      reminder: fa ? "یادآور {minutes} دقیقه" : "Reminder {minutes} min",
      noReminder: fa ? "بدون یادآور" : "No reminder",
      delete: fa ? "حذف" : "Delete",
      eventTitle: fa ? "عنوان رویداد" : "Event title",
      notes: fa ? "توضیحات" : "Notes",
      reminderLabel: fa ? "یادآور" : "Reminder",
      save: fa ? "ذخیره" : "Save",
    },
    ai: {
      tokens: fa ? "مصرف توکن" : "Token usage",
      chats: fa ? "گفتگوها" : "Chats",
      model: fa ? "مدل" : "Model",
      chat: fa ? "چت" : "Chat",
      placeholder: fa ? "پیام خود را بنویسید…" : "Write a message…",
      send: fa ? "ارسال" : "Send",
      prompts: fa ? "کتابخانه پرامپت" : "Prompt library",
      history: fa ? "تاریخچه" : "History",
      messages: fa ? "پیام" : "msgs",
    },
    developers: {
      name: fa ? "نام" : "Name",
      prefix: fa ? "پیشوند" : "Prefix",
      status: fa ? "وضعیت" : "Status",
      actions: fa ? "اقدامات" : "Actions",
      copied: fa ? "کپی شد" : "Copied",
      createKey: fa ? "کلید جدید" : "Create key",
      createWebhook: fa ? "وب‌هوک جدید" : "Create webhook",
      keys: fa ? "کلیدها" : "API Keys",
      webhooks: fa ? "وب‌هوک‌ها" : "Webhooks",
      logs: fa ? "لاگ API" : "API logs",
      docs: fa ? "مستندات" : "Docs",
      url: "URL",
      events: fa ? "رویدادها" : "Events",
      method: fa ? "متد" : "Method",
      path: fa ? "مسیر" : "Path",
      sdk: "SDK",
      sdkBody: fa
        ? "کلاینت رسمی TypeScript برای اتصال به Atlas API."
        : "Official TypeScript client for the Atlas API.",
      baseUrl: fa ? "آدرس پایه" : "Base URL",
    },
    cms: {
      page: fa ? "صفحه" : "Page",
      post: fa ? "پست" : "Post",
      slug: "Slug",
      status: fa ? "وضعیت" : "Status",
      category: fa ? "دسته" : "Category",
      pages: fa ? "صفحات" : "Pages",
      posts: fa ? "وبلاگ" : "Posts",
      categories: fa ? "دسته‌ها" : "Categories",
      media: fa ? "رسانه" : "Media",
      seo: "SEO",
      seoTitle: fa ? "عنوان SEO" : "SEO title",
      seoDescription: fa ? "توضیح SEO" : "SEO description",
      save: fa ? "ذخیره" : "Save",
    },
    security: {
      status: fa ? "وضعیت" : "Status",
      device: fa ? "دستگاه" : "Device",
      ip: "IP",
      location: fa ? "مکان" : "Location",
      time: fa ? "زمان" : "Time",
      success: fa ? "موفق" : "Success",
      failed: fa ? "ناموفق" : "Failed",
      blocked: fa ? "مسدود" : "Blocked",
      twoFactor: fa ? "احراز دو مرحله‌ای" : "Two-factor authentication",
      twoFactorHint: fa
        ? "امنیت ورود به حساب را افزایش دهید."
        : "Add an extra layer of sign-in security.",
      manage2fa: fa ? "مدیریت 2FA" : "Manage 2FA",
      sessions: fa ? "نشست‌های فعال" : "Active sessions",
      current: fa ? "فعلی" : "Current",
      revoke: fa ? "قطع نشست" : "Revoke",
      revoked: fa ? "نشست قطع شد" : "Session revoked",
      loginHistory: fa ? "تاریخچه ورود" : "Login history",
    },
    onboarding: {
      step_workspace: fa ? "فضای کار" : "Workspace",
      step_profile: fa ? "پروفایل" : "Profile",
      step_invite: fa ? "دعوت" : "Invite",
      step_settings: fa ? "تنظیمات" : "Settings",
      step_done: fa ? "پایان" : "Done",
      workspaceTitle: fa ? "ایجاد فضای کار" : "Create workspace",
      workspaceHint: fa
        ? "نام سازمان یا تیم خود را وارد کنید."
        : "Name your organization or team.",
      workspaceName: fa ? "نام فضای کار" : "Workspace name",
      profileTitle: fa ? "تنظیم پروفایل" : "Setup profile",
      displayName: fa ? "نام نمایشی" : "Display name",
      inviteTitle: fa ? "دعوت تیم" : "Invite team",
      inviteHint: fa
        ? "می‌توانید بعداً هم اعضا اضافه کنید."
        : "You can invite more people later.",
      inviteEmail: fa ? "ایمیل عضو" : "Member email",
      settingsTitle: fa ? "پیکربندی اولیه" : "Configure settings",
      settingsHint: fa
        ? "پیش‌فرض‌های پیشنهادی برای شروع."
        : "Recommended defaults to get started.",
      settingRtl: fa ? "زبان و جهت RTL" : "Locale and RTL direction",
      settingTheme: fa ? "تم روشن/تاریک" : "Light/dark theme",
      settingBilling: fa ? "پلن Starter" : "Starter plan",
      doneTitle: fa ? "آماده‌اید" : "You're ready",
      doneHint: fa
        ? "فضای کاری شما راه‌اندازی شد."
        : "Your workspace is set up.",
      goDashboard: fa ? "رفتن به داشبورد" : "Go to dashboard",
      back: fa ? "قبلی" : "Back",
      next: fa ? "بعدی" : "Next",
    },
  };

  for (const [ns, keys] of Object.entries(extra)) {
    data[ns] = { ...(data[ns] || {}), ...keys };
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
}

merge("fa");
merge("en");
console.log("extra i18n merged");
