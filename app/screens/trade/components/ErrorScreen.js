import { StyleSheet, View } from "react-native";
import React from "react";

import ActivityIndicator from "../../../components/ActivityIndicator";
import AppText from "../../../components/AppText";
import { AppErrorMessage } from "../../../components/forms";
import AppButton from "../../../components/AppButton";

/**
 * A screen displaying the error for the trade screen
 *
 * @param {boolean} loading determine whether the api call is in progress
 * @param {function} handleRefresh the function to be called during refresh
 * @param {string} error the error message to be diaplayed
 */
const ErrorScreen = ({ loading, handleRefresh, error }) => {
  return (
    <>
      <ActivityIndicator visible={loading} />
      <View style={styles.container}>
        <AppText style={styles.message}>
          Couldn't retrieve the vehicles.
        </AppText>
        <AppErrorMessage visible={error} error={error} />
        <AppButton title="RETRY" onPress={handleRefresh} />
      </View>
    </>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  message: {
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
});
