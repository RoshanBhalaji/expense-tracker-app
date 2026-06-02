import { View, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { typography } from "../../design/tokens";

export default function TransactionsScreen() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bgPrimary, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontFamily: typography.heading, fontSize: typography.xl, color: colors.textPrimary }}>
        Transactions
      </Text>
    </View>
  );
}
