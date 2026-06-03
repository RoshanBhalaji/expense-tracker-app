import { createConfig } from "@gluestack-ui/themed";
import { config as defaultConfig } from "@gluestack-ui/config";

export const gluestackConfig = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      // Light palette
      primary0:   "#FFFFFF",
      primary50:  "#F3F4F6",
      primary100: "#E5E7EB",
      primary200: "#D1D5DB",
      primary300: "#9CA3AF",
      primary400: "#6B7280",
      primary500: "#111111",
      primary600: "#111111",
      primary700: "#0a0a0a",
      primary800: "#050505",
      primary900: "#000000",
      primary950: "#000000",
    },
    radii: {
      ...defaultConfig.tokens.radii,
      sm:   8,
      md:   12,
      lg:   16,
      xl:   20,
      "2xl": 24,
      full: 9999,
    },
  },
} as any);

export type AppConfig = typeof gluestackConfig;
