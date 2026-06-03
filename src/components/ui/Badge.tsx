import {
  Badge as GSBadge,
  BadgeText,
} from "@gluestack-ui/themed";
import { View, StyleSheet } from "react-native";
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
    <GSBadge
      action="info"
      variant="solid"
      size="sm"
      style={[styles.pill, { backgroundColor: v.bg }]}
    >
      {/* Dot indicator */}
      <View style={[styles.dot, { backgroundColor: v.dot }]} />
      <BadgeText
        style={[styles.text, { color: v.text }]}
      >
        {label}
      </BadgeText>
    </GSBadge>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection:     "row",
    alignItems:        "center",
    paddingHorizontal: 10,
    paddingVertical:   4,
    borderRadius:      9999,
    gap:               6,
    borderWidth:       0,
  },
  dot:  { width: 6, height: 6, borderRadius: 3 },
  text: { fontSize: typography.xs, fontFamily: typography.medium },
});
