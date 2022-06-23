import * as React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";

import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MainBottomTabParamList } from "../../types";
import { useNavigation } from "@react-navigation/native";

import Slider from "@react-native-community/slider";

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
  const events = props.eventReducer.events;
  const navigation = useNavigation<mainScreenProp>();

  React.useEffect(() => {}, []);
let check = 0;
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 60.192059, // location.latitude
          longitude: 24.945831, // location.longitude
          longitudeDelta: 0.0421,
          latitudeDelta: 0.0922,
        }}
        style={styles.map}
      >

        {events.map((event: any) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.location.lat,
              longitude: event.location.lon,
            }}
            title={event.name.fi}
          >

            <Callout

              onPress={() => {
                navigation.navigate("EventModal", { event: event });
              }}
            >
              <View>
                <Text>{event.name.fi}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};



const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.UserReducer,
  eventReducer: state.EventsReducer,
});

const MapScreen = connect(mapToStateProps, { ON_UPDATE_ALL_EVENTS })(
  _MapScreen
);

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

  topbar: {
    height: Dimensions.get("window").height / 5,
    backgroundColor: "blue",
  },
});
