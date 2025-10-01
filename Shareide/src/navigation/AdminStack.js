import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminDashboard from '../screens/Admin/DashboardScreen';
import RiderQueueScreen from '../screens/Admin/RiderQueueScreen';
import AdminSettings from '../screens/Admin/SettingsScreen';


const Stack = createNativeStackNavigator();


export default function AdminStack() {
return (
<Stack.Navigator>
<Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ title: 'Admin' }} />
<Stack.Screen name="RiderQueue" component={RiderQueueScreen} options={{ title: 'Rider Approvals' }} />
<Stack.Screen name="AdminSettings" component={AdminSettings} options={{ title: 'Config' }} />
</Stack.Navigator>
);
}