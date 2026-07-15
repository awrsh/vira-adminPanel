"use client";

import * as React from "react";
import { useDropzone, type Accept, type FileRejection } from "react-dropzone";
import { Loader2, Upload, X } from "lucide-react";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { ImagePreview } from "@/components/ui/image-preview";

export interface FileUploadProps {
  value?: File[];
  onChange?: (files: File[]) => void;
  accept?: Accept;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  label?: string;
  hint?: string;
  error?: string;
  showPreview?: boolean;
}

function FilePreviewRow({
  file,
  disabled,
  loading,
  showPreview,
  onRemove,
}: {
  file: File;
  disabled?: boolean;
  loading?: boolean;
  showPreview?: boolean;
  onRemove: () => void;
}) {
  const isImage = file.type.startsWith("image/");
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!isImage || !showPreview) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file, isImage, showPreview]);

  return (
    <li className="flex items-center gap-3 rounded-xl border border-border bg-card p-2 shadow-float-sm">
      {showPreview && previewUrl ? (
        <ImagePreview
          src={previewUrl}
          alt={file.name}
          className="size-12 shrink-0 rounded-lg object-cover"
        />
      ) : (
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground">
          FILE
        </div>
      )}
      <div className="min-w-0 flex-1 text-start">
        <p className="truncate text-sm font-medium">{file.name}</p>
        <p className="text-xs text-muted-foreground">
          {(file.size / 1024).toFixed(1)} KB
        </p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        disabled={disabled || loading}
        aria-label={`Remove ${file.name}`}
        onClick={onRemove}
      >
        <X className="size-4" />
      </Button>
    </li>
  );
}

/** Drag-and-drop file upload with preview and accessible keyboard support. */
function FileUpload({
  value = [],
  onChange,
  accept,
  multiple = true,
  maxFiles = 8,
  maxSize = 5 * 1024 * 1024,
  disabled = false,
  loading = false,
  className,
  label = "Drop files here, or click to browse",
  hint,
  error,
  showPreview = true,
}: FileUploadProps) {
  const onDrop = React.useCallback(
    (accepted: File[], _rejected: FileRejection[]) => {
      const next = multiple
        ? [...value, ...accepted].slice(0, maxFiles)
        : accepted.slice(0, 1);
      onChange?.(next);
    },
    [maxFiles, multiple, onChange, value],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept,
      multiple,
      maxFiles,
      maxSize,
      disabled: disabled || loading,
    });

  return (
    <div className={cn("w-full space-y-3", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-surface border border-dashed border-border bg-muted/30 px-6 py-10 text-center transition-colors",
          isDragActive && "border-primary bg-primary-soft/40",
          isDragReject && "border-destructive bg-destructive/5",
          (disabled || loading) && "cursor-not-allowed opacity-50",
        )}
      >
        <input {...getInputProps()} aria-label={label} />
        {loading ? (
          <Loader2 className="size-6 animate-spin text-primary" />
        ) : (
          <Upload className="size-6 text-muted-foreground" aria-hidden />
        )}
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>

      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      {value.length > 0 ? (
        <ul className="space-y-2">
          {value.map((file, index) => (
            <FilePreviewRow
              key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
              file={file}
              disabled={disabled}
              loading={loading}
              showPreview={showPreview}
              onRemove={() =>
                onChange?.(value.filter((_, i) => i !== index))
              }
            />
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export { FileUpload };
