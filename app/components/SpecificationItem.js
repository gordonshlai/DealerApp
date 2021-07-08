import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "./AppText";

import colors from "../config/colors";

/**
 * The component containig a title and a value.
 *
 * @param {string} title The title of the field.
 * @param {string} value The value of the field.
 * @param {object} style The style object to put into the conatiner of the component.
 */
function SpecificationItem({ title, value, style }) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.infoContainer}>
        <AppText style={styles.title}>{title}</AppText>
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
