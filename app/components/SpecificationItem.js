import React from "react";
import { View, StyleSheet } from "react-native";

import Info from "./Info";
import AppText from "./AppText";

import colors from "../config/colors";

function SpecificationItem({
  color = colors.mediumGrey,
  icon,
  title,
  value,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.infoContainer}>
        <AppText style={styles.title}>{title}</AppText>
        {/* <Info name={icon} text={text} color={color} /> */}
      </View>
      <View style={styles.valueContainer}>
        {value && <AppText style={styles.value}>{value}</AppText>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 5,
    justifyContent: "space-between",
  },
  infoContainer: {
    width: "50%",
    flexDirection: "row",
  },
  title: {
    color: colors.mediumGrey,
  },
  valueContainer: {
    width: "45%",
  },
  value: {
    fontWeight: "bold",
  },
});

export default SpecificationItem;
