import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

/**
 * An animated component that indicates the loading activity.
 * @module components/Loading
 * @param {boolean} visible Visibility of the activity indicator
 * @param {object} style The style object to be added to be container of the component.
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
