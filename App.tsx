import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from '@/screens/LoginScreen';
import { TermsScreen } from '@/screens/TermsScreen';
import { StarshipFeedScreen } from '@/screens/StarshipFeedScreen';
import { AppNavigator, AuthNavigator } from '@/navigation/Navigator';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Appbar, Menu } from 'react-native-paper';

import { AuthProvider, useAuth } from 'Context/AuthContext';
import { Routes } from '@/navigation/Routes';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function RootNavigation() {
  const { state } = useAuth();
  return (
    <NavigationContainer>
      {state.userToken == null ? <AuthNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AuthProvider>
          <RootNavigation />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
