import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

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
  color = defaultStyles.colors.primary,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      // style={[styles.button, { backgroundColor: defaultStyles.colors[color] }]}
      onPress={onPress}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={
            color === defaultStyles.colors.primary ||
            color === defaultStyles.colors.secondary ||
            color === defaultStyles.colors.success ||
            color === defaultStyles.colors.warning
              ? defaultStyles.colors.white
              : defaultStyles.colors.black
          }
          style={styles.icon}
        />
      )}
      <Text
        style={[
          styles.text,
          {
            color:
              color === defaultStyles.colors.primary ||
              color === defaultStyles.colors.secondary ||
              color === defaultStyles.colors.success ||
              color === defaultStyles.colors.warning
                ? defaultStyles.colors.white
                : defaultStyles.colors.black,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  icon: {
    marginRight: 10,
  },
});

export default AppButton;
