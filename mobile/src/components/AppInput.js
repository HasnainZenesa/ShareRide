import React, { useState } from "react";
import { View, TextInput, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

export default function AppInput({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  secure,
  autoCapitalize = "none",
  style,
}) {
  const [hide, setHide] = useState(secure);
  return (
    <View style={[{ marginBottom: 14 }, style]}>
      {label ? <Text style={{ marginBottom: 6, color: colors.muted }}>{label}</Text> : null}
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 12,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 12,
        }}
      >
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={hide}
          style={{ flex: 1, paddingVertical: 12, color: colors.text }}
        />
        {secure ? (
          <Pressable onPress={() => setHide(!hide)} hitSlop={10}>
            <Ionicons name={hide ? "eye-off-outline" : "eye-outline"} size={20} color={colors.muted} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
