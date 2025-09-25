import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import ChatsStack from "./ChatsStack";
import WalletScreen from "../screens/passenger/WalletScreen";
import ProfileScreen from "../screens/common/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator();

export default function MainTabs(){
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle:{ backgroundColor: colors.primary },
        headerTitleStyle:{ color:"#111", fontWeight:"800" },
        headerTintColor:"#111",
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarStyle:{ borderTopColor: "#eee" },
        tabBarIcon: ({ color, size }) => {
          const map = {
            HomeTab: "home-outline",
            ChatsTab: "chatbubble-ellipses-outline",
            Wallet: "wallet-outline",
            Profile: "person-circle-outline",
          };
          return <Ionicons name={map[route.name] || "ellipse-outline"} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title:"ShareRide" }} />
      <Tab.Screen name="ChatsTab" component={ChatsStack} options={{ title:"Chats" }} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
