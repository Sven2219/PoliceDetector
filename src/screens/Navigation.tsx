import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from './SplashScreen';
import Detector from './Detector'

const AuthStack = createStackNavigator();

const AuthStackScreen = (): JSX.Element => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}
        initialRouteName="SplashScreen">
        <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
        <AuthStack.Screen name="Detector" component={Detector} />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}
export default AuthStackScreen;