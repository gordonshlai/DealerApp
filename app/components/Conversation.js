import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

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
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: { height: 5 },
    elevation: 10,
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
