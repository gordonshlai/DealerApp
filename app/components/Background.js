import React from "react";
import { View, Dimensions } from "react-native";
import colors from "../config/colors";

function Background(props) {
  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: colors.secondary,
        width: Dimensions.get("screen").height,
        height: Dimensions.get("screen").height,
        alignSelf: "center",
        borderRadius: Dimensions.get("screen").height,
        top: -Dimensions.get("screen").height * 0.7,
      }}
    />
  );
}

export default Background;
