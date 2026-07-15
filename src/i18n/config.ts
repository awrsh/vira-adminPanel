import { DEFAULT_LOCALE, LOCALES } from "@/constants";
import type { Locale } from "@/types";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getDirection(locale: string): "rtl" | "ltr" {
  return locale === "fa" ? "rtl" : "ltr";
}

export function resolveLocale(locale?: string): Locale {
  if (locale && isLocale(locale)) return locale;
  return DEFAULT_LOCALE;
}
