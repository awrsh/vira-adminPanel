import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/utils";

const alertVariants = cva(
  "relative flex w-full gap-3 rounded-surface border px-4 py-3 text-sm shadow-float-sm",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-foreground",
        info: "border-primary/20 bg-primary-soft text-accent-foreground",
        success:
          "border-success/25 bg-success/10 text-success dark:text-success",
        warning:
          "border-warning/25 bg-warning/10 text-warning dark:text-warning",
        danger:
          "border-destructive/25 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const icons = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: AlertCircle,
} as const;

export interface AlertProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof alertVariants> {
  title?: string;
  /** Hide the leading icon */
  hideIcon?: boolean;
}

function Alert({
  className,
  variant = "default",
  title,
  hideIcon = false,
  children,
  role = "alert",
  ...props
}: AlertProps) {
  const Icon = icons[variant ?? "default"];

  return (
    <div
      data-slot="alert"
      role={role}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {!hideIcon ? (
        <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
      ) : null}
      <div className="min-w-0 flex-1 space-y-1 text-start">
        {title ? <p className="font-medium leading-none">{title}</p> : null}
        {children ? (
          <div className="text-sm text-current/80 [&_p]:leading-relaxed">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { Alert, alertVariants };
