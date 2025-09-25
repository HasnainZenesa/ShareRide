import React, { useState } from "react";
import { Text, Alert } from "react-native";
import Screen from "../../components/Screen";
import AppInput from "../../components/AppInput";
import PrimaryButton from "../../components/PrimaryButton";
import { colors } from "../../theme/colors";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const submit = async ()=>{
    if(!email) return Alert.alert("Error","Enter email");
    // TODO: integrate /auth/forgot
    Alert.alert("Check your email","Password reset link/OTP sent (demo).");
    navigation.goBack();
  };

  return (
    <Screen>
      <Text style={{ fontSize:22, fontWeight:"800", color:colors.text, marginBottom:10 }}>Forgot Password</Text>
      <AppInput label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <PrimaryButton title="Send reset link" onPress={submit} />
    </Screen>
  );
}
