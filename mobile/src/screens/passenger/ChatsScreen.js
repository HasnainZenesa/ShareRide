import React, { useLayoutEffect, useState } from "react";
import { View, Text, Image, FlatList, Pressable, TextInput, KeyboardAvoidingView, Platform, Linking, Alert } from "react-native";
import Screen from "../../components/Screen";
import { colors } from "../../theme/colors";
import { chats, messages } from "../../data/mock";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";

export function ChatsList({ navigation }){
  return (
    <Screen>
      <FlatList
        data={chats}
        keyExtractor={it=>it.id}
        ItemSeparatorComponent={()=> <View style={{ height:12 }} /> }
        renderItem={({ item })=>(
          <Pressable onPress={()=> navigation.navigate("ChatThread", { id:item.id, name:item.name, phone:"+923001234567" }) }
            style={{ backgroundColor:"#fff", borderRadius:16, padding:12, borderWidth:1, borderColor:colors.border, flexDirection:"row", gap:12, alignItems:"center" }}>
            <Image source={{ uri:item.avatar }} style={{ width:48, height:48, borderRadius:12 }} />
            <View style={{ flex:1 }}>
              <Text style={{ fontWeight:"800" }}>{item.name}</Text>
              <Text style={{ color:"#555", marginTop:2 }}>{item.last}</Text>
            </View>
          </Pressable>
        )}
      />
    </Screen>
  );
}

export function ChatThread({ route, navigation }){
  const id = route?.params?.id;
  const name = route?.params?.name;
  const phone = route?.params?.phone;
  const data = messages[id] || [];
  const [text, setText] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name || "Chat",
      headerRight: () => (
        <View style={{ flexDirection:"row", gap:16 }}>
          <Pressable onPress={() => Linking.openURL(`tel:${phone}`)}>
            <Ionicons name="call-outline" size={22} color="#111" />
          </Pressable>
          <Pressable onPress={async () => {
            try{
              const res = await DocumentPicker.getDocumentAsync({ multiple: false });
              if(res?.assets?.length){
                Alert.alert("Attached", res.assets[0].name);
              }
            }catch(e){ /* ignore */ }
          }}>
            <Ionicons name="attach-outline" size={22} color="#111" />
          </Pressable>
        </View>
      ),
    });
  }, [navigation, name, phone]);

  const send = ()=>{
    if(!text.trim()) return;
    data.push({ id: String(Math.random()), me:true, text, at:"now" });
    setText("");
  };

  return (
    <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.OS==="ios"?"padding":undefined}>
      <Screen>
        <View style={{ flex:1 }}>
          {data.map(m=>(
            <View key={m.id} style={{ alignSelf: m.me?"flex-end":"flex-start", backgroundColor: m.me?"#FFF2A6":"#fff", borderRadius:12, padding:10, marginBottom:8, maxWidth:"80%", borderWidth:1, borderColor:colors.border }}>
              <Text style={{ color:"#111" }}>{m.text}</Text>
              <Text style={{ color:"#777", fontSize:11, marginTop:4, textAlign:"right" }}>{m.at}</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection:"row", gap:8, alignItems:"center" }}>
          <TextInput placeholder="Type message…" value={text} onChangeText={setText}
            style={{ flex:1, borderWidth:1, borderColor:colors.border, borderRadius:12, padding:10, backgroundColor:"#fff" }} />
          <Pressable onPress={send} style={{ backgroundColor:colors.primary, paddingVertical:12, paddingHorizontal:16, borderRadius:12 }}>
            <Text style={{ fontWeight:"800", color:"#111" }}>Send</Text>
          </Pressable>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
}
