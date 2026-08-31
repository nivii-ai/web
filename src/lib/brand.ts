/** Manual de marca 06/07. Fuente de verdad: `wald-face/src/shared/lib/brand.ts`. */
export const BRAND = {
  niviiGreen: "#00b26b",
  deepGreen: "#3c967b",
  deepGreenHover: "#317963",
  greenTint: "#e6f5ef",
  offWhite: "#f7f9f9",
  ink: "#1f2937",
  text: "#374151",
  muted: "#6b7280",
  divider: "#e5e7eb",
  warning: "#d97706",
  danger: "#dc2626",
  info: "#2563eb",
} as const;

export const PANEL = {
  surface: "#0b0f0e",
  ink: "#f4f6f5",
  hairline: "rgba(255, 255, 255, 0.12)",
} as const;

export const CHART_PALETTE = [
  BRAND.deepGreen,
  BRAND.info,
  BRAND.warning,
  BRAND.danger,
  BRAND.niviiGreen,
  BRAND.text,
  BRAND.muted,
  BRAND.deepGreenHover,
] as const;
