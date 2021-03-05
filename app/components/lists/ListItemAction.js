import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../AppText";

import colors from "../../config/colors";
import { TouchableOpacity } from "react-native";

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
