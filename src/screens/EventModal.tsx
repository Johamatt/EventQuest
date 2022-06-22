import moment from "moment";
import React from "react";
import { View, StyleSheet, Button, Text, Image } from "react-native";
import { Event } from "../redux";

export default function EventModal({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const event: Event = route.params.event;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {event.description.images.length > 0 ? (
        <Image
          style={styles.logo}
          source={{
            uri: event.description.images[0].url,
          }}
        />
      ) : (
        <View />
      )}
      <Text style={{ fontSize: 30 }}>{event.name.fi}</Text>

      <Text style={{ fontSize: 25 }}>
        {moment(event.event_dates.starting_day).format("HH:mm")} -{" "}
        {moment(event.event_dates.ending_day).format("HH:mm")}
      </Text>

      <Text style={{ fontSize: 12 }}>
        {moment(event.event_dates.starting_day).format("DD-MM-YYYY")} -{" "}
        {moment(event.event_dates.ending_day).format("DD-MM-YYYY")}
      </Text>

      <Text style={{ fontSize: 15 }}>{event.description.intro}</Text>

      <Button onPress={() => navigation.goBack()} title="Dismiss" />
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
  logo: {
    width: 166,
    height: 158,
  },
});
