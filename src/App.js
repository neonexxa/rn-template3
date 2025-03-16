// In App.js in a new project

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import BottomTabs from './BottomNavigation';
import LoginScreen from './screens/login';

const Stack = createNativeStackNavigator();
function RootStack({ user }) {
  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <RootStack user={user} />
    </NavigationContainer>
  );
}
