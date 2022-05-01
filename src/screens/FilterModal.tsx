import React, { useState } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import Slider from "@react-native-community/slider";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { FilterConditions } from "../redux";

export default function FilterModal({ navigation }: { navigation: any }) {
  const [startDate, setStartDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [showStart, setShowStart] = useState(false);

  const [endDate, setEndDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [showEnd, setShowEnd] = useState(false);

  const onStartChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShowStart(false);
    setStartDate(currentDate);
  };

  const showStartMode = (currentMode: any) => {
    setShowStart(true);
  };

  const showStartDatepicker = () => {
    showStartMode("date");
  };

  const onEndChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShowEnd(false);
    setEndDate(currentDate);
  };

  const showEndMode = (currentMode: any) => {
    setShowEnd(true);
  };

  const showEndDatepicker = () => {
    showEndMode("date");
  };

  return (
    <View style={styles.container}>

      {/* <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={15}
        minimumTrackTintColor="#EEEEEE"
        maximumTrackTintColor="#000000"
      /> */}
      <Button onPress={showStartDatepicker} title="Starting day" />
      {startDate !== undefined ? (
        <Text>selected Start: {moment(startDate).format("DD-MM-YYYY")}</Text>
      ) : (
        setStartDate(new Date(new Date().setHours(0, 0, 0, 0)))
      )}
      {showStart && (
        <DateTimePicker

          minimumDate={new Date()}
          value={startDate}
          mode="date"
          display="spinner"
          is24Hour={true}
          onChange={onStartChange}
        />
      )}
      <Text/>
      <Text/>
      <Button onPress={showEndDatepicker} title="Ending day" />
      
      {endDate !== undefined ? (
        <Text>selected End: {moment(endDate).format("DD-MM-YYYY")}</Text>
      ) : (
        setEndDate(new Date(new Date().setHours(0, 0, 0, 0)))
      )}
      {showEnd && (
        <DateTimePicker
       
          minimumDate={startDate}
          value={endDate}
          mode="date"
          display="spinner"
          is24Hour={true}
          onChange={onEndChange}
        />
      )}



      <Button onPress={() => navigation.goBack()} title="cancel"/>

      {/* <Button onPress={navigation.push("LoadingScreen"), ON_UPDATE_LANGUAGE(language)} title="next"/> */}





    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
