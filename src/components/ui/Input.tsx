import { useCallback, useState } from "react";
import { Platform, StyleSheet, Text } from "react-native";
import {
  Input as GSInput,
  InputField,
  InputSlot,
} from "@gluestack-ui/themed";
import type { LucideIcon } from "lucide-react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { typography } from "../../design/tokens";

interface InputProps {
  label: string;
  error?: string;
  leftIcon?: LucideIcon;
  secureToggle?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoComplete?: string;
}

export function Input({
  label,
  error,
  leftIcon: LeftIcon,
  secureToggle = false,
  value,
  onChangeText,
  placeholder,
  autoCapitalize,
  keyboardType,
  autoComplete,
}: InputProps) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);
  const [secure, setSecure] = useState(secureToggle);

  const handleFocus   = useCallback(() => setFocused(true),  []);
  const handleBlur    = useCallback(() => setFocused(false), []);
  const toggleSecure  = useCallback(() => setSecure((s) => !s), []);

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>

      <GSInput
        variant="outline"
        size="md"
        isInvalid={!!error}
        isFocused={focused}
        style={[
          styles.inputBox,
          {
            backgroundColor: colors.bgInput,
            borderColor: focused ? colors.accent : error ? colors.error : colors.border,
            borderWidth: focused ? 2 : 1.5,
          },
        ]}
      >
        {LeftIcon && (
          <InputSlot style={styles.iconSlot}>
            <LeftIcon
              size={18}
              color={focused ? colors.accent : colors.textMuted}
              strokeWidth={1.8}
            />
          </InputSlot>
        )}

        <InputField
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          autoComplete={autoComplete as any ?? "off"}
          autoCorrect={false}
          secureTextEntry={secure}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={colors.textMuted}
          style={[
            styles.field,
            {
              color:             colors.textPrimary,
              fontFamily:        typography.body,
              textAlignVertical: Platform.OS === "android" ? "center" : undefined,
            },
          ]}
        />

        {secureToggle && (
          <InputSlot style={styles.eyeSlot}>
            <TouchableOpacity
              onPress={toggleSecure}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              {secure
                ? <EyeOff size={18} color={colors.textMuted} strokeWidth={1.8} />
                : <Eye    size={18} color={colors.textMuted} strokeWidth={1.8} />
              }
            </TouchableOpacity>
          </InputSlot>
        )}
      </GSInput>

      {error && (
        <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper:   { marginBottom: 16 },
  label:     { fontSize: typography.sm, fontFamily: typography.medium, marginBottom: 6 },
  inputBox:  { borderRadius: 12, minHeight: 54 },
  iconSlot:  { paddingLeft: 14, paddingRight: 8 },
  field:     {
    flex: 1,
    fontSize: typography.base,
    paddingVertical: Platform.OS === "android" ? 12 : 16,
    includeFontPadding: false,
  },
  eyeSlot:   { paddingRight: 14 },
  error:     { fontSize: typography.xs, marginTop: 4, fontFamily: typography.body },
});
