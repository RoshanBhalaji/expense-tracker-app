---
name: inline-remover
description: Convert all inline style={{}} objects in React Native components into separate StyleSheet.create() imports for cleaner, more maintainable code.
---

This skill converts inline styles in React Native / Expo components into `StyleSheet.create()` calls. It works on `.tsx`/`.jsx` files that use `style={{...}}` patterns.

## Steps

1. **Scan** the file for all `style={{...}}` occurrences — both on elements and in `contentContainerStyle`, `contentStyle`, `containerStyle`, etc.

2. **Categorize** each inline style:
   - **Static**: No dynamic values (no `colors.`, `typography.`, `theme.`, props, state, or variables). These go into `StyleSheet.create()`.
   - **Dynamic**: Uses `colors.`, `typography.`, `theme.`, props, state, or other variables. These stay inline or get extracted into a helper function/object.

3. **Name styles meaningfully** based on context:
   - `container` — outermost View
   - `header`, `headerLeft`, `headerRight` — header sections
   - `card`, `cardBody`, `cardFooter` — card sub-elements
   - `row`, `rowCenter`, `rowBetween` — flexbox rows
   - `iconWrap`, `icon` — icon containers
   - `text`, `title`, `subtitle`, `label` — text elements
   - `input`, `inputWrapper` — form controls
   - `button`, `buttonPrimary` — buttons
   - Follow existing naming patterns if the file already has a stylesheet

4. **For dynamic styles** that mix static + dynamic properties:
   - Extract the static properties into `StyleSheet.create()`
   - Use inline `style={[styles.xxx, { dynamicProp: value }]}` pattern
   - Example: instead of `style={{ width: 40, backgroundColor: colors.bgCard }}` → `style={[styles.iconWrap, { backgroundColor: colors.bgCard }]}`

5. **Import** `StyleSheet` from `"react-native"` — add it if missing:
   ```ts
   import { StyleSheet, View, Text, ... } from "react-native";
   ```

6. **Add** the `StyleSheet.create()` block at the bottom of the file (before the default export or at the very end):
   ```ts
   const styles = StyleSheet.create({
     container: { flex: 1 },
     header: { flexDirection: "row", alignItems: "center", paddingTop: 40 },
     ...
   });
   ```

7. **For dynamic-only styles** (entirely made of variable references), extract constant common patterns but leave truly variable ones inline. A style like `style={{ flex: 1 }}` should always be extracted since it's fully static.

## Example

**Before:**
```tsx
export default function LoginScreen() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bgPrimary }}>
      <View style={{ marginBottom: 40 }}>
        <Text style={{ fontFamily: typography.heading, color: colors.textPrimary, fontSize: typography["4xl"] }}>
          Welcome
        </Text>
      </View>
    </View>
  );
}
```

**After:**
```tsx
import { StyleSheet, View, Text } from "react-native";

export default function LoginScreen() {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      <View style={styles.brandSection}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Welcome
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  brandSection: { marginBottom: 40 },
  title: { fontFamily: typography.heading, fontSize: typography["4xl"] },
});
```

## Rules

- NEVER extract `colors.*`, `typography.*`, or `theme.*` values into `StyleSheet.create()` — StyleSheet cannot reference runtime variables.
- Keep `StyleSheet.create()` at the bottom of the file using `const styles = StyleSheet.create({...})`.
- If `contentContainerStyle`, `containerStyle`, or similar style props exist, handle them the same way.
- Only modify `style={{...}}` — leave `style={[array]}` patterns alone unless they contain inline objects.
- Do NOT break existing `style={[styles.existing, { ... }]}` patterns — just extract the inline object part.
