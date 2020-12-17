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
  style,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color, padding: color === null ? 5 : 12 },
        style,
      ]}
      onPress={onPress}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={16}
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginVertical: 7,
  },
  text: {
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default AppButton;
