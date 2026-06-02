import { useCallback, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { useTheme } from "../../context/ThemeContext";
import { typography } from "../../design/tokens";

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  leftIcon?: LucideIcon;
  secureToggle?: boolean;
}

export function Input({
  label,
  error,
  leftIcon: LeftIcon,
  secureToggle = false,
  ...props
}: InputProps) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);
  const [secure, setSecure] = useState(secureToggle);

  // useCallback prevents recreating handlers on every keystroke re-render
  const handleFocus = useCallback(() => setFocused(true),  []);
  const handleBlur  = useCallback(() => setFocused(false), []);
  const toggleSecure = useCallback(() => setSecure((s) => !s), []);

  const borderColor = focused
    ? colors.accent
    : error
    ? colors.error
    : colors.border;

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        {label}
      </Text>

      <View
        style={[
          styles.inputBox,
          {
            backgroundColor: colors.bgInput,
            // Only change border color + width on focus — NO shadow/elevation.
            // Adding elevation changes layout and causes the typing glitch on Android.
            borderColor,
            borderWidth: focused ? 2 : 1.5,
          },
        ]}
      >
        {LeftIcon && (
          // Wrap icon in View — Lucide SVG components don't respect style.marginRight
          <View style={styles.iconWrap}>
            <LeftIcon
              size={18}
              color={focused ? colors.accent : colors.textMuted}
              strokeWidth={1.8}
            />
          </View>
        )}

        <TextInput
          style={[
            styles.textInput,
            {
              color: colors.textPrimary,
              // Android needs explicit vertical alignment to prevent text jumping
              textAlignVertical: Platform.OS === "android" ? "center" : undefined,
            },
          ]}
          placeholderTextColor={colors.textMuted}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secure}
          // Prevents Android autocorrect toolbar from causing layout shifts
          autoCorrect={false}
          autoComplete={props.autoComplete ?? "off"}
          {...props}
        />

        {secureToggle && (
          <TouchableOpacity
            onPress={toggleSecure}
            style={styles.eyeBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {secure
              ? <EyeOff size={18} color={colors.textMuted} strokeWidth={1.8} />
              : <Eye    size={18} color={colors.textMuted} strokeWidth={1.8} />
            }
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper:   { marginBottom: 16 },
  label:     { fontSize: typography.sm, fontFamily: typography.medium, marginBottom: 6 },
  inputBox: {
    flexDirection:     "row",
    alignItems:        "center",
    borderRadius:      12,
    paddingHorizontal: 16,
    // Fixed min-height avoids layout shift when border-width changes
    minHeight:         54,
  },
  iconWrap:  { marginRight: 10, justifyContent: "center" },
  textInput: {
    flex:            1,
    paddingVertical: Platform.OS === "android" ? 12 : 16,
    fontSize:        typography.base,
    fontFamily:      typography.body,
    // Prevent Android from adding its own padding
    includeFontPadding: false,
  },
  eyeBtn:    { paddingLeft: 8 },
  errorText: { fontSize: typography.xs, marginTop: 4, fontFamily: typography.body },
});
