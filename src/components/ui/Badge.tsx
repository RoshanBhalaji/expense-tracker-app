import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { typography } from "../../design/tokens";

interface BadgeProps {
  label: string;
  variant?: "accent" | "success" | "warning" | "error" | "muted";
}

export function Badge({ label, variant = "accent" }: BadgeProps) {
  const { colors } = useTheme();

  const variantMap = {
    accent:  { bg: colors.accentDim,  text: colors.accent,        dot: colors.accent        },
    success: { bg: "#10B98115",        text: "#10B981",            dot: "#10B981"            },
    warning: { bg: "#F59E0B15",        text: "#F59E0B",            dot: "#F59E0B"            },
    error:   { bg: "#EF444415",        text: colors.error,         dot: colors.error         },
    muted:   { bg: colors.border,      text: colors.textSecondary, dot: colors.textMuted     },
  };

  const v = variantMap[variant];

  return (
    <View style={[styles.pill, { backgroundColor: v.bg }]}>
      <View style={[styles.dot, { backgroundColor: v.dot }]} />
      <Text style={[styles.label, { color: v.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill:  { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 9999 },
  dot:   { width: 6, height: 6, borderRadius: 3 },
  label: { fontSize: typography.xs, fontFamily: typography.medium },
});
