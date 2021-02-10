import React from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
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
      <ImageBackground
        style={styles.background}
        source={require("../assets/Splash-Screen-High-Res.png")}
      />
      {/* <LinearGradient
        colors={["#143C4B", "#0E262F"]}
        style={styles.background}
      /> */}
      <View style={styles.container}>
        {/* <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
          <AppText style={styles.tagline}>Wise about warranties</AppText>
        </View> */}
        <View style={styles.buttonsContainer}>
          <AppButton
            title="Sign in"
            onPress={() => navigation.navigate(routes.SIGN_IN_1)}
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
    flex: 1,
    resizeMode: "cover",
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
  // logo: {
  //   width: 224,
  //   height: 80,
  // },
  // logoContainer: {
  //   position: "absolute",
  //   top: 70,
  //   alignItems: "center",
  // },
  tagline: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  text: {
    fontSize: 6,
    color: colors.mediumGrey,
    marginVertical: 15,
  },
});

export default WelcomeScreen;
