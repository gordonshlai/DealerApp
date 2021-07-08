import React from "react";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

/**
 * The floating orange plus sign button.
 *
 * @param {function} onPress The function to be called when the button is pressed
 * @param {object} style The style object to put into the container of the component
 */
function NewCarButton({ onPress, style }) {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { bottom: tabBarHeight + 10 }, style]}
    >
      <MaterialCommunityIcons name="plus" color="white" size={40} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
    backgroundColor: colors.primary,
    borderRadius: 30,
    height: 60,
    width: 60,
    right: 20,
    ...defaultStyles.shadow,
  },
});

export default NewCarButton;
