import "../global.css";
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
} from "@expo-google-fonts/outfit";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

SplashScreen.preventAutoHideAsync();

// Hides the splash only after BOTH fonts AND the token check are done,
// preventing any flash of the login screen for returning users.
function AuthGate({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth();
  useEffect(() => {
    if (!isLoading) SplashScreen.hideAsync();
  }, [isLoading]);
  return <>{children}</>;
}

function RootLayoutNav() {
  const { isAuthenticated, isLoading } = useAuth();
  const { isDark } = useTheme();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    const inAuthGroup = segments[0] === "(auth)";
    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/(app)");
    }
  }, [isAuthenticated, isLoading, segments]);

  return (
    <View className={`flex-1 ${isDark ? "dark" : ""}`}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
  });

  // Fonts not ready yet — keep splash up, render nothing
  if (!fontsLoaded) return null;

  // Fonts ready — mount providers. AuthGate will hide the splash
  // once the token check also completes.
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthGate>
          <RootLayoutNav />
        </AuthGate>
      </AuthProvider>
    </ThemeProvider>
  );
}
