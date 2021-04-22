import React from "react";
import { View, StyleSheet } from "react-native";
import dayjs from "dayjs";

import colors from "../config/colors";
import defaultStyles from "../config/styles";
import AppText from "./AppText";
import Info from "./Info";
import Icon from "./Icon";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText
              style={{
                fontWeight: "bold",
                color: item.testResult === "PASSED" ? "green" : "red",
              }}
            >
              {item.testResult}
            </AppText>
            <MaterialCommunityIcons
              name={
                item.testResult === "PASSED"
                  ? "check-circle-outline"
                  : "close-circle-outline"
              }
              size={18}
              color={item.testResult === "PASSED" ? "green" : "red"}
              style={{ marginLeft: 3 }}
            />
          </View>
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
      {/* <View
        style={{
          position: "absolute",
          right: 10,
          top: 10,
        }}
      >
        <MaterialCommunityIcons
          name={
            item.testResult === "PASSED"
              ? "check-circle-outline"
              : "close-circle-outline"
          }
          size={30}
          color={item.testResult === "PASSED" ? "green" : "red"}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
