import React from "react";
import { StyleSheet } from "react-native";
import AppText from "./AppText";
import defaultStyles from "../config/styles";

function Registration({ registration, style, ...otherProps }) {
  const formatingRegistration = (registration) => {
    let firstPart = registration.substr(0, 4);
    let secondPart = registration.substr(4);
    return firstPart + " " + secondPart;
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
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: defaultStyles.colors.warning,
    paddingHorizontal: 5,
    overflow: "hidden",
  },
});

export default Registration;
