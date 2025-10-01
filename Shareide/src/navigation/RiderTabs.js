import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/Rider/DashboardScreen';
import GoOnlineScreen from '../screens/Rider/GoOnlineScreen';
import SettingsScreen from '../screens/Shared/SettingsScreen';


const Tab = createBottomTabNavigator();


export default function RiderTabs() {
return (
<Tab.Navigator initialRouteName="Dashboard">
<Tab.Screen name="Dashboard" component={DashboardScreen} />
<Tab.Screen name="Go Online" component={GoOnlineScreen} />
<Tab.Screen name="Settings" component={SettingsScreen} />
</Tab.Navigator>
);
}