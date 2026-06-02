import { View, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { typography } from "../../design/tokens";

export default function FavouritesScreen() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bgPrimary, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontFamily: typography.heading, fontSize: typography.xl, color: colors.textPrimary }}>
        Favourites
      </Text>
    </View>
  );
}
