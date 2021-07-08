import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform } from "react-native";

import colors from "./colors";

/**
 * This module contains all the defualt styles for the application.
 * @module config/styles
 */
export default {
  colors,

  text: {
    color: colors.darkGrey,
    fontSize: 14,
    ...Platform.select({
      ios: {
        fontFamily: "Avenir",
      },
      android: {
        fontFamily: "Roboto",
      },
    }),
  },

  shadow: {
    shadowColor: colors.black,
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: { height: 5 },
    elevation: 10,
  },

  stackNavigator: {
    headerBackTitleVisible: false,
    headerBackTitle: "",
    headerTitleStyle: {
      marginHorizontal: 10,
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    headerStyle: {
      backgroundColor: colors.secondary,
      shadowColor: "transparent",
      elevation: 0,
    },
    headerTintColor: "white",
    headerTitleAlign: "center",
    headerBackImage: () => (
      <MaterialCommunityIcons
        name="chevron-left"
        size={32}
        color={colors.primary}
        style={{ paddingHorizontal: 10 }}
      />
    ),
  },
};
