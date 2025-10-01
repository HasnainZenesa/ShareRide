import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Passenger/HomeScreen';
import MapScreen from '../screens/Passenger/MapScreen';
import SubscriptionScreen from '../screens/Passenger/SubscriptionScreen';
import SettingsScreen from '../screens/Shared/SettingsScreen';


const Tab = createBottomTabNavigator();


export default function PassengerTabs() {
return (
<Tab.Navigator initialRouteName="Home">
<Tab.Screen name="Home" component={HomeScreen} />
<Tab.Screen name="Map" component={MapScreen} />
<Tab.Screen name="Subscribe" component={SubscriptionScreen} />
<Tab.Screen name="Settings" component={SettingsScreen} />
</Tab.Navigator>
);
}