import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const checkboxVariants = cva(
  "peer shrink-0 border shadow-float-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
  {
    variants: {
      size: {
        sm: "size-3.5 rounded-[6px]",
        default: "size-4 rounded-md",
        lg: "size-5 rounded-lg",
      },
      appearance: {
        default: "border-input",
        soft: "border-transparent bg-muted data-[state=checked]:bg-primary",
        outline:
          "border-border bg-transparent data-[state=checked]:bg-transparent data-[state=checked]:text-primary",
      },
    },
    defaultVariants: {
      size: "default",
      appearance: "default",
    },
  },
);

export interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

function Checkbox({
  className,
  size,
  appearance,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ size, appearance }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <Check
          className={cn(
            size === "sm" ? "size-2.5" : size === "lg" ? "size-3.5" : "size-3",
          )}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox, checkboxVariants };
