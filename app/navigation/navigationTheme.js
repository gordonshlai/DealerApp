import { DefaultTheme } from "@react-navigation/native";

import colors from "../config/colors";

/**
 * This module contains the details of the custom navigation theme.
 * @module navigation/navigationTheme
 */
export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.white,
  },
};
