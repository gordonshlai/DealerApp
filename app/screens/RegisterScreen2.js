import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
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

      <Screen>
        <ScrollView
          showsVerticalScrollIndicator={false}
          centerContent
          contentContainerStyle={styles.scrollView}
        >
          <Image style={styles.logo} source={require("../assets/logo.png")} />
          <AppText style={styles.message}>
            THANK YOU FOR REGISTERING, BEFORE YOU CAN LOGIN YOUR ACCOUNT WILL
            NEED TO BE A APPROVED BY A MEMBER OF THE WISE TEAM.
          </AppText>
          <AppButton
            icon="login"
            title="SIGN IN"
            onPress={() => navigation.navigate(routes.SIGN_IN)}
          />
          <AppText style={styles.text}>
            LoreWarranty Wise and Warranty Wise Logo are trademarks of
            Warrantywise. Warrantywise Limited is a company registered in
            England and Wales No. 07963594 at The Rocket Centre, 3 Trident Way,
            Blackburn, Lancashire, BB1 3NU and is part of Wise Group Holdings
            Limited, Company No. 10613336. Terms and Conditions apply.
          </AppText>
        </ScrollView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
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
    textAlign: "center",
    position: "absolute",
    bottom: 20,
  },
});

export default RegisterScreen2;
