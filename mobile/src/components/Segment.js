import React from "react";
import { View, Pressable, Text } from "react-native";
import { colors } from "../theme/colors";

export default function Segment({ value, onChange, options }) {
  return (
    <View style={{ flexDirection:"row", backgroundColor:"#f6f6f6", borderRadius:12, padding:4, gap:4 }}>
      {options.map(opt => (
        <Pressable key={opt.value}
          onPress={()=> onChange(opt.value)}
          style={{ flex:1, backgroundColor: value===opt.value ? colors.primary : "transparent",
                   borderRadius:8, paddingVertical:10, alignItems:"center" }}>
          <Text style={{ fontWeight:"700", color:"#111" }}>{opt.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}
