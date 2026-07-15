"use client";

import * as React from "react";

export interface UseCopyToClipboardOptions {
  timeout?: number;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

/** Copy text to clipboard with copied state reset. */
export function useCopyToClipboard(options: UseCopyToClipboardOptions = {}) {
  const { timeout = 1600, onSuccess, onError } = options;
  const [copied, setCopied] = React.useState(false);

  const copy = React.useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        onSuccess?.();
        window.setTimeout(() => setCopied(false), timeout);
        return true;
      } catch (error) {
        onError?.(error);
        return false;
      }
    },
    [onError, onSuccess, timeout],
  );

  return { copy, copied };
}
