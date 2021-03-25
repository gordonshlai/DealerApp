import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import colors from "../config/colors";
import { Platform } from "react-native";

function NewListingButton({ onPress, style }) {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          bottom:
            Platform.OS === "android" ? tabBarHeight + 10 : tabBarHeight - 20,
        },
        style,
      ]}
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
    borderRadius: 30,
    height: 60,
    width: 60,
    right: 20,
    shadowColor: colors.black,
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: { height: 5 },
    elevation: 10,
  },
});

export default NewListingButton;
