import React from "react";
import { View, StyleSheet, Switch } from "react-native";

import AppText from "../../../components/AppText";
import colors from "../../../config/colors";

function ToggleMarginSwitch({ margin, onValueChange }) {
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>Toggle Margin</AppText>
      <Switch
        trackColor={{ false: colors.white, true: colors.primary }}
        onValueChange={onValueChange}
        value={margin}
      />
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

export default ToggleMarginSwitch;
