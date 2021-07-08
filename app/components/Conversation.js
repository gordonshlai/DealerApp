import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "./AppText";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

/**
 *
 * @param {string} title The title of the component. (Name of the dealership or account manager)
 * @param {string} subTitle The subtitle of the component. (The content of the conversation)
 * @param {string} time The time of the conversation sent.
 * @param {boolean} isYourself Determine if it is yourself sending the message.
 * @returns
 */
function Conversation({ title, subTitle, time, isYourself }) {
  return (
    <View
      style={[
        styles.container,
        {
          alignSelf: isYourself ? "flex-end" : "flex-start",
        },
      ]}
    >
      <View
        style={[
          styles.threadContainer,
          isYourself ? styles.isYourself : styles.notYourself,
        ]}
      >
        {title && <AppText style={styles.title}>{title}</AppText>}
        {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
        {time && <AppText style={styles.time}>{time}</AppText>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    shadowColor: colors.black,
    ...defaultStyles.shadow,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
    color: "white",
  },
  subTitle: {
    fontSize: 16,
    flex: 1,
    color: "white",
  },
  time: {
    color: colors.lightGrey,
    fontSize: 12,
    textAlign: "right",
  },
  isYourself: {
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
  },
  notYourself: {
    backgroundColor: colors.mediumGrey,
    alignSelf: "flex-start",
  },
  threadContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
});

export default Conversation;
