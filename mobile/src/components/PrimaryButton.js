import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";
import { colors } from "../theme/colors";

export default function PrimaryButton({ title, onPress, disabled, loading, style }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        {
          backgroundColor: disabled ? "#FFE766" : colors.primary,
          paddingVertical: 14,
          borderRadius: 999,
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 2,
        },
        style,
      ]}
    >
      {loading ? <ActivityIndicator color="#111" /> : <Text style={{ color: "#111", fontWeight: "700" }}>{title}</Text>}
    </Pressable>
  );
}
