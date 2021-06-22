import React from "react";
import { View, Dimensions, Platform } from "react-native";
import colors from "../config/colors";

/**
 * The elliptical background.
 */
function Background() {
  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: colors.secondary,
        width: Dimensions.get("screen").height * (Platform.isPad ? 2 : 1),
        height: Dimensions.get("screen").height * (Platform.isPad ? 2 : 1),
        alignSelf: "center",
        borderRadius:
          Dimensions.get("screen").height * (Platform.isPad ? 2 : 1),
        top:
          -Dimensions.get("screen").height * 0.65 * (Platform.isPad ? 2.4 : 1),
      }}
    />
  );
}

export default Background;
