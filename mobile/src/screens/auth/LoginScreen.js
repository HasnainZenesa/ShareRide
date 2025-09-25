import React, { useState } from "react";
import { Text, Pressable, Alert, View } from "react-native";
import Screen from "../../components/Screen";
import AppInput from "../../components/AppInput";
import PrimaryButton from "../../components/PrimaryButton";
import Segment from "../../components/Segment";
import { colors } from "../../theme/colors";

export default function LoginScreen({ navigation }) {
  const [mode, setMode] = useState("email"); // email | phone
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");

  const login = ()=>{
    if(mode==="email"){
      if(!email || !pass) return Alert.alert("Error","Email & password required");
    }else{
      if(!phone) return Alert.alert("Error","Phone required");
    }
    navigation.replace("MainTabs");
  };

  return (
    <Screen>
      <Text style={{ fontSize: 22, fontWeight: "800", color: "#111", marginBottom: 10 }}>Login</Text>
      <Segment value={mode} onChange={setMode} options={[{label:"Email", value:"email"}, {label:"Phone", value:"phone"}]} />

      {mode==="email" ? (
        <View style={{ marginTop:12 }}>
          <AppInput label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <AppInput label="Password" placeholder="Enter password" value={pass} onChangeText={setPass} secure />
        </View>
      ) : (
        <View style={{ marginTop:12 }}>
          <AppInput label="Phone" placeholder="+92XXXXXXXXXX" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        </View>
      )}

      <PrimaryButton title="Continue" onPress={login} style={{ marginTop:4 }} />
      <Pressable onPress={() => navigation.navigate("Forgot")} style={{ alignSelf: "center", marginTop: 14 }}>
        <Text style={{ color: "#111", fontWeight: "600" }}>Forgot Password?</Text>
      </Pressable>

      {/* Google placeholder */}
      <View style={{ marginTop:18, alignItems:"center" }}>
        <Pressable style={{ paddingVertical:12, paddingHorizontal:16, borderRadius:12, borderWidth:1, borderColor:"#eee", backgroundColor:"#fff" }}>
          <Text style={{ fontWeight:"700" }}>Continue with Google</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
