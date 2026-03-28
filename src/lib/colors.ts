export const colors = {
  surface: "#FFFFFF",
  surfaceSecondary: "#F5F5F7",
  surfaceElevated: "#FFFFFF",
  textPrimary: "#1D1D1F",
  textSecondary: "#6E6E73",
  accent: "#0496FF",
  accentHover: "#3DB1FF",
  separator: "#E5E5EA",
  overlay: "rgba(0, 0, 0, 0.55)",
} as const;

export type ColorKey = keyof typeof colors;
