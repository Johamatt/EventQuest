import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MainBottomTabParamList } from "../../types";
import { ApplicationState, EventsState } from "../redux";
import { connect } from "react-redux";
import {
  ON_UPDATE_LOCATION,
  ON_UPDATE_LANGUAGE,
  ON_UPDATE_ALL_EVENTS,
  UserState,
} from "../redux";

import moment from "moment";
import { Event } from "../redux/models";

interface HomeProps {
  userReducer: UserState;
  eventReducer: EventsState;
  ON_UPDATE_ALL_EVENTS: Function;
}
type mainScreenProp = StackNavigationProp<RootStackParamList, 'Main'>;


export const _HomeScreen: React.FC<HomeProps> = (props) => {
  const { location, language } = props.userReducer;
  const navigation = useNavigation<mainScreenProp>();

  
  let events: Array<Event> = props.eventReducer.events.sort(
    (
      a: { event_dates: { starting_day: string } },
      b: { event_dates: { starting_day: string } }
    ) => (a.event_dates.starting_day < b.event_dates.starting_day ? -1 : 1)
  )


  const Item = ({ eventInfo }: { eventInfo: Event }) => (
    <View style={styles.item}>
        <TouchableOpacity onPress={() => {navigation.navigate("EventModal", {event: eventInfo})}}>   
        <Text style={styles.date}>{moment(eventInfo.event_dates.starting_day).format("DD-MM-YYYY || HH:mm")}
        
        </Text>
        <Text style={styles.title}> {eventInfo.name.fi}</Text>
        {/* fi,en,sv,zh? : ( )           ^     */}
      </TouchableOpacity>
      
    </View>
  );

  const renderItem = ({ item }: { item: Event }) => <Item eventInfo={item} />;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={() =>{navigation.navigate("FilterModal")}}>
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

const HomeScreen = connect(mapToStateProps, { ON_UPDATE_ALL_EVENTS })(_HomeScreen);

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
