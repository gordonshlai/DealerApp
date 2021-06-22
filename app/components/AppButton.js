import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

/**
 * A custom button of the application.
 *
 * @module components/AppButton
 * @param {string} icon - the icon of the button
 * @param {string} title - the words apears on the button
 * @param {string} backgroundColor - the background color of the button (dafault = success)
 * @param {string} color - the color of the text of the button (default = white)
 * @param {boolean} badge - a badge to be shown if the value given is true.
 * @param {boolean} border - a border to be shown if the value given is true.
 * @param {method} onPress - the function to be called when the button is pressed
 * @param {object} style - the style of the container of the button
 */
function AppButton({
  icon,
  title,
  backgroundColor = colors.success,
  color = "white",
  size = 14,
  badge,
  border = true,
  onPress,
  style,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor,
          padding: backgroundColor === null && !border ? 5 : 12,
          marginVertical: backgroundColor === null && !border ? 5 : 7,
        },
        border ? styles.border : null,
        style,
      ]}
      onPress={onPress}
    >
      {icon && <MaterialCommunityIcons name={icon} size={size} color={color} />}
      {title && (
        <Text
          style={[
            styles.title,
            {
              fontSize: size,
              marginLeft: icon ? 5 : 0,
              color: color,
            },
          ]}
        >
          {title}
        </Text>
      )}
      {badge && (
        <MaterialCommunityIcons
          name="check"
          style={[styles.badge, { backgroundColor: color }]}
          color={colors.white}
          size={10}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontWeight: "bold",
  },
  badge: {
    position: "absolute",
    left: 0,
    top: 0,
    padding: 1,
    borderRadius: 6,
    overflow: "hidden",
  },
  border: {
    borderColor: colors.success,
    borderWidth: 1,
  },
});

export default AppButton;
