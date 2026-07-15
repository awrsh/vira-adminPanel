import * as React from "react";
import { cn } from "@/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  floatingLabel?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, floatingLabel, error, id, placeholder, ...props }, ref) => {
    const inputId = id ?? floatingLabel?.replace(/\s+/g, "-").toLowerCase();

    if (floatingLabel) {
      return (
        <div className="relative w-full">
          <input
            type={type}
            id={inputId}
            ref={ref}
            placeholder=" "
            className={cn(
              "peer h-12 w-full rounded-md border border-input bg-card px-3.5 pt-4 text-sm shadow-float-sm outline-none transition-colors placeholder:text-transparent focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive focus-visible:border-destructive",
              className,
            )}
            {...props}
          />
          <label
            htmlFor={inputId}
            className="pointer-events-none absolute start-3.5 top-1/2 z-10 origin-[0] -translate-y-1/2 text-sm text-muted-foreground transition-all peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:scale-75"
          >
            {floatingLabel}
          </label>
          {error ? (
            <p className="mt-1.5 text-xs text-destructive">{error}</p>
          ) : null}
        </div>
      );
    }

    return (
      <div className="w-full">
        <input
          type={type}
          id={inputId}
          ref={ref}
          placeholder={placeholder}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-card px-3.5 py-2 text-sm shadow-float-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus-visible:border-destructive",
            className,
          )}
          {...props}
        />
        {error ? (
          <p className="mt-1.5 text-xs text-destructive">{error}</p>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
