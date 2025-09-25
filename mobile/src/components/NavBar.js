import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { useUser } from "../state/useUser";

export default function NavBar({ onSearch, onMenu }) {
  const { streak } = useUser();
  const logo = require("../assets/logo.png");      // ✅ // local file

  return (
    <View style={{
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 12,
      paddingVertical: 6,
    }}>
      {/* Left: logo + app name */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Image source={logo} style={{ width: 26, height: 26, borderRadius: 6 }} />
        <Text style={{ fontWeight: "800", fontSize: 18, color: "#111" }}>ShareRide</Text>
      </View>

      {/* Middle: streak badge */}
      <View style={{
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 999,
        paddingHorizontal: 8,
        paddingVertical: 4,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
      }}>
        <Text style={{ fontWeight: "800", color: "#111" }}>{streak}</Text>
        <Text style={{ fontSize: 16 }}>🔥</Text>
      </View>

      {/* Right: icons */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
        <Pressable onPress={onSearch} hitSlop={10}><Ionicons name="search-outline" size={22} color="#111" /></Pressable>
        <Pressable onPress={onMenu} hitSlop={10}><Ionicons name="reorder-three-outline" size={24} color="#111" /></Pressable>
      </View>
    </View>
  );
}
