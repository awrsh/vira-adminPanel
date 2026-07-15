"use client";

import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";

export interface GlobalSearchProps {
  className?: string;
}

/** Header global search trigger — opens the command palette. */
export function GlobalSearch({ className }: GlobalSearchProps) {
  const t = useTranslations("common");

  function openCommandPalette() {
    window.dispatchEvent(new CustomEvent("atlas:open-command"));
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={openCommandPalette}
      aria-label={t("searchHint")}
      className={cn(
        "h-9 flex-1 justify-start gap-2 rounded-xl border-border/70 bg-background/50 px-3 text-muted-foreground shadow-none transition-colors hover:bg-background/80 sm:max-w-sm",
        className,
      )}
    >
      <Search className="size-4 shrink-0" aria-hidden />
      <span className="truncate text-sm">{t("search")}</span>
      <kbd className="ms-auto hidden rounded-md border border-border bg-muted/80 px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-block">
        {t("shortcutSearch")}
      </kbd>
    </Button>
  );
}
