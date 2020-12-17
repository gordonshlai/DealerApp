import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

/**
 * A custom button of the application
 * @module components/AppSmallButton
 * @param {string} title - the words apears on the button
 * @param {string} color - the background color of the button (default = primary)
 * @param {method} onPress - the block of code that will execute when the button is pressed
 */
function AppSmallButton({
  icon,
  title,
  color = defaultStyles.colors.primary,
  badge,
  onPress,
  style,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }, style]}
      onPress={onPress}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={18}
          color={
            color === null
              ? defaultStyles.colors.primary
              : defaultStyles.colors.white
          }
          style={styles.icon}
        />
      )}
      {title && (
        <Text
          style={[
            styles.text,
            {
              color:
                color === null
                  ? defaultStyles.colors.primary
                  : defaultStyles.colors.white,
            },
          ]}
        >
          {title}
        </Text>
      )}
      {badge && (
        <MaterialCommunityIcons
          name="check"
          style={[
            styles.badge,
            {
              backgroundColor:
                color === null
                  ? defaultStyles.colors.primary
                  : defaultStyles.colors.white,
            },
          ]}
          color={color === null ? defaultStyles.colors.white : color}
          size={12}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: 5,
    padding: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 5,
  },
  badge: {
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: 6,
    overflow: "hidden",
  },
});

export default AppSmallButton;
