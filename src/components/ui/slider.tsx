"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const sliderVariants = cva("relative flex w-full touch-none select-none items-center", {
  variants: {
    size: {
      sm: "h-4",
      default: "h-5",
      lg: "h-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const trackVariants = cva(
  "relative w-full grow overflow-hidden rounded-full bg-muted",
  {
    variants: {
      size: {
        sm: "h-1",
        default: "h-1.5",
        lg: "h-2",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const thumbVariants = cva(
  "block rounded-full border border-primary/30 bg-background shadow-float-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "size-3.5",
        default: "size-4",
        lg: "size-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface SliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderVariants> {
  tone?: "default" | "success" | "danger";
}

function Slider({
  className,
  size,
  tone = "default",
  dir,
  ...props
}: SliderProps) {
  const rangeTone =
    tone === "success"
      ? "bg-success"
      : tone === "danger"
        ? "bg-destructive"
        : "bg-primary";

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      dir={dir ?? "ltr"}
      className={cn(sliderVariants({ size }), className)}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(trackVariants({ size }))}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn("absolute h-full rounded-full", rangeTone)}
        />
      </SliderPrimitive.Track>
      {(props.value ?? props.defaultValue ?? [0]).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          data-slot="slider-thumb"
          className={cn(thumbVariants({ size }))}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
