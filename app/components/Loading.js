import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./AppText";

import defaultStyles from "../config/styles";

/**
 * An animated component that indicates the loading activity.
 * @module components/Loading
 * @param {boolean} visible - visibility of the activity indicator
 */
function Loading({ visible = false, style }) {
  if (!visible) return null;
  return (
    <View style={[styles.container, style]}>
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
    height: 100,
    borderRadius: 10,
  },
});

export default Loading;
