import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { ApplicationState, EventsState,} from "../redux";
import { connect } from "react-redux";
import { UserState } from "../redux";

import moment from "moment";
import { Event } from "../redux/models";

interface HomeProps {
  userReducer: UserState;
  eventReducer: EventsState;
}

type mainScreenProp = StackNavigationProp<RootStackParamList, "Main">;
export const _HomeScreen: React.FC<HomeProps> = (props) => {


  useEffect(() => {
    console.log(props.eventReducer.filteredEvents)   
  }, []);

  const navigation = useNavigation<mainScreenProp>();

  let events: Array<Event> = props.eventReducer.events.sort((
    (objA:any, objB:any) => objA.event_dates.starting_day < objB.event_dates.starting_day ? -1 : 1
  ))


  const Item = ({ eventInfo }: { eventInfo: Event }) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EventModal", { event: eventInfo });
        }}
      >
        <Text style={styles.date}>
          {moment(eventInfo.event_dates.starting_day).format(
            "DD-MM-YYYY || HH:mm"
          )}
        </Text>
        <Text style={styles.title}> {eventInfo.name.fi}</Text>
        {/* fi,en,sv,zh? : ( )           ^     */}
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }: { item: Event }) => <Item eventInfo={item} />;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("FilterModal");
        }}
      >
        <Text>Filter list</Text>
        <AntDesign name="filter" size={32} color="black" />
      </TouchableOpacity>

      {/* <Text>Home Screen{JSON.stringify(location)}</Text>
      <Text>{language}</Text> */}
      <FlatList<Event>
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.UserReducer,
  eventReducer: state.EventsReducer,
});

const HomeScreen = connect(mapToStateProps)(_HomeScreen);

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  date: {
    fontSize: 10,
  },
});
