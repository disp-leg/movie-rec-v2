export const colors = {
  surface: "#1F2029",
  surfaceElevated: "#272833",
  textPrimary: "#F4F4F4",
  textSecondary: "#9CA3AF",
  accent: "#D4523E",
  accentHover: "#E05E49",
  separator: "#2E2F3A",
} as const;

export type ColorKey = keyof typeof colors;
