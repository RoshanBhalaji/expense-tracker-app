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
import { ArrowLeft, Lock, Mail, User } from "lucide-react-native";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { typography } from "../../design/tokens";

const GENDERS = ["male", "female", "other"] as const;
type Gender = (typeof GENDERS)[number];

export default function RegisterScreen() {
  const { register } = useAuth();
  const { colors } = useTheme();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", gender: "" as Gender | "" });
  const [loading, setLoading] = useState(false);

  const set = (key: string) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleRegister = async () => {
    if (!form.email || !form.password)
      return Alert.alert("Error", "Email and password required");
    setLoading(true);
    try {
      await register({
        email:    form.email,
        password: form.password,
        name:     form.name || undefined,
        gender:   (form.gender as Gender) || undefined,
      });
      router.replace("/(app)");
    } catch (err: any) {
      Alert.alert("Failed", err.response?.data?.detail ?? "Registration failed");
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
          {/* Header */}
          <View style={styles.headerSection}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <ArrowLeft size={22} color={colors.textPrimary} strokeWidth={1.8} />
            </TouchableOpacity>
            <Text style={[styles.heading, { color: colors.textPrimary }]}>
              Create account
            </Text>
            <Text style={[styles.subheading, { color: colors.textSecondary }]}>
              Join in seconds
            </Text>
          </View>

          <Input label="Full Name"  leftIcon={User} placeholder="John Doe"         value={form.name}     onChangeText={set("name")} />
          <Input label="Email"      leftIcon={Mail} placeholder="you@example.com"  value={form.email}    onChangeText={set("email")}    autoCapitalize="none" keyboardType="email-address" />
          <Input label="Password"   leftIcon={Lock} placeholder="Min 8 characters" value={form.password} onChangeText={set("password")} secureToggle />

          {/* Gender */}
          <View style={styles.genderSection}>
            <Text style={[styles.genderLabel, { color: colors.textSecondary }]}>
              Gender
            </Text>
            <View style={styles.genderRow}>
              {GENDERS.map((g) => (
                <TouchableOpacity
                  key={g}
                  onPress={() => setForm((p) => ({ ...p, gender: g }))}
                  style={[
                    styles.genderBtn,
                    {
                      borderColor:     form.gender === g ? colors.accent : colors.border,
                      backgroundColor: form.gender === g ? colors.accentDim : colors.bgInput,
                    },
                  ]}
                >
                  <Text style={[
                    styles.genderBtnText,
                    { color: form.gender === g ? colors.accent : colors.textSecondary },
                  ]}>
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Button label="Create Account" onPress={handleRegister} loading={loading} />

          <TouchableOpacity style={styles.signInRow} onPress={() => router.back()}>
            <Text style={[styles.signInText, { color: colors.textSecondary }]}>
              Already have an account?{" "}
              <Text style={[styles.signInLink, { color: colors.accent }]}>Sign in</Text>
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
  scrollContent: { flexGrow: 1, paddingHorizontal: 24 },
  headerSection: { paddingTop: 56, paddingBottom: 32 },
  backBtn:       { marginBottom: 24, width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  heading:       { fontFamily: typography.heading, fontSize: typography["4xl"], marginBottom: 8 },
  subheading:    { fontFamily: typography.body },
  genderSection: { marginBottom: 24 },
  genderLabel:   { fontSize: typography.sm, fontFamily: typography.medium, marginBottom: 8 },
  genderRow:     { flexDirection: "row", gap: 12 },
  genderBtn: {
    flex: 1, paddingVertical: 12, borderRadius: 12,
    alignItems: "center", borderWidth: 1.5,
  },
  genderBtnText: { fontSize: typography.sm, fontFamily: typography.medium, textTransform: "capitalize" },
  signInRow:     { marginTop: 16, marginBottom: 40, alignItems: "center" },
  signInText:    { fontFamily: typography.body },
  signInLink:    { fontFamily: typography.medium },
});
