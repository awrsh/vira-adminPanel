import { Loader2 } from "lucide-react";
import { cn } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  label?: string;
  className?: string;
  variant?: "spinner" | "skeleton";
  rows?: number;
}

function LoadingState({
  label,
  className,
  variant = "spinner",
  rows = 4,
}: LoadingStateProps) {
  if (variant === "skeleton") {
    return (
      <div className={cn("space-y-3 p-6", className)} aria-busy="true">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground",
        className,
      )}
      aria-busy="true"
      aria-live="polite"
    >
      <Loader2 className="size-6 animate-spin text-primary" />
      {label ? <p className="text-sm">{label}</p> : null}
    </div>
  );
}

export { LoadingState };
export type { LoadingStateProps };
