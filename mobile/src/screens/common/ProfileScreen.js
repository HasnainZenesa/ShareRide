import React from "react";
import { View, Text, Image, Switch, Pressable } from "react-native";
import Screen from "../../components/Screen";
import { colors } from "../../theme/colors";
import { useUser } from "../../state/useUser";

export default function ProfileScreen({ navigation }){
  const { name, avatar, active, setActive } = useUser();

  return (
    <Screen>
      <View style={{ flexDirection:"row", gap:12, alignItems:"center", marginBottom:16 }}>
        <View>
          <Image source={{ uri:avatar }} style={{ width:64, height:64, borderRadius:16 }} />
          {/* active dot over avatar */}
          <View style={{ position:"absolute", bottom:2, right:2, width:14, height:14, borderRadius:7, backgroundColor: active?"#16a34a":"#9CA3AF", borderWidth:2, borderColor:"#fff" }}/>
        </View>
        <View style={{ flex:1 }}>
          <Text style={{ fontWeight:"800", fontSize:18 }}>{name}</Text>
          <Text style={{ color:"#555" }}>Passenger • Karachi</Text>
        </View>
      </View>

      {/* Active duty toggle */}
      <View style={{ backgroundColor:"#fff", borderRadius:12, borderWidth:1, borderColor:"#eee", padding:12, marginBottom:16, flexDirection:"row", justifyContent:"space-between", alignItems:"center" }}>
        <View>
          <Text style={{ fontWeight:"800" }}>Active for rides</Text>
          <Text style={{ color:"#555" }}>Others will see a green dot</Text>
        </View>
        <Switch value={active} onValueChange={setActive} trackColor={{ false:"#ccc", true:"#FFE766" }} thumbColor={active?"#FFD600":"#f4f3f4"} />
      </View>

      {/* Settings list */}
      {[
        { label:"Saved Places" },
        { label:"Language" },
        { label:"Notifications" },
        { label:"Privacy & Security" },
        { label:"Apply as Rider (KYC)", onPress:()=> navigation.navigate("RiderApply") },
      ].map((row,i)=>(
        <Pressable key={i} onPress={row.onPress} style={{ backgroundColor:"#fff", borderRadius:12, borderWidth:1, borderColor:"#eee", padding:14, marginBottom:10 }}>
          <Text style={{ fontWeight:"700" }}>{row.label}</Text>
        </Pressable>
      ))}
    </Screen>
  );
}
