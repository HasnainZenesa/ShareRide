import React from "react";
import { View } from "react-native";

export default function StrengthBar({ score=0 }){
  const blocks = [0,1,2,3];
  return (
    <View style={{ flexDirection:"row", gap:6, marginTop:6 }}>
      {blocks.map(i=>(
        <View key={i} style={{
          height:6, flex:1, borderRadius:999,
          backgroundColor: i<score ? (i<2 ? "#FFD600" : "#2ecc71") : "#E5E7EB"
        }}/>
      ))}
    </View>
  );
}
