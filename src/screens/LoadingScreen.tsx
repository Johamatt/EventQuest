import React, { useState, useEffect, useReducer } from "react";

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

import * as Location from "expo-location";

import { connect } from "react-redux";
import { ON_UPDATE_LOCATION, ON_UPDATE_LANGUAGE, ON_UPDATE_EVENT, UserState, ApplicationState } from "../redux";

const screenWidth = Dimensions.get("screen").width;

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type LoadingScreenProp = StackNavigationProp<
  RootStackParamList,
  "LoadingScreen"
>;

interface LoadingProps {
  userReducer: UserState,
  ON_UPDATE_LOCATION: Function,
  ON_UPDATE_EVENT: Function
  
}

const _LoadingScreen: React.FC<LoadingProps> = (props) => {
  const navigation = useNavigation<LoadingScreenProp>();
  const [errorMsg, setErrorMsg] = useState("");
  const [location, setLocation] = useState<Location.LocationGeocodedLocation>();

  const {userReducer, ON_UPDATE_LOCATION, ON_UPDATE_EVENT} = props

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location: any = await Location.getCurrentPositionAsync({});
      setLocation(location);


      ON_UPDATE_LOCATION(location)

      await ON_UPDATE_EVENT()


      //       open-api.myhelsinki.fi/v1/events/



      setTimeout(() => {
        navigation.navigate("Main");
      }, 2000);
    })();
  }, []);

  

  let text = "Waiting for location permission..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = "Welcome!";
  }


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

        <Text> {text}</Text>

        <View style={styles.flagcontainer}>
          <Image
            source={require("../Images/LocationPin.png")}
            style={styles.flagIcon}
          />
        </View>
      </View>

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

    top: 0, //
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

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.UserReducer
})

const LoadingScreen = connect(mapToStateProps, {ON_UPDATE_LANGUAGE, ON_UPDATE_EVENT, ON_UPDATE_LOCATION})(_LoadingScreen)

export default LoadingScreen