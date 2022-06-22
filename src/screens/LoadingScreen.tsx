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
  const [errorMsg, setErrorMsg] = useState("");
  const [location, setLocation] = useState<Location.LocationGeocodedLocation>();

  const { ON_UPDATE_LOCATION, ON_UPDATE_ALL_EVENTS } = props;

  useEffect(() => {
    (async () => {
      if (
        props.userReducer.location.latitude === undefined ||
        props.userReducer.location.longitude === undefined
      ) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        let location: any = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
        await ON_UPDATE_LOCATION(location.coords);
      }

      if (props.eventReducer === undefined) {
        await ON_UPDATE_ALL_EVENTS();
      }


      setTimeout(() => {
        navigation.navigate("Main");
      }, 2000);
    })();
  }, []);

  let text = "Waiting for location permission..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = "Loading...";
  }

  return (
    <View style={styles.container}>
      <View style={styles.navigation}></View>
      <View style={styles.body}>
        <Image
          source={require("../Images/EventQuest-logos_black.png")}
          style={styles.splashIcon}
        ></Image>
        <Text> {text}</Text>
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
