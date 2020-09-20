import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './SplashScreen';
import Map from './Map'
import Settings from './Settings'

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStackScreen=()=>{
    return(
      <NavigationContainer>
      <AuthStack.Navigator screenOptions={{headerShown:false}}
      initialRouteName="SplashScreen">
        <AuthStack.Screen name="SplashScreen" component={SplashScreen}/>
        <AuthStack.Screen name="TabBar" component={Navigation} />
      </AuthStack.Navigator>
      </NavigationContainer>
   )
  }

const Navigation=()=>{
    return (
        <Tab.Navigator
          initialRouteName="MapView"
          tabBarOptions={{
            activeTintColor:"#000",
            inactiveTintColor:"#708090"
          }}
        >
          <Tab.Screen
            name="MapView"
            component={Map}
            options={{
              tabBarLabel: 'Map',

            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarLabel: 'Settings',
            }}
          />
        </Tab.Navigator>
      );
}
export default AuthStackScreen;