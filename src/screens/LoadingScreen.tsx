import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import * as Location from "expo-location";
import { connect } from "react-redux";
import {
  ON_UPDATE_LOCATION,
  ON_UPDATE_LANGUAGE,
  ON_UPDATE_ALL_EVENTS,
  UserState,
  ApplicationState,
  EventsState,
  ON_EVENT_FILTER,
} from "../redux";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type LoadingScreenProp = StackNavigationProp<
  RootStackParamList,
  "LoadingScreen"
>;

interface LoadingProps {
  userReducer: UserState;
  eventReducer: EventsState;
  ON_UPDATE_LOCATION: Function;
  ON_UPDATE_ALL_EVENTS: Function;
}

const _LoadingScreen: React.FC<LoadingProps> = (props) => {

  const navigation = useNavigation<LoadingScreenProp>();
  const { ON_UPDATE_LOCATION, ON_UPDATE_ALL_EVENTS } = props;
  const [infoText, setInfoText] = useState("")

  useEffect(() => {
    (async () => {
      if (props.userReducer.location.latitude === undefined) {
        setInfoText("Waiting for location permission..")
        locationRequest();
      }

      if (props.eventReducer === undefined) {
        setInfoText("Loading...")
        await ON_UPDATE_ALL_EVENTS();
      }

      setTimeout(() => {
        navigation.navigate("Main");
      }, 1200);
    })();
  }, []);



  async function locationRequest() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setInfoText("Permission to access location was denied");
      return;
    }
    let location: any = await Location.getCurrentPositionAsync({});
    await ON_UPDATE_LOCATION(location.coords);
  }




  return (
    <View style={styles.container}>
      <View style={styles.navigation}></View>
      <View style={styles.body}>
        <Image
          source={require("../Images/EventQuest-logos_black.png")}
          style={styles.splashIcon}
        ></Image>
        <Text> {infoText}</Text>
        <View style={styles.flagcontainer}></View>
      </View>
      <View style={styles.footer}></View>
    </View>
  );
};

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.UserReducer,
});

const LoadingScreen = connect(mapToStateProps, {
  ON_UPDATE_LANGUAGE,
  ON_UPDATE_ALL_EVENTS,
  ON_UPDATE_LOCATION,
})(_LoadingScreen);

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EEE4",
  },

  flagcontainer: {
    display: "flex",

    width: Dimensions.get("screen").width,
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
    top: 0, 
    position: "absolute", 
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
