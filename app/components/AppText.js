import React from "react";
import { Text } from "react-native";

import defaultStyles from "../config/styles";

/**
 * A custom text component of the application
 * @module components/AppText
 * @param {string} children - the text to display
 * @param {object} style - the the extra styles to adding into the component
 * @param {} otherProps - all other properties to add into the text component
 */
function AppText({ children, style, ...otherProps }) {
  return (
    <Text style={[defaultStyles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
