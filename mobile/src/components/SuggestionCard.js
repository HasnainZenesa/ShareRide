import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";

export default function SuggestionCard({ item, onPress }) {
  return (
    <Pressable onPress={onPress}
      style={{ backgroundColor:"#fff", borderRadius:16, padding:12, flexDirection:"row", alignItems:"center", gap:12, borderWidth:1, borderColor:colors.border }}>
      <View>
        <Image source={{ uri:item.avatar }} style={{ width:56, height:56, borderRadius:12 }} />
        {/* active dot */}
        <View style={{ position:"absolute", bottom:2, right:2, width:12, height:12, borderRadius:6, backgroundColor: item.active ? "#16a34a" : "#9CA3AF", borderWidth:2, borderColor:"#fff" }}/>
      </View>
      <View style={{ flex:1 }}>
        <Text style={{ fontWeight:"800", color:"#111" }}>{item.name} • {item.vehicle}</Text>
        <Text style={{ color:"#555", marginTop:2 }}>{item.route}</Text>
        <Text style={{ marginTop:4, fontWeight:"700" }}>Rs {item.price.toLocaleString()} / month</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#888" />
    </Pressable>
  );
}
