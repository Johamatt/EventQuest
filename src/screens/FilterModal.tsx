import React, { useState } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {
  ApplicationState,
  EventsState,
  Filter,
  ON_EVENT_FILTER,
  ON_UPDATE_ALL_EVENTS,
  UserState,
} from "../redux";
import { RootStackParamList } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

interface FilterProps {
  userReducer: UserState;
  eventReducer: EventsState;
  ON_UPDATE_ALL_EVENTS: Function;
  ON_EVENT_FILTER: Function;
}

type mainScreenProp = StackNavigationProp<RootStackParamList, "Main">;

export const _FilterModal: React.FC<FilterProps> = (props) => {
  const [filterOptions, setFilterOptions] = useState<Filter>({
    endDate: new Date(new Date().setHours(0, 0, 0, 0)),
    startDate: new Date(new Date().setHours(0, 0, 0, 0)),
  });

  const navigation = useNavigation<mainScreenProp>();
  const [showEnd, setShowEnd] = useState(false);
  const [showStart, setShowStart] = useState(false);

  const onStartChange = (event: any, selectedDate: any) => {
    setShowStart(false);
    setFilterOptions({ ...filterOptions, startDate: selectedDate });
  };

  const onEndChange = (event: any, selectedDate: any) => {
    setShowEnd(false);
    setFilterOptions({ ...filterOptions, endDate: selectedDate });
  };

  const showStartMode = (currentMode: any) => {
    setShowStart(true);
  };

  const showEndMode = (currentMode: any) => {
    setShowEnd(true);
  };




  return (
    <View style={styles.container}>
      <Button onPress={() => showStartMode("date")} title="Starting day" />
      {filterOptions.endDate !== undefined ? (
        <Text>
          selected Start: {moment(filterOptions.startDate).format("DD-MM-YYYY")}
        </Text>
      ) : (
        setFilterOptions({
          ...filterOptions,
          startDate: new Date(new Date().setHours(0, 0, 0, 0)),
        })
      )}
      {showStart && (
        <DateTimePicker
          minimumDate={new Date()}
          maximumDate={filterOptions.endDate}
          value={filterOptions.startDate}
          mode="date"
          display="spinner"
          is24Hour={true}
          onChange={onStartChange}
        />
      )}
      <Button onPress={() => showEndMode("date")} title="Ending day" />

      {filterOptions.endDate !== undefined ? (
        <Text>
          selected End: {moment(filterOptions.endDate).format("DD-MM-YYYY")}
        </Text>
      ) : (
        setFilterOptions({
          ...filterOptions,
          endDate: new Date(new Date().setHours(0, 0, 0, 0)),
        })
      )}
      {showEnd && (
        <DateTimePicker
          minimumDate={filterOptions.startDate}
          value={filterOptions.endDate}
          mode="date"
          display="spinner"
          is24Hour={true}
          onChange={onEndChange}
        />
      )}
      <Button onPress={() => navigation.goBack()} title="Cancel" />

      <Button   onPress={() => {navigation.push("LoadingScreen"), ON_EVENT_FILTER(filterOptions, props.eventReducer.events)}} title="next" />
    </View>
  );
};

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.UserReducer,
  eventReducer: state.EventsReducer,
});

const FilterModal = connect(mapToStateProps, {
  ON_UPDATE_ALL_EVENTS,
  ON_EVENT_FILTER,
})(_FilterModal);

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
