"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/utils";
import { Surface } from "@/components/ui/surface";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { LoadingState } from "@/components/shared/loading-state";

const colSpanClass: Record<number, string> = {
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  9: "lg:col-span-9",
  12: "lg:col-span-12",
};

const rowSpanClass: Record<number, string> = {
  1: "",
  2: "lg:row-span-2 min-h-[18rem]",
  3: "lg:row-span-3 min-h-[26rem]",
};

export interface WidgetShellProps {
  title: string;
  description?: string;
  colSpan?: number;
  rowSpan?: number;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  headerAction?: React.ReactNode;
}

/** Premium floating widget frame with loading / empty / error states. */
export function WidgetShell({
  title,
  description,
  colSpan = 4,
  rowSpan = 1,
  children,
  className,
  bodyClassName,
  isLoading,
  isError,
  isEmpty,
  onRetry,
  emptyTitle,
  emptyDescription,
  headerAction,
}: WidgetShellProps) {
  const t = useTranslations("common");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "col-span-12",
        colSpanClass[colSpan] ?? "lg:col-span-4",
        rowSpanClass[rowSpan] ?? "",
        className,
      )}
    >
      <Surface
        elevated
        className="flex h-full flex-col overflow-hidden p-4 sm:p-5"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-0.5 text-start">
            <h3 className="text-sm font-medium text-muted-foreground">
              {title}
            </h3>
            {description ? (
              <p className="text-xs text-muted-foreground/80">{description}</p>
            ) : null}
          </div>
          {headerAction}
        </div>

        <div className={cn("flex min-h-0 flex-1 flex-col", bodyClassName)}>
          {isLoading ? (
            <LoadingState variant="skeleton" rows={4} className="p-0" />
          ) : isError ? (
            <ErrorState
              title={t("errorTitle")}
              description={t("errorDescription")}
              retryLabel={t("retry")}
              onRetry={onRetry}
              className="py-10"
            />
          ) : isEmpty ? (
            <EmptyState
              title={emptyTitle ?? t("emptyTitle")}
              description={emptyDescription ?? t("emptyDescription")}
              className="py-10"
            />
          ) : (
            children
          )}
        </div>
      </Surface>
    </motion.div>
  );
}
