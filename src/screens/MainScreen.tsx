import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainBottomTabParamList } from "../../types";
import MapScreen from "./MapScreen";
import HomeScreen from "./Homescreen";

const BottomTab = createBottomTabNavigator<MainBottomTabParamList>();

export default function MainScreen() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
  navigation: {
    flex: 2,
    backgroundColor: "red",
  },
  body: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },

  footer: {
    flex: 1,
    backgroundColor: "cyan",
  },
});
