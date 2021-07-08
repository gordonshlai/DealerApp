import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";

import defaultStyles from "../config/styles";

/**
 * A component consist of an icon on the left hand side and a text on the right.
 * @param {string} name The name of the icon component, referring to https://icons.expo.fyi/
 * @param {string} color The color of the icon and the text. (default: color.darkGrey)
 * @param {string} color The size of the icon and the text. (default: 16)
 * @param {string} text The text to be rendered.
 * @param {object} textStyle The style object to be added to the container of the component.
 */
function Info({
  name,
  color = defaultStyles.colors.darkGrey,
  size = 16,
  text,
  textStyle,
}) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={name} color={color} size={size} />
      <AppText
        style={[
          {
            color,
            fontSize: size,
            paddingLeft: 5,
          },
          textStyle,
        ]}
      >
        {text}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Info;
