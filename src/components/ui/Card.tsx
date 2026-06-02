import { StyleSheet, View, ViewProps } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface CardProps extends ViewProps {
  glow?: boolean;
}

export function Card({ children, glow = false, style, ...props }: CardProps) {
  const { colors, shadow } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.bgCard,
          borderColor:     glow ? colors.accentGlow : colors.border,
        },
        glow ? shadow.accent : shadow.card,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, padding: 20, borderWidth: 1 },
});
