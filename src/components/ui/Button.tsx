import {
  Button as GSButton,
  ButtonText,
  ButtonSpinner,
} from "@gluestack-ui/themed";
import { useTheme } from "../../context/ThemeContext";
import { typography } from "../../design/tokens";

interface ButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  variant?: "primary" | "outline" | "danger" | "ghost";
  disabled?: boolean;
  fullWidth?: boolean;
}

const VARIANT_MAP = {
  primary: { action: "primary" as const,  variant: "solid" as const  },
  outline: { action: "primary" as const,  variant: "outline" as const },
  danger:  { action: "negative" as const, variant: "outline" as const },
  ghost:   { action: "secondary" as const,variant: "ghost" as const   },
};

export function Button({
  label,
  onPress,
  loading  = false,
  variant  = "primary",
  disabled = false,
  fullWidth = true,
}: ButtonProps) {
  const { colors, shadow } = useTheme();
  const { action, variant: gsVariant } = VARIANT_MAP[variant];

  const bgColor =
    variant === "primary" ? colors.accent :
    variant === "ghost"   ? colors.bgCard : "transparent";

  const textColor =
    variant === "primary" ? colors.textInverse :
    variant === "outline" ? colors.accent       :
    variant === "danger"  ? colors.error        : colors.textSecondary;

  const borderColor =
    variant === "outline" ? colors.accent :
    variant === "danger"  ? colors.error  : undefined;

  return (
    <GSButton
      action={action}
      variant={gsVariant}
      onPress={onPress}
      isDisabled={disabled || loading}
      style={[
        variant === "primary" ? shadow.accent : {},
        {
          backgroundColor: bgColor,
          borderColor,
          borderWidth:     borderColor ? 1.5 : 0,
          borderRadius:    12,
          paddingVertical: 16,
          width:           fullWidth ? "100%" : undefined,
          paddingHorizontal: fullWidth ? undefined : 24,
          opacity:         disabled || loading ? 0.5 : 1,
          justifyContent:  "center",
          alignItems:      "center",
        },
      ]}
    >
      {loading ? (
        <ButtonSpinner color={textColor} />
      ) : (
        <ButtonText
          style={{
            color:      textColor,
            fontSize:   16,
            fontFamily: typography.medium,
          }}
        >
          {label}
        </ButtonText>
      )}
    </GSButton>
  );
}
