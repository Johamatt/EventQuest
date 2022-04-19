// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";

// import LandingScreen from "./src/screens/LandingScreen";
// import HomeScreen from "./src/screens/HomeScreen";
// import RequestLocationScreen from "./src/screens/RequestLocationScreen";

// import { createAppContainer, createSwitchNavigator } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
// import { createBottomTabNavigator } from "react-navigation-tabs";

// const switchNavigator = createSwitchNavigator({


//   landingStack: {
//     screen: createStackNavigator(
//       {
//         Landing: LandingScreen,
//       },
//       {
//         defaultNavigationOptions: {
//           headerShown: false,
//         },
//       }
//     ),
    
    





//   },

//   HomeStack: createBottomTabNavigator({
//     //Home
//     Home: {
//       screen: createBottomTabNavigator({
//         HomePage: HomeScreen,
//       }),

//       navigationOptions: {
//         tabBarIcon: ({ focused, tintColor }) => {},
//       },
//     },

//     //Map
//     Map: {
//       screen: createBottomTabNavigator({
//         MapPage: HomeScreen,
//       }),

//       navigationOptions: {
//         tabBarIcon: ({ focused, tintColor }) => {},
//       },
//     },

//     //List
//     List: {
//       screen: createBottomTabNavigator({
//         ListPage: HomeScreen,
//       }),

//       navigationOptions: {
//         tabBarIcon: ({ focused, tintColor }) => {},
//       },
//     },

//     // //Todo myöhemmin?
//     // Account: {
//     //   screen: createBottomTabNavigator({
//     //     HomePage: HomeScreen,
//     //   }),

//     //   navigationOptions: {
//     //     tabBarIcon: ({ focused, tintColor }) => {},
//     //   },
//     // },

//   }),
// });


// const AppNavigation = createAppContainer(switchNavigator);

// export default function App() {
//   return <AppNavigation />;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });


import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './src/screens/MainScreen'
import LandingScreen from './src/screens/LandingScreen';
import {RootStackParamList} from './types';

import RequestLocationScreen from './src/screens/RequestLocationScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="RequestLocation" component={RequestLocationScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}