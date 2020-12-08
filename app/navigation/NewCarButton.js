import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

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
    backgroundColor: defaultStyles.colors.primary,
    borderColor: "white",
    borderRadius: 40,
    borderWidth: 10,
    bottom: Platform.OS == "ios" ? 15 : 20,
    height: 70,
    justifyContent: "center",
    width: 70,
  },
});

export default NewListingButton;
