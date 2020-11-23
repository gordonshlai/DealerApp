import { Platform } from "react-native";

import colors from "./colors";

/**
 * This module contains all the defualt styles for the application.
 * @module config/styles
 */
export default {
  colors,
  text: {
    color: colors.dark,
    fontSize: 18,
    ...Platform.select({
      ios: {
        fontFamily: "Avenir",
      },
      android: {
        fontFamily: "Roboto",
      },
    }),
  },
};
