import React, { useMemo, useState } from "react";
import { View, Text, Image, Pressable, Modal, TextInput, Alert } from "react-native";
import Screen from "../../components/Screen";
import { colors } from "../../theme/colors";
import { riderSuggestions } from "../../data/mock";

export default function RiderProfileScreen({ route, navigation }){
  const id = route?.params?.id;
  const rider = useMemo(()=> riderSuggestions.find(r=>r.id===id) || riderSuggestions[0], [id]);
  const [bidOpen, setBidOpen] = useState(false);
  const [amount, setAmount] = useState(String(rider.price));
  const [plan, setPlan] = useState("full");
  const [note, setNote] = useState("");

  const sendOffer = ()=>{
    Alert.alert("Offer sent", `Rs ${amount} (${plan})\nNote: ${note || "-"}`);
    setBidOpen(false);
    navigation.navigate("ChatsTab"); // jump to chats tab id (see stack/tabs mapping below)
  };

  return (
    <Screen>
      <View style={{ alignItems:"center", marginBottom:12 }}>
        <Image source={{ uri:rider.avatar }} style={{ width:96, height:96, borderRadius:20 }} />
        <Text style={{ fontWeight:"800", fontSize:20, marginTop:8 }}>{rider.name} • {rider.vehicle}</Text>
        <Text style={{ color:"#555", marginTop:4 }}>{rider.route}</Text>
        <Text style={{ marginTop:8, fontWeight:"800" }}>Rs {rider.price.toLocaleString()} / month</Text>
        <Text style={{ color:"#555", marginTop:2 }}>Rating {rider.rating} • Reliability {rider.reliability}%</Text>
      </View>

      <Pressable onPress={()=> setBidOpen(true)} style={{ backgroundColor:colors.primary, padding:14, borderRadius:999, alignItems:"center", marginTop:8 }}>
        <Text style={{ fontWeight:"800", color:"#111" }}>Place Bid / Counter</Text>
      </Pressable>

      {/* Bid modal */}
      <Modal visible={bidOpen} transparent animationType="slide" onRequestClose={()=>setBidOpen(false)}>
        <View style={{ flex:1, backgroundColor:"rgba(0,0,0,0.45)", justifyContent:"flex-end" }}>
          <View style={{ backgroundColor:"#fff", borderTopLeftRadius:20, borderTopRightRadius:20, padding:16, gap:10 }}>
            <Text style={{ fontWeight:"800", fontSize:16 }}>Send Offer</Text>
            <View>
              <Text style={{ color:"#555", marginBottom:6 }}>Amount (Rs)</Text>
              <TextInput keyboardType="number-pad" value={amount} onChangeText={setAmount}
                style={{ borderWidth:1, borderColor:colors.border, borderRadius:12, padding:10 }} />
            </View>
            <View style={{ flexDirection:"row", gap:8 }}>
              {["full","am","pm","x_rides"].map(p=>(
                <Pressable key={p} onPress={()=>setPlan(p)} style={{ paddingVertical:8, paddingHorizontal:12, borderRadius:999, borderWidth:1, borderColor:colors.border, backgroundColor: plan===p ? "#FFF2A6":"#fff" }}>
                  <Text style={{ fontWeight:"700" }}>{p.toUpperCase()}</Text>
                </Pressable>
              ))}
            </View>
            <View>
              <Text style={{ color:"#555", marginBottom:6 }}>Note</Text>
              <TextInput placeholder="any note…" value={note} onChangeText={setNote}
                style={{ borderWidth:1, borderColor:colors.border, borderRadius:12, padding:10 }} />
            </View>
            <Pressable onPress={sendOffer} style={{ backgroundColor:colors.primary, padding:12, borderRadius:999, alignItems:"center" }}>
              <Text style={{ fontWeight:"800", color:"#111" }}>Send Offer</Text>
            </Pressable>
            <Pressable onPress={()=>setBidOpen(false)} style={{ alignItems:"center", padding:8 }}>
              <Text style={{ color:"#111" }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}
