import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '@/context/AuthContext';
import LoginScreen from '@/screens/LoginScreen';
import RegisterScreen from '@/screens/RegisterScreen';
import ServicesScreen from '@/screens/ServicesScreen';
import MyServicesScreen from '@/screens/MyServicesScreen';
import CreateServiceScreen from '@/screens/CreateServiceScreen';
import HistoryScreen from '@/screens/HistoryScreen';
import HomeScreen from '@/screens/HomeScreen';

const Stack = createStackNavigator();

export function AuthStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export function TabStackNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Service Booking' }}
      />
      <Stack.Screen
        name="Services"
        component={ServicesScreen}
        options={{ title: 'Available Services' }}
      />
      {user?.role === 'SERVICE_PROVIDER' && (
        <>
          <Stack.Screen
            name="MyServices"
            component={MyServicesScreen}
            options={{ title: 'My Services' }}
          />
          <Stack.Screen
            name="CreateService"
            component={CreateServiceScreen}
            options={{ title: 'Create Service' }}
          />
        </>
      )}
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: 'History' }}
      />
    </Stack.Navigator>
  );
}
