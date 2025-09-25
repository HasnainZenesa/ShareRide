import React from "react";
import { Text, Image } from "react-native";
import Screen from "../../components/Screen";
import PrimaryButton from "../../components/PrimaryButton";
import { colors } from "../../theme/colors";

export default function GetStartedScreen({ navigation }) {
  return (
    <Screen style={{ justifyContent: "center", alignItems: "center" }}>
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop" }}
        style={{ width: "100%", height: 260, borderRadius: 16, marginBottom: 24 }}
      />
      <Text style={{ fontSize: 28, fontWeight: "800", color: colors.text }}>ShareRide</Text>
      <Text style={{ color: colors.muted, textAlign: "center", marginTop: 8 }}>
        Safe monthly ride-share for office commuters.
      </Text>
      <PrimaryButton title="Get Started" onPress={() => navigation.replace("AuthChoice")} style={{ width: "100%", marginTop: 24 }} />
    </Screen>
  );
}
