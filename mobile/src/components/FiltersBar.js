import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

export default function FiltersBar({ vehicle, setVehicle, detour, setDetour, onOpenTime }) {
  return (
    <View style={{ flexDirection:"row", gap:8 }}>
      <Pressable onPress={()=> setVehicle(vehicle==="all"?"car":vehicle==="car"?"bike":"all")}
        style={{ flex:1, padding:10, borderRadius:999, borderWidth:1, borderColor:colors.border, backgroundColor:"#fff", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:6 }}>
        <Ionicons name="car-outline" size={18} color="#111" />
        <Text style={{ fontWeight:"700" }}>{vehicle.toUpperCase()}</Text>
      </Pressable>
      <Pressable onPress={()=> setDetour(detour===5?10:detour===10?15:5)}
        style={{ flex:1, padding:10, borderRadius:999, borderWidth:1, borderColor:colors.border, backgroundColor:"#fff", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:6 }}>
        <Ionicons name="navigate-outline" size={18} color="#111" />
        <Text style={{ fontWeight:"700" }}>{detour}% detour</Text>
      </Pressable>
      <Pressable onPress={onOpenTime}
        style={{ flex:1, padding:10, borderRadius:999, borderWidth:1, borderColor:colors.border, backgroundColor:"#fff", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:6 }}>
        <Ionicons name="time-outline" size={18} color="#111" />
        <Text style={{ fontWeight:"700" }}>AM/PM</Text>
      </Pressable>
    </View>
  );
}
