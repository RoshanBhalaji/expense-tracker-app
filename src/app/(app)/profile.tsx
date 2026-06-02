import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Calendar, Mail, Moon, Phone, Sun, Users } from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Avatar } from "../../components/ui/Avatar";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { typography } from "../../design/tokens";

const INFO_ROWS: { Icon: LucideIcon; label: string; key: string }[] = [
  { Icon: Mail,     label: "Email",         key: "email"         },
  { Icon: Phone,    label: "Phone",         key: "phone"         },
  { Icon: Users,    label: "Gender",        key: "gender"        },
  { Icon: Calendar, label: "Date of Birth", key: "date_of_birth" },
];

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { colors, isDark, toggleTheme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bgPrimary }]}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: colors.bgCard, borderColor: colors.border }]}
        >
          <ArrowLeft size={20} color={colors.textPrimary} strokeWidth={1.8} />
        </TouchableOpacity>
        <Text style={[styles.screenTitle, { color: colors.textPrimary }]}>Profile</Text>
      </View>

      {/* Avatar */}
      <View style={styles.avatarSection}>
        <Avatar name={user?.name} size={80} />
        <Text style={[styles.displayName, { color: colors.textPrimary }]}>
          {user?.name ?? "—"}
        </Text>
        <Text style={[styles.emailText, { color: colors.textSecondary }]}>{user?.email}</Text>
        <Badge label={user?.role ?? "USER"} variant={user?.role === "ADMIN" ? "warning" : "accent"} />
      </View>

      {/* Info Card */}
      <Card style={styles.infoCard}>
        {INFO_ROWS.map((row, i) => (
          <View key={row.key}>
            <View style={styles.infoRow}>
              <View style={[styles.infoIconWrap, { backgroundColor: colors.accentDim }]}>
                <row.Icon size={16} color={colors.accent} strokeWidth={1.8} />
              </View>
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: colors.textMuted }]}>{row.label}</Text>
                <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
                  {(user as any)?.[row.key] ?? "—"}
                </Text>
              </View>
            </View>
            {i < INFO_ROWS.length - 1 && (
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
            )}
          </View>
        ))}
      </Card>

      {/* Dark Mode Toggle */}
      <Card style={styles.themeCard}>
        <TouchableOpacity
          onPress={toggleTheme}
          activeOpacity={0.7}
          style={styles.themeRow}
        >
          <View style={styles.themeLeft}>
            <View style={[styles.themeIconWrap, { backgroundColor: colors.accentDim }]}>
              {isDark
                ? <Moon size={18} color={colors.accent} strokeWidth={1.8} />
                : <Sun  size={18} color={colors.accent} strokeWidth={1.8} />
              }
            </View>
            <View>
              <Text style={[styles.themeTitle, { color: colors.textPrimary }]}>Dark Mode</Text>
              <Text style={[styles.themeStatus, { color: colors.textMuted }]}>
                {isDark ? "On" : "Off"}
              </Text>
            </View>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={colors.bgPrimary}
            ios_backgroundColor={colors.border}
          />
        </TouchableOpacity>
      </Card>

      <Button label="Edit Profile" variant="outline" onPress={() => {}} />
      <View style={styles.spacer} />
      <Button label="Sign Out" variant="danger" onPress={logout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1 },
  scrollContent:{ padding: 24, paddingBottom: 110 },
  header:       { flexDirection: "row", alignItems: "center", paddingTop: 40, marginBottom: 32 },
  backBtn:      { width: 40, height: 40, borderRadius: 12, borderWidth: 1, alignItems: "center", justifyContent: "center", marginRight: 16 },
  screenTitle:  { fontFamily: typography.heading, fontSize: typography["2xl"] },
  avatarSection:{ alignItems: "center", marginBottom: 32 },
  displayName:  { fontFamily: typography.heading, fontSize: typography["2xl"], marginTop: 16, marginBottom: 4 },
  emailText:    { fontFamily: typography.body, marginBottom: 12 },
  infoCard:     { marginBottom: 16 },
  infoRow:      { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  infoIconWrap: { width: 32, height: 32, borderRadius: 8, alignItems: "center", justifyContent: "center", marginRight: 12 },
  infoContent:  { flex: 1 },
  infoLabel:    { fontSize: typography.xs, fontFamily: typography.body, marginBottom: 2 },
  infoValue:    { fontSize: typography.sm, fontFamily: typography.medium },
  divider:      { height: 1, marginLeft: 44 },
  themeCard:    { marginBottom: 16 },
  themeRow:     { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  themeLeft:    { flexDirection: "row", alignItems: "center", gap: 12 },
  themeIconWrap:{ width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  themeTitle:   { fontSize: typography.base, fontFamily: typography.medium },
  themeStatus:  { fontSize: typography.xs, fontFamily: typography.body },
  spacer:       { height: 12 },
});
