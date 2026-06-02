import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Platform } from "react-native";
import {
  AppColors,
  AppShadow,
  darkColors,
  darkShadow,
  lightColors,
  lightShadow,
} from "../design/tokens";

interface ThemeContextValue {
  isDark: boolean;
  toggleTheme: () => void;
  colors: AppColors;
  shadow: AppShadow;
}

const THEME_KEY = "app_theme";

// Reuse the same platform-aware storage pattern as token.service
async function getItem(key: string): Promise<string | null> {
  if (Platform.OS === "web") return localStorage.getItem(key);
  const SecureStore = await import("expo-secure-store");
  return SecureStore.getItemAsync(key);
}
async function setItem(key: string, value: string): Promise<void> {
  if (Platform.OS === "web") { localStorage.setItem(key, value); return; }
  const SecureStore = await import("expo-secure-store");
  return SecureStore.setItemAsync(key, value);
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(false);

  // Restore persisted preference on mount
  useEffect(() => {
    getItem(THEME_KEY).then((val) => {
      if (val === "dark") setIsDark(true);
    });
  }, []);

  const toggleTheme = useCallback(async () => {
    const next = !isDark;
    setIsDark(next);
    await setItem(THEME_KEY, next ? "dark" : "light");
  }, [isDark]);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        colors: isDark ? darkColors : lightColors,
        shadow: isDark ? darkShadow : lightShadow,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
