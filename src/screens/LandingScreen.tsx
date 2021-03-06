import React, { useState } from "react";

import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { connect } from "react-redux";
import { ON_UPDATE_LANGUAGE, UserState, ApplicationState } from "../redux";

type landingScreenProp = StackNavigationProp<RootStackParamList, "Landing">;
interface LandingProps {
  userReducer: UserState;
  ON_UPDATE_LANGUAGE: Function;
}

const _LandingScreen: React.FC<LandingProps> = () => {
  const navigation = useNavigation<landingScreenProp>();
  const [language, setLanguage] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.navigation}></View>
      <View style={styles.body}>
        <Image
          source={require("../Images/EventQuest-logos_black.png")}
          style={styles.splashIcon}
        ></Image>

        <View style={styles.flagcontainer}>
          <TouchableOpacity
            style={{ backgroundColor: language === "fi" ? "red" : "black" }}
            onPress={() => setLanguage("fi")}
          >
            <Image
              source={require("../Images/Finland-flag.jpg")}
              style={styles.flagIcon}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: language === "sv" ? "red" : "black" }}
            onPress={() => setLanguage("sv")}
          >
            <Image
              source={require("../Images/Sweden-flag.jpg")}
              style={styles.flagIcon}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: language === "zh" ? "red" : "black" }}
            onPress={() => setLanguage("zh")}
          >
            <Image
              source={require("../Images/China-flag.jpg")}
              style={styles.flagIcon}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: language === "en" ? "red" : "black" }}
            onPress={() => setLanguage("en")}
          >
            <Image
              source={require("../Images/English-flag.jpg")}
              style={styles.flagIcon}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>

      <Button
        disabled={language === ""}
        onPress={() => {
          navigation.push("LoadingScreen"), ON_UPDATE_LANGUAGE(language);
        }}
        title="Continue"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />

      <View style={styles.footer}></View>
    </View>
  );
};

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

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.UserReducer,
});

const LandingScreen = connect(mapToStateProps, { ON_UPDATE_LANGUAGE })(
  _LandingScreen
);

export default LandingScreen;
