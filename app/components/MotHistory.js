import React from "react";
import { View, StyleSheet } from "react-native";
import dayjs from "dayjs";

import colors from "../config/colors";
import defaultStyles from "../config/styles";
import AppText from "./AppText";

function MotHistory({ item, index }) {
  return (
    <View style={styles.container} key={index}>
      <View style={styles.row}>
        <View style={styles.detailField}>
          <AppText style={styles.detailTitle}>Date</AppText>
          <AppText style={styles.detailValue}>
            {dayjs(item.completedDate, "YYYY.MM.DD HH:mm:ss").format(
              "DD/MM/YYYY"
            )}
          </AppText>
        </View>

        <View style={styles.detailField}>
          <AppText style={styles.detailTitle}>Expiry</AppText>
          <AppText style={styles.detailValue}>
            {item.expiryDate
              ? dayjs(item.expiryDate, "YYYY.MM.DD").format("DD/MM/YYYY")
              : "N/A"}
          </AppText>
        </View>

        <View style={styles.detailField}>
          <AppText style={styles.detailTitle}>Odometer</AppText>
          <AppText style={styles.detailValue}>
            {item.odometerValue + " " + item.odometerUnit}
          </AppText>
        </View>

        <View style={styles.detailField}>
          <AppText style={styles.detailTitle}>Result</AppText>
          <AppText
            style={{
              fontWeight: "bold",
              color: item.testResult === "PASSED" ? colors.primary : "red",
            }}
          >
            {item.testResult}
          </AppText>
        </View>
      </View>
      {item.rfrAndComments.length > 0 && (
        <View style={styles.comments}>
          <AppText style={styles.detailTitle}>Comments</AppText>
          {item.rfrAndComments.map((comment, index) => (
            <View key={index}>
              <AppText style={[styles.detailValue, { fontWeight: "bold" }]}>
                {comment.type}
              </AppText>
              <AppText style={[styles.detailValue, { marginBottom: 10 }]}>
                {comment.text}
              </AppText>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.lightGrey,
    borderWidth: 2,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: 10,
    padding: 20,
    ...defaultStyles.shadow,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginBottom: 5,
  },
  detailField: {
    width: "24%",
  },
  detailTitle: {
    fontWeight: "bold",
    color: colors.secondary,
    fontSize: 12,
    marginBottom: 3,
  },
  detailValue: {
    fontSize: 12,
  },
  comments: {
    borderTopWidth: 2,
    borderTopColor: colors.lightGrey,
    marginTop: 10,
    paddingTop: 10,
  },
});

export default MotHistory;
