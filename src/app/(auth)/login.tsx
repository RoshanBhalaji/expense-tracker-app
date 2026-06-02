import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { typography } from "../../design/tokens";

export default function LoginScreen() {
  const { login } = useAuth();
  const { colors } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert("Error", "Fill in all fields");
    setLoading(true);
    try {
      await login({ email, password });
      router.replace("/(app)");
    } catch (err: any) {
      Alert.alert("Failed", err.response?.data?.detail ?? "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Brand */}
          <View style={styles.brandSection}>
            <View style={[styles.logoBox, { backgroundColor: colors.accentDim, borderColor: colors.accentGlow }]}>
              <Text style={[styles.logoText, { color: colors.accent }]}>A</Text>
            </View>
            <Text style={[styles.heading, { color: colors.textPrimary }]}>
              Welcome back
            </Text>
            <Text style={[styles.subheading, { color: colors.textSecondary }]}>
              Sign in to continue
            </Text>
          </View>

          <Input label="Email"    leftIcon={Mail} placeholder="you@example.com" value={email}    onChangeText={setEmail}    autoCapitalize="none" keyboardType="email-address" />
          <Input label="Password" leftIcon={Lock} placeholder="••••••••"        value={password} onChangeText={setPassword} secureToggle />

          <TouchableOpacity style={styles.forgotRow}>
            <Text style={[styles.forgotText, { color: colors.accent }]}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          <Button label="Sign In" onPress={handleLogin} loading={loading} />

          <TouchableOpacity
            style={styles.registerRow}
            onPress={() => router.push("/(auth)/register")}
          >
            <Text style={[styles.registerText, { color: colors.textSecondary }]}>
              No account?{" "}
              <Text style={[styles.registerLink, { color: colors.accent }]}>Create one</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:     { flex: 1 },
  flex:          { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 24 },
  brandSection:  { marginBottom: 40 },
  logoBox: {
    width: 48, height: 48, borderRadius: 12,
    borderWidth: 1,
    alignItems: "center", justifyContent: "center", marginBottom: 24,
  },
  logoText:    { fontFamily: typography.heading, fontSize: 20 },
  heading:     { fontFamily: typography.heading, fontSize: typography["4xl"], marginBottom: 8 },
  subheading:  { fontFamily: typography.body, fontSize: typography.base },
  forgotRow:   { alignItems: "flex-end", marginBottom: 24, marginTop: -8 },
  forgotText:  { fontSize: typography.sm, fontFamily: typography.body },
  registerRow: { marginTop: 24, alignItems: "center" },
  registerText:{ fontFamily: typography.body },
  registerLink:{ fontFamily: typography.medium },
});
