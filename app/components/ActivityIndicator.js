import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

/**
 * An animated component that indicates the loading activity.
 * @module components/ActivityIndicator
 * @param {boolean} visible - visibility of the activity indicator
 */
function ActivityIndicator({ visible = false }) {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require("../assets/animations/loading.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    opacity: 0.8,
    position: "absolute",
    zIndex: 1,
  },
});

export default ActivityIndicator;
