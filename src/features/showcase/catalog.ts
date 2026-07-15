export const AUTH_DEMOS = [
  { slug: "login-simple", labelKey: "authLoginSimple" as const },
  { slug: "login-side", labelKey: "authLoginSide" as const },
  { slug: "login-split", labelKey: "authLoginSplit" as const },
  { slug: "register", labelKey: "authRegister" as const },
  { slug: "forgot-password", labelKey: "authForgot" as const },
  { slug: "reset-password", labelKey: "authReset" as const },
  { slug: "otp", labelKey: "authOtp" as const },
] as const;

export type AuthDemoSlug = (typeof AUTH_DEMOS)[number]["slug"];

export const COMPONENT_DEMOS = [
  { slug: "button", labelKey: "compButton" as const },
  { slug: "input", labelKey: "compInput" as const },
  { slug: "switch", labelKey: "compSwitch" as const },
  { slug: "checkbox", labelKey: "compCheckbox" as const },
  { slug: "radio", labelKey: "compRadio" as const },
  { slug: "select", labelKey: "compSelect" as const },
  { slug: "textarea", labelKey: "compTextarea" as const },
  { slug: "badge", labelKey: "compBadge" as const },
  { slug: "alert", labelKey: "compAlert" as const },
  { slug: "tabs", labelKey: "compTabs" as const },
  { slug: "map", labelKey: "compMap" as const },
  { slug: "charts", labelKey: "compCharts" as const },
  { slug: "forms", labelKey: "compForms" as const },
  { slug: "slider", labelKey: "compSlider" as const },
  { slug: "table", labelKey: "compTable" as const },
  { slug: "skeleton", labelKey: "compSkeleton" as const },
  { slug: "datetime", labelKey: "compDatetime" as const },
  { slug: "cards", labelKey: "compCards" as const },
  { slug: "modal", labelKey: "compModal" as const },
  { slug: "dropdown", labelKey: "compDropdown" as const },
  { slug: "file-upload", labelKey: "compFileUpload" as const },
  { slug: "validation", labelKey: "compValidation" as const },
  { slug: "rich-text", labelKey: "compRichText" as const },
  { slug: "tooltip", labelKey: "compTooltip" as const },
  { slug: "drawer", labelKey: "compDrawer" as const },
  { slug: "carousel", labelKey: "compCarousel" as const },
  { slug: "hooks", labelKey: "compHooks" as const },
] as const;

export type ComponentDemoSlug = (typeof COMPONENT_DEMOS)[number]["slug"];

export function isAuthDemoSlug(value: string): value is AuthDemoSlug {
  return AUTH_DEMOS.some((item) => item.slug === value);
}

export function isComponentDemoSlug(
  value: string,
): value is ComponentDemoSlug {
  return COMPONENT_DEMOS.some((item) => item.slug === value);
}
