module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light values (default) ─────────────────────────────
        bg: {
          primary:   "#FFFFFF",
          secondary: "#F7F7F7",
          card:      "#FFFFFF",
          input:     "#F3F4F6",
        },
        accent: {
          DEFAULT: "#111111",
          dim:     "#11111110",
          glow:    "#11111118",
        },
        border: {
          DEFAULT: "#E5E7EB",
          accent:  "#D1D5DB",
        },
        text: {
          primary:   "#111111",
          secondary: "#6B7280",
          muted:     "#9CA3AF",
          inverse:   "#FFFFFF",
        },

        // Dark overrides — used via dark: prefix ─────────────
        dark: {
          bg: {
            primary:   "#0A0F1E",
            secondary: "#111827",
            card:      "#1C2333",
            input:     "#161D2F",
          },
          accent:  "#4F8EF7",
          border:  "#1F2937",
          text: {
            primary:   "#F9FAFB",
            secondary: "#9CA3AF",
            muted:     "#4B5563",
          },
        },
      },
      fontFamily: {
        heading:  ["Outfit_700Bold"],
        body:     ["Outfit_400Regular"],
        medium:   ["Outfit_500Medium"],
        semibold: ["Outfit_600SemiBold"],
      },
    },
  },
  plugins: [],
};
