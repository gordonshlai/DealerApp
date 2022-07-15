import { Platform, StyleSheet, View } from "react-native";
import React from "react";

import AppText from "../../../components/AppText";

import colors from "../../../config/colors";

/**
 *
 * @param {object} user The user information returned from the api
 */
const Heading = ({ user }) => {
  return (
    <View style={styles.container}>
      {user && (
        <AppText
          style={styles.text1}
        >{`HELLO, ${user?.name?.toUpperCase()}`}</AppText>
      )}
      <View style={styles.textRow}>
        <AppText style={styles.text2}>{"Welcome to the "}</AppText>
        <AppText style={styles.text3}>WiseDealer App</AppText>
      </View>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 30,
  },
  text1: {
    color: "white",
    fontWeight: "bold",
    fontSize: Platform.isPad ? 30 : 18,
  },
  textRow: {
    flexDirection: "row",
  },
  text2: {
    color: colors.primary,
    fontStyle: "italic",
    fontSize: Platform.isPad ? 30 : 18,
  },
  text3: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: Platform.isPad ? 30 : 18,
  },
});
