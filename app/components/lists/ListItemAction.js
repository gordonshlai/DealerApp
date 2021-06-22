import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../AppText";

import colors from "../../config/colors";
import { TouchableOpacity } from "react-native";

/**
 *
 * The component to be rendered when the ListItem component is being swipped to either side.
 *
 * @param {function} onPress - the function to be called when the component is pressed on
 * @param {string} icon - the name of the icon
 * @param {string} backgroundColor - the background color of the component
 * @param {string} color - the color of the icon component
 * @param {string} text - the text to be rendered
 */
function ListItemAction({
  onPress,
  icon = "trash-can",
  backgroundColor = colors.danger,
  color = colors.white,
  text = "Delete",
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, { backgroundColor }]}>
        <MaterialCommunityIcons name={icon} size={35} color={color} />
        <AppText style={[styles.text, { color }]}>{text}</AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontWeight: "bold",
    marginLeft: 5,
    color: "white",
  },
});

export default ListItemAction;
