import React from "react";
import { SafeAreaView, View } from "react-native";
import { colors } from "../theme/colors";

export default function Screen({ children, style }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={[{ flex: 1, padding: 20 }, style]}>{children}</View>
    </SafeAreaView>
  );
}
