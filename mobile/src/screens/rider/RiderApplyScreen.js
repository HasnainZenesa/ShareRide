import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, ScrollView } from "react-native";
import Screen from "../../components/Screen";
import { colors } from "../../theme/colors";
import PrimaryButton from "../../components/PrimaryButton";

export default function RiderApplyScreen({ navigation }){
  const [license, setLicense] = useState("");
  const [cnic, setCnic] = useState("");
  const [vehicle, setVehicle] = useState("car");
  const [seats, setSeats] = useState("2");
  const [plate, setPlate] = useState("");
  const [detour, setDetour] = useState("5");
  const [note, setNote] = useState("");

  const submit = ()=>{
    // UI-only
    Alert.alert("Application Submitted", "Status: Pending review by admin.");
    navigation.goBack();
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <Text style={{ fontWeight:"800", fontSize:18, marginBottom:12 }}>Become a Rider</Text>

        <Text style={{ color:"#555", marginBottom:6 }}>Driving License No</Text>
        <TextInput placeholder="e.g. ABC-123456" value={license} onChangeText={setLicense}
          style={{ borderWidth:1, borderColor:"#ddd", borderRadius:12, padding:10, marginBottom:12, backgroundColor:"#fff" }} />

        <Text style={{ color:"#555", marginBottom:6 }}>CNIC</Text>
        <TextInput placeholder="42101-1234567-1" value={cnic} onChangeText={setCnic}
          style={{ borderWidth:1, borderColor:"#ddd", borderRadius:12, padding:10, marginBottom:12, backgroundColor:"#fff" }} />

        <Text style={{ color:"#555", marginBottom:6 }}>Vehicle Type</Text>
        <View style={{ flexDirection:"row", gap:8, marginBottom:12 }}>
          {["car","bike"].map(v=>(
            <Pressable key={v} onPress={()=>setVehicle(v)}
              style={{ paddingVertical:10, paddingHorizontal:16, borderRadius:999, borderWidth:1, borderColor:"#ddd", backgroundColor: vehicle===v?"#FFF2A6":"#fff" }}>
              <Text style={{ fontWeight:"700" }}>{v.toUpperCase()}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={{ color:"#555", marginBottom:6 }}>Seats offered</Text>
        <TextInput keyboardType="number-pad" value={seats} onChangeText={setSeats}
          style={{ borderWidth:1, borderColor:"#ddd", borderRadius:12, padding:10, marginBottom:12, backgroundColor:"#fff", width:120 }} />

        <Text style={{ color:"#555", marginBottom:6 }}>Plate (masked)</Text>
        <TextInput placeholder="e.g. ABC-123 (mask ok)" value={plate} onChangeText={setPlate}
          style={{ borderWidth:1, borderColor:"#ddd", borderRadius:12, padding:10, marginBottom:12, backgroundColor:"#fff" }} />

        <Text style={{ color:"#555", marginBottom:6 }}>Max detour %</Text>
        <TextInput keyboardType="number-pad" value={detour} onChangeText={setDetour}
          style={{ borderWidth:1, borderColor:"#ddd", borderRadius:12, padding:10, marginBottom:12, backgroundColor:"#fff", width:140 }} />

        <Text style={{ color:"#555", marginBottom:6 }}>Note (optional)</Text>
        <TextInput placeholder="Any preferences (music/smoking/etc.)" value={note} onChangeText={setNote}
          style={{ borderWidth:1, borderColor:"#ddd", borderRadius:12, padding:10, marginBottom:16, backgroundColor:"#fff" }} />

        <PrimaryButton title="Submit for Approval" onPress={submit} />
        <Text style={{ color:"#555", marginTop:12 }}>Status: <Text style={{ fontWeight:"800" }}>Pending</Text></Text>
      </ScrollView>
    </Screen>
  );
}
