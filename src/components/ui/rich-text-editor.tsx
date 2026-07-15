"use client";

import * as React from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading2,
} from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";

const editorVariants = cva(
  "min-h-[8rem] w-full rounded-b-xl border border-border bg-background px-3 py-2.5 text-sm leading-relaxed outline-none focus-visible:border-ring",
  {
    variants: {
      tone: {
        default: "",
        soft: "bg-muted/30",
        minimal: "border-0 bg-transparent px-0",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

export interface RichTextEditorProps
  extends VariantProps<typeof editorVariants> {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
  /** minimal = no toolbar, soft = muted surface, default = full toolbar */
  variant?: "default" | "soft" | "minimal";
  disabled?: boolean;
  "aria-label"?: string;
}

function exec(command: string, value?: string) {
  document.execCommand(command, false, value);
}

function RichTextEditor({
  value = "",
  onChange,
  placeholder,
  className,
  tone,
  variant = "default",
  disabled,
  "aria-label": ariaLabel = "Rich text editor",
}: RichTextEditorProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const resolvedTone =
    variant === "minimal" ? "minimal" : variant === "soft" ? "soft" : tone;

  React.useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, [value]);

  function emit() {
    onChange?.(ref.current?.innerHTML ?? "");
  }

  const showToolbar = variant !== "minimal";

  return (
    <div
      data-slot="rich-text-editor"
      className={cn(
        "overflow-hidden rounded-xl border border-border",
        variant === "minimal" && "border-0",
        className,
      )}
    >
      {showToolbar ? (
        <div className="flex flex-wrap gap-0.5 border-b border-border/70 bg-muted/30 p-1.5">
          {[
            { icon: Bold, cmd: "bold", label: "Bold" },
            { icon: Italic, cmd: "italic", label: "Italic" },
            { icon: Heading2, cmd: "formatBlock", val: "h2", label: "Heading" },
            { icon: List, cmd: "insertUnorderedList", label: "Bullet list" },
            { icon: ListOrdered, cmd: "insertOrderedList", label: "Numbered list" },
            { icon: Quote, cmd: "formatBlock", val: "blockquote", label: "Quote" },
          ].map(({ icon: Icon, cmd, val, label }) => (
            <Button
              key={label}
              type="button"
              size="icon-sm"
              variant="ghost"
              disabled={disabled}
              aria-label={label}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                ref.current?.focus();
                exec(cmd, val);
                emit();
              }}
            >
              <Icon className="size-4" />
            </Button>
          ))}
        </div>
      ) : null}
      <div
        ref={ref}
        role="textbox"
        aria-label={ariaLabel}
        aria-multiline
        contentEditable={!disabled}
        suppressContentEditableWarning
        data-placeholder={placeholder}
        className={cn(
          editorVariants({ tone: resolvedTone }),
          "empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]",
          disabled && "cursor-not-allowed opacity-60",
        )}
        onInput={emit}
        onBlur={emit}
      />
    </div>
  );
}

export { RichTextEditor, editorVariants };
