import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { typography } from "../../design/tokens";

interface AvatarProps {
  name?: string | null;
  size?: number;
}

export function Avatar({ name, size = 48 }: AvatarProps) {
  const { colors } = useTheme();

  const initials =
    name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) ?? "?";

  return (
    <View style={[
      styles.circle,
      {
        width:           size,
        height:          size,
        borderRadius:    size / 2,
        backgroundColor: colors.accentDim,
        borderColor:     colors.accent,
      },
    ]}>
      <Text style={[styles.initials, { color: colors.accent, fontSize: size * 0.35 }]}>
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle:   { borderWidth: 2, alignItems: "center", justifyContent: "center" },
  initials: { fontFamily: typography.heading },
});
