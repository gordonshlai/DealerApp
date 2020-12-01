import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

/**
 * A custom button of the application
 * @module components/IconButton
 * @param {string} name - name of the icon (default = magnify)
 * @param {string} color - the color of the icon (default = primary)
 * @param {string} size - size of the icon (default = 24)
 * @param {method} onPress - the block of code that will execute when the button is pressed
 */
function IconButton({
  name = "magnify",
  color = defaultStyles.colors.primary,
  size = 24,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialCommunityIcons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
});

export default IconButton;
