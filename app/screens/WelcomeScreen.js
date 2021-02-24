import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";

import colors from "../config/colors";

import routes from "../navigation/routes";

/**
 * The welcome screen, the screen where the users sees when starting the application.
 * @module screens/WelcomeScreen
 */

/**
 * The welcome screen functional component.
 */
function WelcomeScreen({ navigation }) {
  return (
    <>
      <View style={styles.background}>
        <LinearGradient
          colors={["#143C4B", "#0E262F"]}
          style={styles.linearGradient}
        />
      </View>

      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <View style={styles.buttonsContainer}>
          <AppButton
            title="Sign in"
            onPress={() => navigation.navigate(routes.SIGN_IN)}
          />
          <AppButton
            title="Register"
            backgroundColor={null}
            onPress={() => navigation.navigate(routes.REGISTER_1)}
          />
          <AppText style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et elit
            hendrerit, vulputate libero ut, blandit libero. Vestibulum quis
            tincidunt dui, sollicitudin porttitor dui. Aliquam id augue eget dui
            iaculis rhoncus quis vitae sem. Pellentesque vestibulum consectetur
            nisl vel faucibus.
          </AppText>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  linearGradient: {
    flex: 1,
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  container: {
    justifyContent: "flex-end",
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: "60%",
    height: "100%",
    resizeMode: "contain",
    alignSelf: "center",
    position: "absolute",
  },
  text: {
    fontSize: 8,
    color: colors.lightGrey,
    marginTop: 15,
  },
});

export default WelcomeScreen;
