"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const animatedCardVariants = cva(
  "rounded-surface border border-border bg-card text-card-foreground shadow-float-sm",
  {
    variants: {
      tone: {
        default: "",
        soft: "bg-muted/40 shadow-none",
        glass:
          "border-border/60 bg-card/70 shadow-float-md backdrop-blur-md",
        outline: "shadow-none",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-5",
        lg: "p-6",
      },
    },
    defaultVariants: {
      tone: "default",
      padding: "default",
    },
  },
);

export interface AnimatedCardProps
  extends Omit<HTMLMotionProps<"div">, "children">,
    VariantProps<typeof animatedCardVariants> {
  children?: React.ReactNode;
  /** Hover lift + soft shadow */
  interactive?: boolean;
}

function AnimatedCard({
  className,
  tone,
  padding,
  interactive = true,
  children,
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      data-slot="animated-card"
      className={cn(animatedCardVariants({ tone, padding }), className)}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        interactive
          ? { y: -3, boxShadow: "var(--shadow-float-md)" }
          : undefined
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { AnimatedCard, animatedCardVariants };
