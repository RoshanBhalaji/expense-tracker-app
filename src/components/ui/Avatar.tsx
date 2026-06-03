import {
  Avatar as GSAvatar,
  AvatarFallbackText,
} from "@gluestack-ui/themed";
import { useTheme } from "../../context/ThemeContext";
import { typography } from "../../design/tokens";

interface AvatarProps {
  name?: string | null;
  size?: number;
}

export function Avatar({ name, size = 48 }: AvatarProps) {
  const { colors } = useTheme();

  return (
    <GSAvatar
      size="md"
      style={{
        width:           size,
        height:          size,
        borderRadius:    size / 2,
        backgroundColor: colors.accentDim,
        borderWidth:     2,
        borderColor:     colors.accent,
        alignItems:      "center",
        justifyContent:  "center",
      }}
    >
      <AvatarFallbackText
        style={{
          color:      colors.accent,
          fontSize:   size * 0.35,
          fontFamily: typography.heading,
        }}
      >
        {name ?? "?"}
      </AvatarFallbackText>
    </GSAvatar>
  );
}
