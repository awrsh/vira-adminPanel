"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/locale-switcher";
import { ThemeSwitcher } from "@/components/layout/theme-toggle";
import { cn } from "@/utils";

interface AuthShellProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Premium asymmetric auth chrome — brand panel + form surface.
 * Supports RTL/LTR via logical CSS; theme + locale controls in the corner.
 */
export function AuthShell({
  children,
  title,
  subtitle,
  footer,
  className,
}: AuthShellProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === "fa";

  return (
    <div className="relative flex min-h-dvh w-full flex-col lg:flex-row">
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-background" />
        <div className="absolute -top-24 start-1/2 h-[28rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_70%)] blur-2xl lg:start-1/4 lg:translate-x-0" />
        <div className="absolute bottom-0 end-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_12%,transparent),transparent_70%)] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="absolute end-4 top-4 z-20 flex items-center gap-1.5 sm:end-6 sm:top-6">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>

      {/* Brand panel */}
      <aside className="relative z-10 flex flex-1 flex-col justify-between px-6 pb-6 pt-16 sm:px-10 lg:max-w-[46%] lg:px-14 lg:pb-12 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-5"
        >
          <Link
            href="/"
            className="inline-flex items-baseline gap-2 text-foreground transition-opacity hover:opacity-80"
          >
            <span className="font-persian text-4xl font-semibold tracking-tight sm:text-5xl">
              {t("shell.brand")}
            </span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("auth.brandTagline")}
          </p>
          <ul className="hidden space-y-2.5 pt-4 text-sm text-muted-foreground lg:block">
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              {t("auth.brandPoint1")}
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              {t("auth.brandPoint2")}
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              {t("auth.brandPoint3")}
            </li>
          </ul>
        </motion.div>

        <p className="mt-10 hidden text-xs text-muted-foreground lg:block">
          {t("common.appName")}
        </p>
      </aside>

      {/* Form panel */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 pb-12 pt-4 sm:px-8 lg:px-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: isRtl ? 10 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={cn("w-full max-w-[26rem]", className)}
        >
          <div className="rounded-surface border border-border/80 bg-card/90 p-6 shadow-float-lg backdrop-blur-sm sm:p-8">
            <header className="mb-6 space-y-2 text-start">
              <h1 className="font-persian text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
                {title}
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {subtitle}
              </p>
            </header>
            {children}
            {footer ? <div className="mt-6">{footer}</div> : null}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
