import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

/**
 * A custom button of the application
 * @module components/AppButton
 * @param {string} title - the words apears on the button
 * @param {string} color - the background color of the button (default = primary)
 * @param {method} onPress - the block of code that will execute when the button is pressed
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
