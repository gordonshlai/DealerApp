import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function NewListingButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="plus" color="white" size={40} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderColor: "white",
    borderRadius: 40,
    bottom: Platform.OS == "ios" ? 30 : 35,
    height: 70,
    justifyContent: "center",
    width: 70,
    shadowColor: colors.black,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 10,
  },
});

export default NewListingButton;
