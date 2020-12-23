import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function Conversation({ title, subTitle, time, isYourself }) {
  return (
    <View
      style={{
        width: "90%",
        alignSelf: isYourself ? "flex-end" : "flex-start",
      }}
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
  container: {},
  title: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  subTitle: {
    flex: 1,
  },
  time: {
    color: colors.mediumGrey,
    fontSize: 12,
    textAlign: "right",
  },
  isYourself: {
    backgroundColor: colors.primary + "aa",
    alignSelf: "flex-end",
  },
  notYourself: {
    backgroundColor: colors.mediumGrey + "33",
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
