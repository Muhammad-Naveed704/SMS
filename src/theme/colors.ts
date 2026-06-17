export type ThemeMode = "light" | "dark";

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface SemanticColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  danger: string;
  dangerForeground: string;
  border: string;
  input: string;
  inputBackground: string;
  ring: string;
}

export const palette = {
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
  } satisfies ColorScale,
  neutral: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  } satisfies ColorScale,
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16",
  } satisfies ColorScale,
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03",
  } satisfies ColorScale,
  danger: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
  } satisfies ColorScale,
} as const;

export const semanticColors: Record<ThemeMode, SemanticColors> = {
  light: {
    background: palette.neutral[50],
    foreground: palette.neutral[900],
    card: "#ffffff",
    cardForeground: palette.neutral[900],
    popover: "#ffffff",
    popoverForeground: palette.neutral[900],
    primary: palette.primary[600],
    primaryForeground: "#ffffff",
    secondary: palette.neutral[100],
    secondaryForeground: palette.neutral[900],
    muted: palette.neutral[100],
    mutedForeground: palette.neutral[500],
    accent: palette.neutral[200],
    accentForeground: palette.neutral[900],
    success: palette.success[600],
    successForeground: "#ffffff",
    warning: palette.warning[500],
    warningForeground: palette.neutral[900],
    danger: palette.danger[600],
    dangerForeground: "#ffffff",
    border: "rgba(15, 23, 42, 0.1)",
    input: "transparent",
    inputBackground: palette.neutral[100],
    ring: palette.primary[600],
  },
  dark: {
    background: palette.neutral[950],
    foreground: palette.neutral[50],
    card: palette.neutral[900],
    cardForeground: palette.neutral[50],
    popover: palette.neutral[900],
    popoverForeground: palette.neutral[50],
    primary: palette.primary[500],
    primaryForeground: "#ffffff",
    secondary: palette.neutral[800],
    secondaryForeground: palette.neutral[50],
    muted: palette.neutral[800],
    mutedForeground: palette.neutral[400],
    accent: palette.neutral[800],
    accentForeground: palette.neutral[50],
    success: palette.success[500],
    successForeground: palette.neutral[950],
    warning: palette.warning[400],
    warningForeground: palette.neutral[950],
    danger: palette.danger[500],
    dangerForeground: "#ffffff",
    border: "rgba(148, 163, 184, 0.15)",
    input: "transparent",
    inputBackground: palette.neutral[800],
    ring: palette.primary[500],
  },
};

const cssVarMap: Record<keyof SemanticColors, string> = {
  background: "--background",
  foreground: "--foreground",
  card: "--card",
  cardForeground: "--card-foreground",
  popover: "--popover",
  popoverForeground: "--popover-foreground",
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  secondary: "--secondary",
  secondaryForeground: "--secondary-foreground",
  muted: "--muted",
  mutedForeground: "--muted-foreground",
  accent: "--accent",
  accentForeground: "--accent-foreground",
  success: "--success",
  successForeground: "--success-foreground",
  warning: "--warning",
  warningForeground: "--warning-foreground",
  danger: "--danger",
  dangerForeground: "--danger-foreground",
  border: "--border",
  input: "--input",
  inputBackground: "--input-background",
  ring: "--ring",
};

export function getCssVariables(mode: ThemeMode): Record<string, string> {
  const colors = semanticColors[mode];
  return Object.entries(colors).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      const cssKey = cssVarMap[key as keyof SemanticColors];
      acc[cssKey] = value;
      return acc;
    },
    {}
  );
}
