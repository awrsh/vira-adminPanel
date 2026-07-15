"use client";

import * as React from "react";

export interface UseDisclosureOptions {
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

/** Open/close/toggle state for panels, drawers, collapsibles. */
export function useDisclosure(options: UseDisclosureOptions = {}) {
  const { defaultOpen = false, onOpen, onClose } = options;
  const [open, setOpen] = React.useState(defaultOpen);

  const openFn = React.useCallback(() => {
    setOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = React.useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = React.useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      if (next) onOpen?.();
      else onClose?.();
      return next;
    });
  }, [onClose, onOpen]);

  return { isOpen: open, setOpen, open: openFn, close, toggle };
}
