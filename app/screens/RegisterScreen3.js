import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

import defaultStyles from "../config/styles";
import routes from "../navigation/routes";

/**
 * The register screen, allowing user to input their details for registrating a new account
 * and handling the registration operation based on the user input.
 * @module screens/RegisterScreen
 */

/**
 * The register screen 3 functional component
 */
function RegisterScreen({ navigation }) {
  return (
    <>
      <ImageBackground
        style={styles.background}
        source={require("../assets/background.jpg")}
      />
      <View style={styles.container}>
        <Screen style={styles.screen}>
          <ScrollView>
            <Image
              style={styles.logo}
              source={require("../assets/logo-2.png")}
            />
            <AppText style={styles.tagline}>Register</AppText>
            <AppText style={styles.message}>
              THANK YOU FOR REGISTERING, BEFORE YOU CAN LOGIN YOUR ACCOUNT WILL
              NEED TO BE A APPROVED BY A MEMBER OF THE WISE TEAM.
            </AppText>
            <AppButton
              icon="login"
              title="SIGN IN"
              onPress={() => navigation.navigate(routes.SIGN_IN_1)}
            />
          </ScrollView>
        </Screen>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    opacity: 0.3,
  },
  screen: {
    padding: 10,
  },
  container: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  logo: {
    width: 224,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  message: {
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 25,
    color: defaultStyles.colors.black,
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 25,
    padding: 25,
    overflow: "hidden",
  },
  tagline: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 25,
    alignSelf: "center",
    color: defaultStyles.colors.darkGrey,
  },
});

export default RegisterScreen;
