import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function RootIndex() {
  const { isAuthenticated, isLoading } = useAuth();
  const { colors } = useTheme();

  // Hold here while the token check runs — no redirect yet
  if (isLoading) {
    return (
      <View style={[styles.screen, { backgroundColor: colors.bgPrimary }]}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    );
  }

  // Token found and valid → go straight to app, skipping login entirely
  if (isAuthenticated) return <Redirect href="/(app)" />;

  // No token → show login
  return <Redirect href="/(auth)/login" />;
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center" },
});
