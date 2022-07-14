import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";

import colors from "../../config/colors";
import routes from "../../navigation/routes";

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
      <LinearGradient
        colors={["#143C4B", "#0E262F"]}
        style={styles.background}
      />

      <View style={styles.container}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
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
            Warranty Wise and Warranty Wise Logo are trademarks of Warrantywise.
            Warrantywise Limited is a company registered in England and Wales
            No. 07963594 at The Rocket Centre, 3 Trident Way, Blackburn,
            Lancashire, BB1 3NU and is part of Wise Group Holdings Limited,
            Company No. 10613336. Terms and Conditions apply.
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
    alignSelf: "center",
    textAlign: "center",
    marginTop: 15,
  },
});

export default WelcomeScreen;
