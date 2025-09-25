import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChatsList, ChatThread } from "../screens/passenger/ChatsScreen";

const Stack = createNativeStackNavigator();

export default function ChatsStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChatsList" component={ChatsList} options={{ title:"Chats" }} />
      <Stack.Screen name="ChatThread" component={ChatThread} options={({ route })=> ({ title: route?.params?.name || "Chat" })} />
    </Stack.Navigator>
  );
}
