/** Floating shell + content layout metrics. */
export const layoutTokens = {
  sidebarWidth: "var(--ds-layout-sidebar-width)",
  sidebarWidthCollapsed: "var(--ds-layout-sidebar-width-collapsed)",
  headerHeight: "var(--ds-layout-header-height)",
  shellGap: "var(--ds-layout-shell-gap)",
  shellInset: "var(--ds-layout-shell-inset)",
  contentMax: "var(--ds-layout-content-max)",
  readingMax: "var(--ds-layout-reading-max)",
  floatOffset: "var(--ds-layout-float-offset)",
  floatRadius: "var(--ds-layout-float-radius)",
  gridColumns: "var(--ds-layout-grid-columns)",
  gridGap: "var(--ds-layout-grid-gap)",
  z: {
    base: "var(--ds-z-base)",
    sticky: "var(--ds-z-sticky)",
    shell: "var(--ds-z-shell)",
    overlay: "var(--ds-z-overlay)",
    toast: "var(--ds-z-toast)",
    cmdk: "var(--ds-z-cmdk)",
  },
} as const;
