import React, {useState, useEffect, useReducer} from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";

import * as Location from 'expo-location';

const screenWidth = Dimensions.get("screen").width;


import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types'






type RequestLocationScreenScreenProp = StackNavigationProp<RootStackParamList, 'RequestLocation'>;




export default function RequestLocationScreen() {

    const navigation = useNavigation<RequestLocationScreenScreenProp>();
    const [errorMsg, setErrorMsg] = useState("")
    const [location, setLocation] = useState<Location.LocationGeocodedLocation>();

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location: any = await Location.getCurrentPositionAsync({});
          setLocation(location);
          
          setTimeout(() => {
            navigation.navigate('Main')
          }, 2000)        
        })();
      }, []);


      let text = 'Waiting for location permission..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = "Welcome!";
      }

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <Text>Navigation</Text>
      </View>

      <View style={styles.body}>
        <Image
          source={require("../Images/EventQuest-logos_black.png")}
          style={styles.splashIcon}
        ></Image>

        <Text> {text}</Text>


        <View style={styles.flagcontainer}>
            <Image
              source={require("../Images/LocationPin.png")}
              style={styles.flagIcon}
            />
        </View>
      </View>







      <View style={styles.footer}>
        <Text>Footer</Text>
      </View>
    </View>
  );
}

function Selected() {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EEE4",
  },

  flagcontainer: {
    display: "flex",

    width: screenWidth,
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

     top: 0,                //
     position: "absolute", //
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