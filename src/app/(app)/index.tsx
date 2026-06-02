import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Bell, LogOut, Mail, Moon, Settings, Shield, ShieldCheck, Sun, User } from "lucide-react-native";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Avatar } from "../../components/ui/Avatar";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { typography } from "../../design/tokens";

const QUICK_ACTIONS = [
  { Icon: User,     label: "Profile",  route: "/(app)/profile", danger: false },
  { Icon: Shield,   label: "Security", route: null,              danger: false },
  { Icon: Settings, label: "Settings", route: null,              danger: false },
  { Icon: LogOut,   label: "Logout",   route: null,              danger: true  },
] as const;

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardScreen() {
  const { user, logout } = useAuth();
  const { colors, toggleTheme, isDark } = useTheme();
  const router = useRouter();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bgPrimary }]}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Avatar name={user?.name} size={44} />
          <View>
            <Text style={[styles.greeting, { color: colors.textMuted }]}>
              {greeting()}
            </Text>
            <Text style={[styles.userName, { color: colors.textPrimary }]}>
              {user?.name ?? user?.email?.split("@")[0]}
            </Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={toggleTheme}
            style={[styles.iconBtn, { backgroundColor: colors.bgCard, borderColor: colors.border }]}
          >
            {isDark
              ? <Sun  size={18} color={colors.textSecondary} strokeWidth={1.8} />
              : <Moon size={18} color={colors.textSecondary} strokeWidth={1.8} />
            }
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
            <Bell size={18} color={colors.textSecondary} strokeWidth={1.8} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Session Card */}
      <Card glow style={styles.sessionCard}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Active Session</Text>
          <Badge label="LIVE" variant="success" />
        </View>
        <View style={styles.cardRow}>
          <Mail size={15} color={colors.textMuted} strokeWidth={1.8} />
          <Text style={[styles.cardEmail, { color: colors.textSecondary }]}>{user?.email}</Text>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.cardRow}>
            <ShieldCheck size={15} color={colors.accent} strokeWidth={1.8} />
            <Text style={[styles.cardRoleLabel, { color: colors.textSecondary }]}>Role</Text>
          </View>
          <Badge label={user?.role ?? "USER"} variant={user?.role === "ADMIN" ? "warning" : "accent"} />
        </View>
      </Card>

      {/* Quick Actions */}
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {QUICK_ACTIONS.map((action) => (
          <TouchableOpacity
            key={action.label}
            onPress={() => {
              if (action.label === "Logout") logout();
              else if (action.route) router.push(action.route as any);
            }}
            style={[styles.actionBtn, { backgroundColor: colors.bgCard, borderColor: colors.border }]}
          >
            <View style={[
              styles.actionIconWrap,
              { backgroundColor: action.danger ? "#EF444415" : colors.accentDim },
            ]}>
              <action.Icon
                size={20}
                color={action.danger ? colors.error : colors.accent}
                strokeWidth={1.8}
              />
            </View>
            <Text style={[
              styles.actionLabel,
              { color: action.danger ? colors.error : colors.textPrimary },
            ]}>
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1 },
  scrollContent:{ padding: 24, paddingBottom: 110 },
  header:       { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 40, marginBottom: 32 },
  headerLeft:   { flexDirection: "row", alignItems: "center", gap: 12 },
  headerRight:  { flexDirection: "row", gap: 10 },
  greeting:     { fontSize: typography.sm, fontFamily: typography.body },
  userName:     { fontSize: typography.lg, fontFamily: typography.heading },
  iconBtn:      { width: 40, height: 40, borderRadius: 12, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  sessionCard:  { marginBottom: 24 },
  cardHeader:   { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  cardTitle:    { fontFamily: typography.heading, fontSize: typography.lg },
  cardRow:      { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  cardEmail:    { fontSize: typography.sm, fontFamily: typography.body },
  cardFooter:   { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cardRoleLabel:{ fontSize: typography.sm, fontFamily: typography.body },
  sectionTitle: { fontFamily: typography.heading, fontSize: typography.lg, marginBottom: 16 },
  actionsGrid:  { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  actionBtn:    { width: "47%", borderWidth: 1, borderRadius: 16, padding: 16, alignItems: "center", justifyContent: "center" },
  actionIconWrap:{ width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  actionLabel:  { fontSize: typography.sm, fontFamily: typography.medium },
});
