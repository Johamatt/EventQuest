import React, { useState } from "react";
import { View, StyleSheet, Button,Text} from "react-native";
import Slider from "@react-native-community/slider";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function FilterModal({ navigation }: { navigation: any }) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event:any, selectedDate:any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode:any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View style={styles.container}>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={15}
        minimumTrackTintColor="#EEEEEE"
        maximumTrackTintColor="#000000"
      />
       <Button onPress={showDatepicker} title="Show date picker!" />
       <Text>selected: {date.toLocaleString()}</Text>
       {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}

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
