import React, { useState, useMemo } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PassengerTabs from './src/navigation/PassengerTabs';  // Correct path
import RiderTabs from './src/navigation/RiderTabs';  // Correct path
import AdminStack from './src/navigation/AdminStack';  // Correct path
import RolePickerScreen from './src/screens/Auth/RolePickerScreen';
import HeaderLogo from './src/components/HeaderLogo';
import { useTheme } from './src/theme/ThemeProvider';

const Stack = createNativeStackNavigator();

export default function RootNav() {
  const { resolved, colors } = useTheme();
  const [role, setRole] = useState(null); // 'passenger' | 'rider' | 'admin'

  const navTheme = useMemo(() => (resolved === 'dark' ? DarkTheme : DefaultTheme), [resolved]);

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        {!role ? (
          <Stack.Screen name="RolePicker" options={{ headerTitle: () => <HeaderLogo /> }}>
            {() => <RolePickerScreen onSelectRole={setRole} />}
          </Stack.Screen>
        ) : role === 'passenger' ? (
          <Stack.Screen name="Passenger" component={PassengerTabs} options={{ headerShown: false }} />
        ) : role === 'rider' ? (
          <Stack.Screen name="Rider" component={RiderTabs} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Admin" component={AdminStack} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
