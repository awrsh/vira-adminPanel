import { cn } from "@/utils";

interface SurfaceProps extends React.ComponentProps<"div"> {
  elevated?: boolean;
  glass?: boolean;
  padding?: boolean;
}

/** Floating panel primitive — primary surface for widgets and chrome. */
function Surface({
  className,
  elevated = false,
  glass = false,
  padding = false,
  ...props
}: SurfaceProps) {
  return (
    <div
      data-slot="surface"
      className={cn(
        "rounded-surface border border-border bg-card text-card-foreground",
        elevated ? "shadow-float-md" : "shadow-float-sm",
        glass && "glass",
        padding && "p-6",
        className,
      )}
      {...props}
    />
  );
}

export { Surface };
export type { SurfaceProps };
