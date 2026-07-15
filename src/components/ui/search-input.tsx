"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/utils";
import { Input, type InputProps } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface SearchInputProps extends Omit<InputProps, "type"> {
  onClear?: () => void;
  clearable?: boolean;
}

/** Search field with leading icon and optional clear action. */
const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      clearable = true,
      onClear,
      value,
      onChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    const hasValue = String(value ?? "").length > 0;

    return (
      <div className="relative w-full">
        <Search
          className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          ref={ref}
          type="search"
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={cn("ps-10", clearable && hasValue && "pe-10", className)}
          {...props}
        />
        {clearable && hasValue ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute end-1.5 top-1/2 -translate-y-1/2"
            disabled={disabled}
            aria-label="Clear search"
            onClick={() => {
              onClear?.();
              onChange?.({
                target: { value: "" },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
          >
            <X className="size-4" />
          </Button>
        ) : null}
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
