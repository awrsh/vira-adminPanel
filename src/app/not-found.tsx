import { APP_NAME, DEFAULT_LOCALE } from "@/constants";
import { getDirection } from "@/i18n/config";

/** Root 404 — includes html/body so Next.js never renders an untagged root shell. */
export default function RootNotFound() {
  const dir = getDirection(DEFAULT_LOCALE);

  return (
    <html lang={DEFAULT_LOCALE} dir={dir}>
      <body className="min-h-dvh bg-background p-8 text-foreground antialiased">
        <main className="mx-auto max-w-lg space-y-3 text-start">
          <h1 className="text-2xl font-semibold">404</h1>
          <p className="text-sm text-muted-foreground">{APP_NAME}</p>
          <a href={`/${DEFAULT_LOCALE}/dashboard`} className="text-sm text-primary underline">
            Dashboard
          </a>
        </main>
      </body>
    </html>
  );
}
