import { Redirect, Tabs } from "expo-router";
import { useRef, useEffect, useState } from "react";
import {
  Animated,
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type LayoutChangeEvent,
} from "react-native";
import { Home, Receipt, Heart, User } from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { typography } from "../../design/tokens";

const TABS: Record<string, { Icon: LucideIcon; label: string }> = {
  index:        { Icon: Home,    label: "Home"    },
  transactions: { Icon: Receipt, label: "Txns"    },
  favourites:   { Icon: Heart,   label: "Saved"   },
  profile:      { Icon: User,    label: "Profile" },
};

const TAB_COUNT     = Object.keys(TABS).length;
const INDICATOR_SIZE = 46; // tight squircle around the icon

function TrendingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors, isDark } = useTheme();
  const [barWidth, setBarWidth] = useState(0);

  // Slides to center of whichever tab is active
  const slideAnim = useRef(new Animated.Value(state.index)).current;

  // Per-tab icon scale spring
  const scaleAnims = useRef(
    Array.from({ length: TAB_COUNT }, (_, i) =>
      new Animated.Value(i === state.index ? 1 : 0)
    )
  ).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue:         state.index,
      useNativeDriver: false,
      tension:         140,
      friction:        11,
    }).start();

    scaleAnims.forEach((anim, i) => {
      Animated.spring(anim, {
        toValue:         i === state.index ? 1 : 0,
        useNativeDriver: true,
        tension:         160,
        friction:        12,
      }).start();
    });
  }, [state.index]);

  const onBarLayout = (e: LayoutChangeEvent) => {
    setBarWidth(e.nativeEvent.layout.width);
  };

  // Center the indicator behind each icon
  const tabWidth   = barWidth / TAB_COUNT;
  const indicatorLeft = slideAnim.interpolate({
    inputRange:  Array.from({ length: TAB_COUNT }, (_, i) => i),
    outputRange: Array.from({ length: TAB_COUNT }, (_, i) =>
      tabWidth * i + tabWidth / 2 - INDICATOR_SIZE / 2
    ),
  });

  const barBg    = isDark ? "rgba(13,18,32,0.97)" : "rgba(255,255,255,0.97)";
  const border   = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const inactive = isDark ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.28)";
  const active   = colors.accent;
  const indicBg  = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.07)";

  return (
    <View style={styles.wrapper}>
      <View
        style={[styles.bar, { backgroundColor: barBg, borderColor: border }]}
        onLayout={onBarLayout}
      >
        {/* ── Sliding indicator — same shape as icon wrap ── */}
        {barWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.indicator,
              {
                backgroundColor: indicBg,
                left: indicatorLeft,
              },
            ]}
          />
        )}

        {state.routes.map((route: { key: string; name: string }, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused   = state.index === index;
          const tab         = TABS[route.name];
          if (!tab) return null;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
          };

          const iconScale = scaleAnims[index].interpolate({
            inputRange:  [0, 1],
            outputRange: [1, 1.14],
          });

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              activeOpacity={0.7}
              style={styles.tab}
            >
              <Animated.View style={{ transform: [{ scale: iconScale }] }}>
                <tab.Icon
                  size={22}
                  color={isFocused ? active : inactive}
                  strokeWidth={isFocused ? 2.4 : 1.6}
                  fill={isFocused ? active : "transparent"}
                />
              </Animated.View>

              <Text style={[
                styles.label,
                {
                  color:      isFocused ? active : inactive,
                  fontFamily: isFocused ? typography.semibold : typography.body,
                },
              ]}>
                {tab.label}
              </Text>

              {/* Dot below active label */}
              {isFocused && (
                <View style={[styles.dot, { backgroundColor: active }]} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const { colors } = useTheme();

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.bgPrimary }]}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    );
  }

  if (!isAuthenticated) return <Redirect href="/(auth)/login" />;

  return (
    <Tabs
      tabBar={(props) => <TrendingTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="transactions" />
      <Tabs.Screen name="favourites" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position:      "absolute",
    bottom:        20,
    left:          16,
    right:         16,
    shadowColor:   "#000",
    shadowOffset:  { width: 0, height: 10 },
    shadowOpacity: Platform.OS === "ios" ? 0.13 : 0.20,
    shadowRadius:  28,
    elevation:     16,
  },

  bar: {
    flexDirection:     "row",
    alignItems:        "center",
    borderRadius:      28,
    paddingHorizontal: 4,
    paddingVertical:   8,
    borderWidth:       1,
    overflow:          "hidden",
    position:          "relative",
  },

  // Tight squircle — same shape as the icon area
  indicator: {
    position:     "absolute",
    width:        INDICATOR_SIZE,
    height:       INDICATOR_SIZE,
    borderRadius: 16,       // squircle — matches rounded icon feel
    top:          "50%",
    marginTop:    -(INDICATOR_SIZE / 2) + 2, // nudge up slightly to center on icon
  },

  tab: {
    flex:            1,
    alignItems:      "center",
    justifyContent:  "center",
    paddingVertical: 8,
    gap:             4,
    zIndex:          1, // sit above the indicator
  },

  label: {
    fontSize:      10,
    letterSpacing: 0.1,
  },

  dot: {
    width:        4,
    height:       4,
    borderRadius: 2,
    marginTop:    1,
  },

  loadingContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
});
