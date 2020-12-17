import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../AppText";

import colors from "../../config/colors";

function ListItemAction({
  onPress,
  icon = "trash-can",
  backgroundColor = colors.danger,
  color = colors.white,
  text = "Delete",
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, { backgroundColor }]}>
        <MaterialCommunityIcons name={icon} size={35} color={color} />
        <AppText style={[styles.text, { color }]}>{text}</AppText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
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
