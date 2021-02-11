import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

import colors from "../config/colors";
import routes from "../navigation/routes";

/**
 * The register screen, allowing user to input their details for registrating a new account
 * and handling the registration operation based on the user input.
 * @module screens/RegisterScreen2
 */

/**
 * The register screen 2 functional component
 */
function RegisterScreen2({ navigation }) {
  return (
    <>
      <LinearGradient
        colors={["#143C4B", "#0E262F"]}
        style={styles.background}
      />
      <View style={styles.container}>
        <Screen style={styles.screen}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <ScrollView>
              <Image
                style={styles.logo}
                source={require("../assets/logo.png")}
              />
              <AppText style={styles.message}>
                THANK YOU FOR REGISTERING, BEFORE YOU CAN LOGIN YOUR ACCOUNT
                WILL NEED TO BE A APPROVED BY A MEMBER OF THE WISE TEAM.
              </AppText>
              <AppButton
                icon="login"
                title="SIGN IN"
                onPress={() => navigation.navigate(routes.SIGN_IN)}
              />
            </ScrollView>
          </KeyboardAvoidingView>
          <AppText style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et elit
            hendrerit, vulputate libero ut, blandit libero. Vestibulum quis
            tincidunt dui, sollicitudin porttitor dui. Aliquam id augue eget dui
            iaculis rhoncus quis vitae sem. Pellentesque vestibulum consectetur
            nisl vel faucibus.
          </AppText>
        </Screen>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  screen: {
    padding: 20,
  },
  logo: {
    width: 224,
    height: 80,
    alignSelf: "center",
    marginVertical: 30,
  },
  message: {
    alignSelf: "center",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    padding: 25,
    marginVertical: 30,
  },
  text: {
    fontSize: 8,
    color: colors.lightGrey,
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
});

export default RegisterScreen2;
