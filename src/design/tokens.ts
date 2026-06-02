// ── Color palettes ──────────────────────────────────────────────────────────
export const lightColors = {
  bgPrimary:     "#FFFFFF",
  bgSecondary:   "#F7F7F7",
  bgCard:        "#FFFFFF",
  bgInput:       "#F3F4F6",

  accent:        "#111111",
  accentDim:     "#11111110",
  accentGlow:    "#11111118",

  textPrimary:   "#111111",
  textSecondary: "#6B7280",
  textMuted:     "#9CA3AF",
  textInverse:   "#FFFFFF",

  success:       "#10B981",
  error:         "#EF4444",
  warning:       "#F59E0B",

  border:        "#E5E7EB",
  borderAccent:  "#D1D5DB",
} as const;

export const darkColors = {
  bgPrimary:     "#0A0F1E",
  bgSecondary:   "#111827",
  bgCard:        "#1C2333",
  bgInput:       "#161D2F",

  accent:        "#FFFFFF",
  accentDim:     "#FFFFFF12",
  accentGlow:    "#FFFFFF20",

  textPrimary:   "#F9FAFB",
  textSecondary: "#9CA3AF",
  textMuted:     "#4B5563",
  textInverse:   "#111111",

  success:       "#10B981",
  error:         "#EF4444",
  warning:       "#F59E0B",

  border:        "#1F2937",
  borderAccent:  "#FFFFFF25",
} as const;

export type AppColors = typeof lightColors;

// ── Shadow sets ──────────────────────────────────────────────────────────────
export const lightShadow = {
  accent: {
    shadowColor: "#000000", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10, shadowRadius: 16, elevation: 6,
  },
  card: {
    shadowColor: "#000000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
} as const;

export const darkShadow = {
  accent: {
    shadowColor: "#000000", shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.50, shadowRadius: 16, elevation: 10,
  },
  card: {
    shadowColor: "#000000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.40, shadowRadius: 8, elevation: 4,
  },
} as const;

export type AppShadow = typeof lightShadow;

// ── Shared (non-color) tokens ─────────────────────────────────────────────────
export const typography = {
  heading:  "Outfit_700Bold",
  body:     "Outfit_400Regular",
  medium:   "Outfit_500Medium",
  semibold: "Outfit_600SemiBold",
  xs: 12, sm: 14, base: 16, lg: 18, xl: 20, "2xl": 24, "3xl": 30, "4xl": 36,
} as const;

export const spacing = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48 } as const;
export const radius  = { sm: 8, md: 12, lg: 16, xl: 20, full: 9999 } as const;

// ── Legacy default export (light, for non-context callers) ───────────────────
export const tokens = {
  colors:     lightColors,
  typography,
  spacing,
  radius,
  shadow:     lightShadow,
} as const;
