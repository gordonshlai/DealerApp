import React from "react";
import { StyleSheet } from "react-native";

import AppText from "./AppText";

import defaultStyles from "../config/styles";

/**
 * The registration plate component, in "XXXX XXX" format.
 *
 * @param {string} registration The registration number of the vehicle
 * @param {object} style The style object for the component
 * @param {...} otherProps any props to put into the text component
 */
function Registration({ registration, style, ...otherProps }) {
  /**
   * Turn the registration number format from "XXXXXXX" to "XXXX XXX".
   * @param {string} registration The registration number of the vehicle
   * @returns The registration number with "XXXX XXX" format.
   */
  const formatingRegistration = (registration) => {
    if (registration) {
      let firstPart = registration.substr(0, 4);
      let secondPart = registration.substr(4);
      return firstPart + " " + secondPart;
    } else {
      return registration;
    }
  };

  return (
    <AppText style={[styles.container, style]} {...otherProps}>
      {formatingRegistration(registration)}
    </AppText>
  );
}

const styles = StyleSheet.create({
  container: {
    fontWeight: "bold",
    alignSelf: "center",
    borderRadius: 3,
    backgroundColor: defaultStyles.colors.warning,
    paddingHorizontal: 3,
    overflow: "hidden",
  },
});

export default Registration;
