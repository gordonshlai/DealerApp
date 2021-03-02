import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import colors from "../config/colors";

function NewListingButton({ onPress, style }) {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { bottom: tabBarHeight }, style]}
    >
      <MaterialCommunityIcons name="plus" color="white" size={40} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
    backgroundColor: colors.primary,
    borderRadius: 40,
    height: 60,
    width: 60,
    right: 30,
    shadowColor: colors.black,
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: { height: 5 },
    elevation: 10,
  },
});

export default NewListingButton;
