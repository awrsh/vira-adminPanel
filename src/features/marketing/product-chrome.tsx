"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/utils";

/** Mini product chrome used in hero and showcase sections. */
export function ProductChrome({
  className,
  title,
  dir,
  tone = "light",
}: {
  className?: string;
  title?: string;
  dir?: "rtl" | "ltr";
  tone?: "light" | "dark";
}) {
  const t = useTranslations("landing");
  const isDark = tone === "dark";

  return (
    <div
      dir={dir}
      className={cn(
        "overflow-hidden rounded-surface border shadow-float-lg",
        isDark
          ? "border-white/10 bg-[#121417] text-[#F9FAFB]"
          : "border-border bg-card text-foreground",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-10 items-center gap-2 border-b px-4",
          isDark ? "border-white/10 bg-[#1A1E24]" : "border-border bg-elevated/80",
        )}
      >
        <span className="size-2.5 rounded-full bg-[#E35D5B]/80" />
        <span className="size-2.5 rounded-full bg-[#E0A84C]/80" />
        <span className="size-2.5 rounded-full bg-[#5DAD6F]/80" />
        <span
          className={cn(
            "ms-3 text-xs",
            isDark ? "text-[#9CA3AF]" : "text-muted-foreground",
          )}
        >
          {title ?? t("showcasePanel")}
        </span>
      </div>

      <div
        className={cn(
          "grid min-h-[220px] gap-3 p-4 sm:min-h-[260px] sm:p-5 md:grid-cols-[11rem_1fr]",
          isDark
            ? "bg-[linear-gradient(145deg,#1A1E24_0%,#121417_55%,#1e2230_100%)]"
            : "bg-[linear-gradient(145deg,color-mix(in_oklab,var(--primary)_10%,var(--card)),var(--card)_50%,color-mix(in_oklab,var(--chart-2)_8%,var(--card)))]",
        )}
      >
        <aside
          className={cn(
            "hidden space-y-2 rounded-[18px] border p-3 md:block",
            isDark
              ? "border-white/10 bg-[#1A1E24]/90"
              : "border-border/70 bg-card/75",
          )}
        >
          {[0.92, 0.78, 0.64, 0.7, 0.55].map((width, i) => (
            <div
              key={i}
              className={cn(
                "h-7 rounded-xl",
                i === 0
                  ? isDark
                    ? "bg-[color-mix(in_oklab,#5b55e0_45%,#1A1E24)]"
                    : "bg-primary-soft"
                  : isDark
                    ? "bg-white/8"
                    : "bg-muted/80",
              )}
              style={{ width: `${width * 100}%` }}
            />
          ))}
        </aside>

        <div className="grid gap-3 sm:grid-cols-5">
          <div
            className={cn(
              "rounded-[18px] border p-3.5 sm:col-span-3",
              isDark
                ? "border-white/10 bg-[#1A1E24]/80"
                : "border-border/70 bg-card/85 shadow-float-sm",
            )}
          >
            <div
              className={cn(
                "mb-3 h-2.5 w-20 rounded",
                isDark ? "bg-white/15" : "bg-muted",
              )}
            />
            <div
              className={cn(
                "h-24 rounded-2xl sm:h-28",
                isDark
                  ? "bg-[linear-gradient(105deg,color-mix(in_oklab,#5b55e0_40%,transparent),transparent)]"
                  : "bg-[linear-gradient(105deg,color-mix(in_oklab,var(--primary)_32%,transparent),transparent)]",
              )}
            />
          </div>

          <div
            className={cn(
              "rounded-[18px] border p-3.5 sm:col-span-2",
              isDark
                ? "border-white/10 bg-[#1A1E24]/80"
                : "border-border/70 bg-card/85 shadow-float-sm",
            )}
          >
            <div
              className={cn(
                "mb-3 h-2.5 w-14 rounded",
                isDark ? "bg-white/15" : "bg-muted",
              )}
            />
            <div className="space-y-2">
              {[0.9, 0.72, 0.8].map((w, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-7 rounded-xl",
                    isDark ? "bg-white/8" : "bg-muted/75",
                  )}
                  style={{ width: `${w * 100}%` }}
                />
              ))}
            </div>
          </div>

          <div
            className={cn(
              "rounded-[18px] border p-3 sm:col-span-5",
              isDark
                ? "border-white/10 bg-[#1A1E24]/70"
                : "border-border/60 bg-card/70",
            )}
          >
            <div className="flex gap-2 overflow-hidden">
              {[40, 58, 34, 62, 48].map((h, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 rounded-lg",
                    isDark
                      ? "bg-[color-mix(in_oklab,#5b55e0_28%,#1A1E24)]"
                      : "bg-primary-soft",
                  )}
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
