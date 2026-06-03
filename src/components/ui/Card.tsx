import { Box } from "@gluestack-ui/themed";
import type { ViewProps } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface CardProps extends ViewProps {
  glow?: boolean;
}

export function Card({ children, glow = false, style, ...props }: CardProps) {
  const { colors, shadow } = useTheme();

  return (
    <Box
      style={[
        {
          backgroundColor: colors.bgCard,
          borderRadius:    16,
          padding:         20,
          borderWidth:     1,
          borderColor:     glow ? colors.accentGlow : colors.border,
        },
        glow ? shadow.accent : shadow.card,
        style,
      ]}
      {...(props as any)}
    >
      {children}
    </Box>
  );
}
