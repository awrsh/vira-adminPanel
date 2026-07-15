"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Surface } from "@/components/ui/surface";
import type { AiConversation, AiPrompt } from "@/types";
import { cn, formatNumber } from "@/utils";

const promptsSeed: AiPrompt[] = [
  {
    id: "p1",
    title: "خلاصه سفارش",
    titleEn: "Summarize order",
    prompt: "این سفارش را خلاصه کن و ریسک را مشخص کن.",
    promptEn: "Summarize this order and highlight risk.",
    category: "عملیات",
    categoryEn: "Ops",
    usageCount: 42,
  },
  {
    id: "p2",
    title: "ایمیل پیگیری",
    titleEn: "Follow-up email",
    prompt: "یک ایمیل حرفه‌ای برای پیگیری لید بنویس.",
    promptEn: "Write a professional follow-up email for this lead.",
    category: "CRM",
    categoryEn: "CRM",
    usageCount: 28,
  },
];

const historySeed: AiConversation[] = [
  {
    id: "c1",
    title: "تحلیل قیف فروش",
    titleEn: "Sales funnel analysis",
    model: "atlas-mock-1",
    tokenUsage: 1840,
    messageCount: 6,
    createdAt: "2026-07-10",
    updatedAt: "2026-07-10",
  },
  {
    id: "c2",
    title: "بازنویسی لندینگ",
    titleEn: "Landing rewrite",
    model: "atlas-mock-1",
    tokenUsage: 3200,
    messageCount: 11,
    createdAt: "2026-07-12",
    updatedAt: "2026-07-13",
  },
];

type ChatMessage = { id: string; role: "user" | "assistant"; content: string };

export function AiPageView() {
  const t = useTranslations("ai");
  const locale = useLocale();
  const tag = locale === "fa" ? "fa-IR" : "en-US";
  const [input, setInput] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "m0",
      role: "assistant",
      content:
        locale === "fa"
          ? "سلام — من دستیار mock هستم. یک سوال بپرسید."
          : "Hi — I'm a mock assistant. Ask anything.",
    },
  ]);

  async function send(content: string) {
    const trimmed = content.trim();
    if (!trimmed || pending) return;
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: trimmed },
    ]);
    setPending(true);
    await new Promise((r) => setTimeout(r, 700));
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          locale === "fa"
            ? `پاسخ نمونه: «${trimmed}». این پاسخ mock است و هیچ مدل واقعی صدا زده نشده.`
            : `Sample answer for “${trimmed}”. This is mock output — no real model was called.`,
      },
    ]);
    setPending(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("subtitle")} />
      <div className="grid grid-cols-12 gap-3 lg:gap-4">
        <Surface elevated className="col-span-6 p-4 lg:col-span-3">
          <p className="text-xs text-muted-foreground">{t("tokens")}</p>
          <p className="mt-1 text-2xl font-semibold">
            {formatNumber(12480, tag)}
          </p>
        </Surface>
        <Surface elevated className="col-span-6 p-4 lg:col-span-3">
          <p className="text-xs text-muted-foreground">{t("chats")}</p>
          <p className="mt-1 text-2xl font-semibold">
            {formatNumber(historySeed.length, tag)}
          </p>
        </Surface>
        <Surface elevated className="col-span-12 p-4 lg:col-span-6">
          <p className="text-xs text-muted-foreground">{t("model")}</p>
          <p className="mt-1 text-lg font-semibold">atlas-mock-1</p>
        </Surface>

        <Surface
          elevated
          className="col-span-12 flex min-h-[28rem] flex-col p-4 lg:col-span-8"
        >
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <h3 className="text-sm font-medium">{t("chat")}</h3>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm",
                  msg.role === "user"
                    ? "ms-auto bg-primary text-primary-foreground"
                    : "bg-muted/50 text-foreground",
                )}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("placeholder")}
            />
            <Button type="submit" disabled={pending}>
              {t("send")}
            </Button>
          </form>
        </Surface>

        <div className="col-span-12 space-y-3 lg:col-span-4">
          <Surface elevated className="space-y-2 p-4">
            <h3 className="text-sm font-medium">{t("prompts")}</h3>
            {promptsSeed.map((prompt) => (
              <button
                key={prompt.id}
                type="button"
                className="w-full rounded-xl bg-muted/40 px-3 py-2.5 text-start transition-colors hover:bg-muted/70"
                onClick={() =>
                  void send(locale === "fa" ? prompt.prompt : prompt.promptEn)
                }
              >
                <p className="text-sm font-medium">
                  {locale === "fa" ? prompt.title : prompt.titleEn}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {locale === "fa" ? prompt.category : prompt.categoryEn}
                </p>
              </button>
            ))}
          </Surface>
          <Surface elevated className="space-y-2 p-4">
            <h3 className="text-sm font-medium">{t("history")}</h3>
            {historySeed.map((item) => (
              <div
                key={item.id}
                className="rounded-xl bg-muted/40 px-3 py-2.5 text-start"
              >
                <p className="text-sm font-medium">
                  {locale === "fa" ? item.title : item.titleEn}
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  <Badge variant="secondary">
                    {formatNumber(item.tokenUsage, tag)} tok
                  </Badge>
                  <Badge variant="outline">
                    {item.messageCount} {t("messages")}
                  </Badge>
                </div>
              </div>
            ))}
          </Surface>
        </div>
      </div>
    </div>
  );
}
