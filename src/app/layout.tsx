import type { ReactNode } from "react";

/** Root pass-through — `<html>` / `<body>` live in the locale layout. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
