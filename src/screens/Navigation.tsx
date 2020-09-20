import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import SplashScreen from './SplashScreen';
import Detector from './Detector'
import Settings from './Settings'

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStackScreen = (): JSX.Element => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}
        initialRouteName="SplashScreen">
        <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
        <AuthStack.Screen name="TabBar" component={Navigation} />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}

const Navigation = (): JSX.Element => {
  return (
    <Tab.Navigator
      initialRouteName="Detector"
      tabBarOptions={{
        activeTintColor: "#000",
        inactiveTintColor: "#708090"
      }}
    >
      <Tab.Screen
        name="Detector"
        component={Detector}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map-marker-outline" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
export default AuthStackScreen;