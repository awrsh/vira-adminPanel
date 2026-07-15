"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useLocale } from "next-intl";
import { getDirection } from "@/i18n/config";
import { cn } from "@/utils";

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        style={{ direction: dir }}
        className={cn(
          "z-[var(--z-overlay)] w-72 rounded-surface border border-border bg-popover p-4 text-popover-foreground shadow-float-md outline-none animate-in fade-in-0 zoom-in-95",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverTrigger, PopoverContent };
