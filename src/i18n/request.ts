import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { DEFAULT_LOCALE, LOCALES } from "@/constants";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !LOCALES.includes(locale as (typeof LOCALES)[number])) {
    locale = DEFAULT_LOCALE;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

export async function getLocaleFromCookies() {
  const store = await cookies();
  return store.get("NEXT_LOCALE")?.value ?? DEFAULT_LOCALE;
}
