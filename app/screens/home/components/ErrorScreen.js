import { StyleSheet, View } from "react-native";
import React from "react";
import AppText from "../../../components/AppText";
import { AppErrorMessage } from "../../../components/forms";
import AppButton from "../../../components/AppButton";

/**
 * A screen displaying the error
 * @param {string} error The error to be display
 * @param {function} getUser The function to be called during refresh
 */
const ErrorScreen = ({ error, getUser }) => {
  return (
    <View style={styles.screen}>
      <AppText style={styles.errorMessage}>
        Couldn't retrieve user detail.
      </AppText>
      <AppErrorMessage visible={error} />
      <AppButton title="RETRY" onPress={getUser} />
    </View>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
  errorMessage: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
});
