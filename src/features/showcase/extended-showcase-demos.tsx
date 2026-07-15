"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Copy, Info, Settings2 } from "lucide-react";
import { toast } from "sonner";
import { DemoBlock } from "@/features/showcase/demo-block";
import { FileUpload } from "@/components/ui/file-upload";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Carousel, CarouselSlide } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Surface } from "@/components/ui/surface";
import { Badge } from "@/components/ui/badge";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useDisclosure } from "@/hooks/use-disclosure";
import { STOCK_IMAGES } from "@/lib/stock-images";
import { cn } from "@/utils";

export function FileUploadDemos() {
  const t = useTranslations("showcase");
  const [files, setFiles] = React.useState<File[]>([]);
  const [avatar, setAvatar] = React.useState<File[]>([]);

  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("uploadDefault")}
        description={t("uploadHint")}
        previewClassName="flex-col items-stretch w-full max-w-lg"
        code={`<FileUpload value={files} onChange={setFiles} multiple showPreview />`}
      >
        <FileUpload
          value={files}
          onChange={setFiles}
          multiple
          showPreview
          label={t("uploadLabel")}
          hint={t("uploadHintShort")}
          className="w-full"
        />
      </DemoBlock>
      <DemoBlock
        title={t("uploadAvatar")}
        previewClassName="flex-col items-stretch w-full max-w-xs"
        code={`<FileUpload accept={{ 'image/*': [] }} maxFiles={1} showPreview />`}
      >
        <FileUpload
          value={avatar}
          onChange={setAvatar}
          accept={{ "image/*": [] }}
          maxFiles={1}
          showPreview
          className="w-full"
        />
      </DemoBlock>
    </div>
  );
}

const validationSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
  age: z.number().min(18).max(99),
});

type ValidationValues = z.infer<typeof validationSchema>;

export function ValidationDemos() {
  const t = useTranslations("showcase");
  const form = useForm<ValidationValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: { email: "", phone: "", age: 18 },
  });

  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("validationInline")}
        description={t("validationHint")}
        previewClassName="flex-col items-stretch w-full max-w-md"
        code={`const schema = z.object({ email: z.string().email(), ... })
<form onSubmit={handleSubmit(onSubmit)}>...</form>`}
      >
        <form
          className="w-full space-y-3 text-start"
          onSubmit={form.handleSubmit(() => toast.success(t("validOk")))}
        >
          <div className="space-y-1.5">
            <Label>{t("email")}</Label>
            <Input {...form.register("email")} />
            {form.formState.errors.email ? (
              <p className="text-xs text-destructive">
                {form.formState.errors.email.message}
              </p>
            ) : null}
          </div>
          <div className="space-y-1.5">
            <Label>{t("phone")}</Label>
            <Input {...form.register("phone")} dir="ltr" />
            {form.formState.errors.phone ? (
              <p className="text-xs text-destructive">
                {form.formState.errors.phone.message}
              </p>
            ) : null}
          </div>
          <div className="space-y-1.5">
            <Label>{t("age")}</Label>
            <Input
              type="number"
              {...form.register("age", { valueAsNumber: true })}
            />
            {form.formState.errors.age ? (
              <p className="text-xs text-destructive">
                {form.formState.errors.age.message}
              </p>
            ) : null}
          </div>
          <Button type="submit" size="sm">
            {t("validateSubmit")}
          </Button>
        </form>
      </DemoBlock>
    </div>
  );
}

export function RichTextDemos() {
  const t = useTranslations("showcase");
  const [html, setHtml] = React.useState("<p><strong>Atlas</strong> editor</p>");

  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("editorDefault")}
        previewClassName="flex-col items-stretch w-full max-w-2xl"
        code={`<RichTextEditor value={html} onChange={setHtml} variant="default" />`}
      >
        <RichTextEditor
          value={html}
          onChange={setHtml}
          variant="default"
          placeholder={t("editorPlaceholder")}
        />
      </DemoBlock>
      <DemoBlock
        title={t("editorSoft")}
        previewClassName="flex-col items-stretch w-full max-w-2xl"
        code={`<RichTextEditor variant="soft" />`}
      >
        <RichTextEditor variant="soft" placeholder={t("editorPlaceholder")} />
      </DemoBlock>
      <DemoBlock
        title={t("editorMinimal")}
        previewClassName="flex-col items-stretch w-full max-w-2xl"
        code={`<RichTextEditor variant="minimal" />`}
      >
        <RichTextEditor variant="minimal" placeholder={t("editorPlaceholder")} />
      </DemoBlock>
    </div>
  );
}

export function TooltipDemos() {
  const t = useTranslations("showcase");
  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("tooltipDefault")}
        code={`<Tooltip><TooltipTrigger asChild><Button>Hover</Button></TooltipTrigger>
<TooltipContent>Hint</TooltipContent></Tooltip>`}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">{t("tooltipTrigger")}</Button>
          </TooltipTrigger>
          <TooltipContent>{t("tooltipBody")}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" aria-label="info">
              <Info className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">{t("tooltipBody")}</TooltipContent>
        </Tooltip>
      </DemoBlock>
    </div>
  );
}

export function DrawerDemos() {
  const t = useTranslations("showcase");
  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("drawerEnd")}
        code={`<Drawer><DrawerTrigger>Open</DrawerTrigger><DrawerContent>...</DrawerContent></Drawer>`}
      >
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">{t("openDrawer")}</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{t("drawerTitle")}</DrawerTitle>
            </DrawerHeader>
            <p className="px-4 pb-4 text-sm text-muted-foreground">
              {t("drawerBody")}
            </p>
            <DrawerFooter>
              <Button>{t("confirm")}</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </DemoBlock>
    </div>
  );
}

export function CarouselDemos() {
  const t = useTranslations("showcase");
  const slides = [
    { img: STOCK_IMAGES.workspace, title: t("carouselOne") },
    { img: STOCK_IMAGES.meeting, title: t("carouselTwo") },
    { img: STOCK_IMAGES.tech, title: t("carouselThree") },
  ];

  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("carouselDefault")}
        previewClassName="flex-col items-stretch w-full max-w-xl"
        code={`<Carousel><CarouselSlide>...</CarouselSlide></Carousel>`}
      >
        <Carousel className="w-full">
          {slides.map((slide) => (
            <CarouselSlide key={slide.title}>
              <Surface className="overflow-hidden p-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.img}
                  alt=""
                  className="h-48 w-full object-cover"
                />
                <p className="p-3 text-sm font-medium">{slide.title}</p>
              </Surface>
            </CarouselSlide>
          ))}
        </Carousel>
      </DemoBlock>
    </div>
  );
}

function CopyDemo() {
  const t = useTranslations("showcase");
  const { copy, copied } = useCopyToClipboard();
  return (
    <Button
      variant="outline"
      onClick={() => void copy("npm install @atlas/kit")}
    >
      <Copy className="size-4" />
      {copied ? t("copied") : t("copyHook")}
    </Button>
  );
}

function DisclosureDemo() {
  const t = useTranslations("showcase");
  const panel = useDisclosure();
  return (
    <div className="w-full max-w-sm space-y-2 text-start">
      <Button size="sm" variant="outline" onClick={panel.toggle}>
        {panel.isOpen ? t("disclosureClose") : t("disclosureOpen")}
      </Button>
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-border transition-all duration-300",
          panel.isOpen ? "max-h-24 opacity-100 p-3" : "max-h-0 opacity-0 p-0",
        )}
      >
        <p className="text-sm text-muted-foreground">{t("disclosureBody")}</p>
      </div>
    </div>
  );
}

export function HooksDemos() {
  const t = useTranslations("showcase");
  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("hookCopy")}
        code={`const { copy, copied } = useCopyToClipboard()
await copy(text)`}
      >
        <CopyDemo />
      </DemoBlock>
      <DemoBlock
        title={t("hookDisclosure")}
        previewClassName="flex-col items-stretch"
        code={`const { isOpen, open, close, toggle } = useDisclosure()`}
      >
        <DisclosureDemo />
      </DemoBlock>
    </div>
  );
}
