"use client";

import { DirectionProvider } from "@radix-ui/react-direction";
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { AuthHydration } from "@/providers/auth-hydration";
import { getDirection } from "@/i18n/config";

import "@/mocks/api/register";

interface AppProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

/** Composes app-wide client providers for theme, data, i18n, and auth. */
export function AppProviders({ children, locale, messages }: AppProvidersProps) {
  const dir = getDirection(locale);

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Asia/Tehran"
    >
      <DirectionProvider dir={dir}>
        <ThemeProvider>
          <QueryProvider>
            <TooltipProvider>
              <AuthHydration>{children}</AuthHydration>
              <Toaster />
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </DirectionProvider>
    </NextIntlClientProvider>
  );
}
