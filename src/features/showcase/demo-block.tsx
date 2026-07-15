"use client";

import * as React from "react";
import { Check, Code2, Copy, Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils";

export interface DemoBlockProps {
  title: string;
  description?: string;
  code: string;
  children: React.ReactNode;
  className?: string;
  previewClassName?: string;
}

/** Live preview + copyable source block for the UI kit showcase. */
export function DemoBlock({
  title,
  description,
  code,
  children,
  className,
  previewClassName,
}: DemoBlockProps) {
  const t = useTranslations("showcase");
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      toast.success(t("copied"));
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error(t("copyFailed"));
    }
  }

  return (
    <Surface elevated className={cn("overflow-hidden", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 px-4 py-3 sm:px-5">
        <div className="min-w-0 text-start">
          <h3 className="text-sm font-semibold">{title}</h3>
          {description ? (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <Button size="sm" variant="outline" onClick={() => void copy()}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? t("copied") : t("copy")}
        </Button>
      </div>

      <Tabs defaultValue="preview" className="gap-0">
        <div className="border-b border-border/70 px-4 sm:px-5">
          <TabsList className="h-10 bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="gap-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <Eye className="size-3.5" />
              {t("preview")}
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="gap-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <Code2 className="size-3.5" />
              {t("code")}
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="mt-0">
          <div
            className={cn(
              "flex min-h-28 flex-wrap items-center gap-3 bg-[radial-gradient(circle_at_1px_1px,color-mix(in_oklab,var(--border)_70%,transparent)_1px,transparent_0)] [background-size:12px_12px] p-5 sm:p-6",
              previewClassName,
            )}
          >
            {children}
          </div>
        </TabsContent>
        <TabsContent value="code" className="mt-0">
          <pre className="max-h-[28rem] overflow-auto bg-muted/40 p-4 text-start text-xs leading-relaxed sm:p-5">
            <code className="font-mono text-foreground/90">{code.trim()}</code>
          </pre>
        </TabsContent>
      </Tabs>
    </Surface>
  );
}
