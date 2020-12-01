import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./AppText";

import defaultStyles from "../config/styles";

/**
 * An animated component that indicates the loading activity.
 * @module components/LoadingVehicles
 * @param {boolean} visible - visibility of the activity indicator
 */
function LoadingVehicles({ visible = false }) {
  if (!visible) return null;
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>Loading Vehicles</AppText>
      <LottieView
        autoPlay
        loop
        source={require("../assets/animations/loading.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: 150,
    borderRadius: 10,
  },
  text: {
    color: defaultStyles.colors.primary,
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default LoadingVehicles;
