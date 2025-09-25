import React from "react";
import { Text, Image, Pressable } from "react-native";
import Screen from "../../components/Screen";
import PrimaryButton from "../../components/PrimaryButton";
import { colors } from "../../theme/colors";

export default function AuthChoiceScreen({ navigation }) {
  return (
    <Screen>
      <Text style={{ fontSize: 26, fontWeight: "800", color: colors.text, marginBottom: 16 }}>Welcome</Text>
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1518306727298-4c17e1bf6979?q=80&w=1200&auto=format&fit=crop" }}
        style={{ width: "100%", height: 200, borderRadius: 16, marginBottom: 20 }}
      />
      <PrimaryButton title="Login" onPress={() => navigation.navigate("Login")} style={{ marginBottom: 12 }} />
      <Pressable
        onPress={() => navigation.navigate("Register")}
        style={{ paddingVertical: 14, borderRadius: 999, alignItems: "center", borderWidth: 1.5, borderColor: colors.primary }}
      >
        <Text style={{ color: colors.text, fontWeight: "700" }}>Create an account</Text>
      </Pressable>
    </Screen>
  );
}
