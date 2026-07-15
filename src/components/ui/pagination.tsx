"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
  /** Accessible label for the nav landmark */
  label?: string;
  previousLabel?: string;
  nextLabel?: string;
  disabled?: boolean;
}

function getPageItems(page: number, pageCount: number): Array<number | "ellipsis"> {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  if (page <= 3) return [1, 2, 3, 4, "ellipsis", pageCount];
  if (page >= pageCount - 2) {
    return [1, "ellipsis", pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
  }
  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", pageCount];
}

/** Accessible RTL/LTR pagination control. */
function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
  label = "Pagination",
  previousLabel = "Previous",
  nextLabel = "Next",
  disabled = false,
}: PaginationProps) {
  const items = getPageItems(page, Math.max(pageCount, 1));
  const canPrev = page > 1 && !disabled;
  const canNext = page < pageCount && !disabled;

  return (
    <nav
      aria-label={label}
      className={cn("flex items-center justify-center gap-1", className)}
    >
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        disabled={!canPrev}
        aria-label={previousLabel}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="size-4 rtl:rotate-180" />
      </Button>

      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`e-${index}`}
            className="flex size-8 items-center justify-center text-muted-foreground"
            aria-hidden
          >
            <MoreHorizontal className="size-4" />
          </span>
        ) : (
          <Button
            key={item}
            type="button"
            variant={item === page ? "default" : "ghost"}
            size="icon-sm"
            disabled={disabled}
            aria-label={`Page ${item}`}
            aria-current={item === page ? "page" : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </Button>
        ),
      )}

      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        disabled={!canNext}
        aria-label={nextLabel}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight className="size-4 rtl:rotate-180" />
      </Button>
    </nav>
  );
}

export { Pagination };
