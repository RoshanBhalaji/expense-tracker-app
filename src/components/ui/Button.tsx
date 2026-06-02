import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface ButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  variant?: "primary" | "outline" | "danger" | "ghost";
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Button({
  label,
  onPress,
  loading = false,
  variant = "primary",
  disabled = false,
  fullWidth = true,
}: ButtonProps) {
  const { colors, shadow } = useTheme();

  const variantMap = {
    primary: { textColor: colors.textInverse, bg: colors.accent,        border: undefined,      shadow: shadow.accent },
    outline: { textColor: colors.accent,       bg: "transparent",        border: colors.accent,  shadow: {}            },
    danger:  { textColor: colors.error,        bg: "transparent",        border: colors.error,   shadow: {}            },
    ghost:   { textColor: colors.textSecondary,bg: colors.bgCard,        border: undefined,      shadow: {}            },
  };

  const v = variantMap[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.base,
        v.shadow,
        {
          backgroundColor: v.bg as string,
          borderColor:     v.border,
          borderWidth:     v.border ? 1.5 : 0,
          width:           fullWidth ? "100%" : undefined,
          paddingHorizontal: fullWidth ? undefined : 24,
          opacity:         disabled || loading ? 0.5 : 1,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.textColor} />
      ) : (
        <Text style={[styles.label, { color: v.textColor }]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base:  { borderRadius: 12, paddingVertical: 16, alignItems: "center", justifyContent: "center" },
  label: { fontSize: 16, fontFamily: "Outfit_500Medium", fontWeight: "500" },
});
