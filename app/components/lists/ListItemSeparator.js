import React from "react";
import { StyleSheet, View } from "react-native";

import defaultStyles from "../../config/styles";

/**
 * A light grey line.
 */
function ListItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: defaultStyles.colors.lightGrey,
  },
});

export default ListItemSeparator;
