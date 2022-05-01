import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MainBottomTabParamList } from "../../types";
import { useNavigation } from "@react-navigation/native";

import { ApplicationState, EventsState } from "../redux";
import { connect } from "react-redux";
import {
  ON_UPDATE_LOCATION,
  ON_UPDATE_LANGUAGE,
  ON_UPDATE_ALL_EVENTS,
  UserState,
} from "../redux";

interface MapProps {
  userReducer: UserState;
  eventReducer: EventsState;
  ON_UPDATE_ALL_EVENTS: Function;
}
type mainScreenProp = StackNavigationProp<RootStackParamList, "Main">;

export const _MapScreen: React.FC<MapProps> = (props) => {
  const { location, language } = props.userReducer;
  const events = props.eventReducer
  const navigation = useNavigation<mainScreenProp>();



  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          longitudeDelta: 0.0421,
          latitudeDelta: 0.0922,
        }}
        style={styles.map}
      >

      


</MapView>

    
    </View>
  );
};

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.UserReducer,
  eventReducer: state.EventsReducer,
});

const MapScreen = connect(mapToStateProps, { ON_UPDATE_ALL_EVENTS })(_MapScreen);

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
