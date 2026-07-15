"use client";

import * as React from "react";
import { cn } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";

export interface ImagePreviewProps
  extends Omit<React.ComponentProps<"img">, "src"> {
  src?: string | null;
  /** Fallback when image fails or is missing */
  fallbackLabel?: string;
  /** Force skeleton state */
  isLoading?: boolean;
}

/** Accessible image preview with loading skeleton and error fallback. */
function ImagePreview({
  className,
  alt = "",
  fallbackLabel = "Image unavailable",
  isLoading = false,
  src,
  onLoad,
  onError,
  ...props
}: ImagePreviewProps) {
  const [failed, setFailed] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setFailed(false);
    setLoaded(false);
  }, [src]);

  if (isLoading || (!loaded && src && !failed)) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Skeleton className="absolute inset-0 size-full" aria-hidden />
        {src && !failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className={cn(
              "relative size-full object-cover transition-opacity",
              loaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={(event) => {
              setLoaded(true);
              onLoad?.(event);
            }}
            onError={(event) => {
              setFailed(true);
              onError?.(event);
            }}
            {...props}
          />
        ) : null}
      </div>
    );
  }

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={fallbackLabel}
        className={cn(
          "flex items-center justify-center bg-muted text-xs text-muted-foreground",
          className,
        )}
      >
        {fallbackLabel}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={cn("block max-w-full object-cover", className)}
      onLoad={onLoad}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
      {...props}
    />
  );
}

export { ImagePreview };
