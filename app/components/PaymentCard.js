import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import AppText from "./AppText";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

function PaymentCard({ last_4, expiry, type }) {
  const expiryMonth = expiry?.slice(0, 2);
  const expiryYear = expiry?.slice(2, 4);
  return (
    <View style={styles.container}>
      <AppText style={styles.cardNumber}>**** **** **** {last_4}</AppText>
      <View style={styles.secondLine}>
        <AppText style={styles.expiryDate}>
          {expiryMonth}/{expiryYear}
        </AppText>
        <FontAwesome
          name={
            type === "VISA"
              ? "cc-visa"
              : type === "AMEX"
              ? "cc-amex"
              : "cc-mastercard"
          }
          size={28}
          color={colors.darkGrey}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 300,
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: "flex-end",
    ...defaultStyles.shadow,
  },
  cardNumber: {
    position: "absolute",
    alignSelf: "center",
    top: 80,
    fontSize: 28,
    fontWeight: "bold",
  },
  secondLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
  },
  expiryDate: {
    fontSize: 24,
  },
});

export default PaymentCard;
