import React from "react";
import { View, StyleSheet, Switch } from "react-native";

import AppText from "../../../components/AppText";
import ToolTip from "../../../components/ToolTip";
import colors from "../../../config/colors";

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
