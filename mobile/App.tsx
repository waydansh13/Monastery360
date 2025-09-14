import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import MonasteriesScreen from './src/screens/MonasteriesScreen';
import VirtualToursScreen from './src/screens/VirtualToursScreen';
import ARScreen from './src/screens/ARScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MonasteryDetailScreen from './src/screens/MonasteryDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Monasteries
function MonasteriesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MonasteriesList" 
        component={MonasteriesScreen}
        options={{ title: 'Monasteries' }}
      />
      <Stack.Screen 
        name="MonasteryDetail" 
        component={MonasteryDetailScreen}
        options={{ title: 'Monastery Details' }}
      />
    </Stack.Navigator>
  );
}

// Stack Navigator for Virtual Tours
function VirtualToursStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="VirtualToursList" 
        component={VirtualToursScreen}
        options={{ title: 'Virtual Tours' }}
      />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Monasteries') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'VirtualTours') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'AR') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        },
        headerStyle: {
          backgroundColor: '#3B82F6',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Sikkim Heritage' }}
      />
      <Tab.Screen 
        name="Monasteries" 
        component={MonasteriesStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="VirtualTours" 
        component={VirtualToursStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="AR" 
        component={ARScreen}
        options={{ title: 'AR Experience' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <MainTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});