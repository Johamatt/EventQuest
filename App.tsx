import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./src/screens/MainScreen";
import LandingScreen from "./src/screens/LandingScreen";
import { RootStackParamList } from "./types";
import LoadingScreen from "./src/screens/LoadingScreen";

import { store } from "./src/redux/store";
import { Provider } from "react-redux";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="LoadingScreen"
            component={LoadingScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
