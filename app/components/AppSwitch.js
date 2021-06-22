import React from "react";
import { View, StyleSheet, Switch } from "react-native";

import AppText from "./AppText";
import ToolTip from "./ToolTip";
import colors from "../config/colors";

/**
 *
 * The switch component, consist of an optional title and an optional tooltip.
 *
 * @param {boolean} value - the value determines whether the switch is on or off
 * @param {string} text - the text to be display
 * @param {string} tooltip - the content of the tooltip
 * @param {function} onValueChange - the function to be called when the value of the switch changes
 * @returns
 */
function AppSwitch({ value, text, tooltip, onValueChange }) {
  return (
    <View style={styles.container}>
      {text && <AppText style={styles.text}>{text}</AppText>}
      <Switch
        trackColor={{ false: colors.white, true: colors.primary }}
        onValueChange={onValueChange}
        value={value}
      />
      {tooltip && <ToolTip message={tooltip} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    fontWeight: "bold",
    marginRight: 10,
  },
});

export default AppSwitch;
