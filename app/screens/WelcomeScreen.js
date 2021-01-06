import React from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";

import defaultStyles from "../config/styles";

import routes from "../navigation/routes";

/**
 * The welcome screen, the screen where the users sees when starting the application.
 * @module screens/WelcomeScreen
 */

/**
 * The welcome screen functional component.
 */
// function WelcomeScreen({ navigation }) {
function WelcomeScreen({ navigation }) {
  return (
    <>
      <ImageBackground
        style={styles.background}
        source={require("../assets/background.jpg")}
      />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../assets/logo-2.png")} />
          <AppText style={styles.tagline}>Wise about warranties</AppText>
        </View>
        <View style={styles.buttonsContainer}>
          <AppButton
            icon="login"
            title="SIGN IN"
            onPress={() => navigation.navigate(routes.SIGN_IN_1)}
          />
          <AppButton
            icon="plus"
            title="REGISTER"
            color={defaultStyles.colors.secondary}
            onPress={() => navigation.navigate(routes.REGISTER_1)}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    opacity: 0.5,
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  container: {
    justifyContent: "flex-end",
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    position: "absolute",
  },
  logo: {
    width: 224,
    height: 80,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
  },
});

export default WelcomeScreen;
