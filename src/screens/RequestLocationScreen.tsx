import React, {useState, useEffect, useReducer} from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";

import * as Location from 'expo-location';

const screenWidth = Dimensions.get("screen").width;

export default function RequestLocationScreen() {

    const [errorMsg, setErrorMsg] = useState("")
    const [address, setAddress] = useState()


  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <Text>Navigation</Text>
      </View>

      <View style={styles.body}>
        <Image
          source={require("../Images/EventQuest-logos_black.png")}
          style={styles.splashIcon}
        ></Image>

        <Text>Allow Location</Text>

        <View style={styles.flagcontainer}>
            <Image
              source={require("../Images/LocationPin.png")}
              style={styles.flagIcon}
            />
        </View>
      </View>

      {/* <Button
        onPress={() => navigate("HomeStack")}
        title="Continue"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      /> */}

      <View style={styles.footer}>
        <Text>Footer</Text>
      </View>
    </View>
  );
}

function Selected() {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EEE4",
  },

  flagcontainer: {
    display: "flex",

    width: screenWidth,
    flexWrap: "wrap",
    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
  },

  navigation: {
    flex: 2,
  },

  splashIcon: {
    width: 200,
    height: 200,

     top: 0,                //
     position: "absolute", //
  },

  flagIcon: {
    width: 140,
    height: 80,
    margin: 5,
  },

  body: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2EEE4",
  },

  footer: {
    flex: 1,
  },
});