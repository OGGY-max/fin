import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

import SplashScreenComponent from './screens/SplashScreen';
import AuthScreen from './screens/AuthScreen';
import MainNavigator from './navigation/MainNavigator';
import AgentProfileScreen from './screens/AgentProfileScreen';
import VerificationRequestScreen from './screens/VerificationRequestScreen';
import VerificationReportScreen from './screens/VerificationReportScreen';
import { RootStackParamList } from './types';
import { theme } from './constants/theme';

const Stack = createStackNavigator<RootStackParamList>();

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate app initialization
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, automatically authenticate after splash
      setIsAuthenticated(true);
      SplashScreen.hideAsync();
    }, 3000);
  }, []);

  if (isLoading) {
    return <SplashScreenComponent />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!isAuthenticated ? (
            <Stack.Screen name="Auth" component={AuthScreen} />
          ) : (
            <>
              <Stack.Screen name="Main" component={MainNavigator} />
              <Stack.Screen 
                name="AgentProfile" 
                component={AgentProfileScreen}
                options={{ 
                  headerShown: true, 
                  title: 'Agent Profile',
                  headerStyle: {
                    backgroundColor: theme.colors.primary,
                  },
                  headerTintColor: theme.colors.white,
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
              <Stack.Screen 
                name="VerificationRequest" 
                component={VerificationRequestScreen}
                options={{ 
                  headerShown: true, 
                  title: 'Request Verification',
                  headerStyle: {
                    backgroundColor: theme.colors.primary,
                  },
                  headerTintColor: theme.colors.white,
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
              <Stack.Screen 
                name="VerificationReport" 
                component={VerificationReportScreen}
                options={{ 
                  headerShown: true, 
                  title: 'Verification Report',
                  headerStyle: {
                    backgroundColor: theme.colors.primary,
                  },
                  headerTintColor: theme.colors.white,
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
