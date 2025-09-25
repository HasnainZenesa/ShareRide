import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/passenger/HomeScreen";
import SuggestionsScreen from "../screens/passenger/SuggestionsScreen";
import RiderProfileScreen from "../screens/passenger/RiderProfileScreen";
import NavBar from "../components/NavBar";

const Stack = createNativeStackNavigator();

export default function HomeStack(){
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <NavBar onSearch={()=>{}} onMenu={()=>{}} />,
        headerTitleAlign: "left",
        headerLeft: () => null,   // iOS default back-space remove
        headerRight: () => null,
        headerStyle: { backgroundColor: "#fff" },
        contentStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Matches" component={SuggestionsScreen} options={{ title:"Matches" }} />
      <Stack.Screen name="RiderProfile" component={RiderProfileScreen} options={{ title:"Rider" }} />
    </Stack.Navigator>
  );
}
