import * as React from "react";
import { cn } from "@/utils";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  floatingLabel?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, floatingLabel, error, id, ...props }, ref) => {
    const areaId = id ?? floatingLabel?.replace(/\s+/g, "-").toLowerCase();

    if (floatingLabel) {
      return (
        <div className="relative w-full">
          <textarea
            id={areaId}
            ref={ref}
            placeholder=" "
            className={cn(
              "peer min-h-28 w-full rounded-md border border-input bg-card px-3.5 pb-3 pt-6 text-sm shadow-float-sm outline-none transition-colors placeholder:text-transparent focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive focus-visible:border-destructive",
              className,
            )}
            {...props}
          />
          <label
            htmlFor={areaId}
            className="pointer-events-none absolute start-3.5 top-4 z-10 origin-[0] text-sm text-muted-foreground transition-all peer-focus:top-2 peer-focus:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-75"
          >
            {floatingLabel}
          </label>
          {error ? <p className="mt-1.5 text-xs text-destructive">{error}</p> : null}
        </div>
      );
    }

    return (
      <div className="w-full">
        <textarea
          id={areaId}
          ref={ref}
          className={cn(
            "flex min-h-28 w-full rounded-md border border-input bg-card px-3.5 py-3 text-sm shadow-float-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus-visible:border-destructive",
            className,
          )}
          {...props}
        />
        {error ? <p className="mt-1.5 text-xs text-destructive">{error}</p> : null}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
