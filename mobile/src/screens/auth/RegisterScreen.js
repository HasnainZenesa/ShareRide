import React, { useMemo, useState } from "react";
import { Text, Alert, View, Pressable } from "react-native";
import Screen from "../../components/Screen";
import AppInput from "../../components/AppInput";
import PrimaryButton from "../../components/PrimaryButton";
import StrengthBar from "../../components/StrengthBar";

function scorePassword(p=""){
  let s = 0;
  if(p.length>=6) s++;
  if(/[A-Z]/.test(p)) s++;
  if(/[0-9]/.test(p)) s++;
  if(/[^a-zA-Z0-9]/.test(p)) s++;
  return Math.min(s,4);
}

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);

  const s = useMemo(()=> scorePassword(pass), [pass]);

  const onRegister = ()=>{
    if(!name || !email || !pass) return Alert.alert("Error","All fields required");
    if(pass !== confirm) return Alert.alert("Error","Passwords do not match");
    if(!agree) return Alert.alert("Terms","Please accept Terms & Privacy");
    navigation.replace("MainTabs");
  };

  return (
    <Screen>
      <Text style={{ fontSize: 22, fontWeight: "800", color: "#111", marginBottom: 10 }}>Create account</Text>
      <AppInput label="Full name" placeholder="Your name" value={name} onChangeText={setName} autoCapitalize="words" />
      <AppInput label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <AppInput label="Password" placeholder="Create password" value={pass} onChangeText={setPass} secure />
      <StrengthBar score={s} />
      <AppInput label="Confirm password" placeholder="Re-enter password" value={confirm} onChangeText={setConfirm} secure />

      <Pressable onPress={()=> setAgree(!agree)} style={{ flexDirection:"row", alignItems:"center", marginBottom:12, gap:8 }}>
        <View style={{ width:18, height:18, borderRadius:4, borderWidth:1, borderColor:"#999", backgroundColor: agree ? "#FFD600" : "transparent" }} />
        <Text>I agree to Terms & Privacy</Text>
      </Pressable>

      <PrimaryButton title="Create account" onPress={onRegister} />
    </Screen>
  );
}
