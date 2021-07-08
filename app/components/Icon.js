import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

/**
 *  A custom icon component, consist of a circular container around the expo-vector-icon.
 *
 * @param {string} name The name of the icon, referring to: https://icons.expo.fyi/
 * @param {number} size The size of the icon, referring to: https://icons.expo.fyi/
 * @param {string} backgroundColor The background color of the icon whole icon component.
 * @param {string} iconColor The color of the icon, referring to: https://icons.expo.fyi/
 * @param {object} style The style of the container of the component.
 *
 */
function Icon({
  name,
  size = 40,
  backgroundColor = "black",
  iconColor = "white",
  style,
}) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.6} />
    </View>
  );
}

export default Icon;
