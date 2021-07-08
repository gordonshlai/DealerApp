import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import AppText from "./AppText";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

/**
 * The pressable payment card component.
 *
 * @param {string} last_4 The last 4 digits of the payment card.
 * @param {string} holder The holder name of the payment card.
 * @param {string} type The type of the payment card. ('VISA', 'American express', 'Master card')
 * @param {function} onPress The function to be called when the component is pressed.
 * @returns
 */
function PaymentCard({ last_4, holder, expiry, type, onPress }) {
  const [pressing, setPressing] = useState(false);
  const expiryMonth = expiry?.slice(0, 2);
  const expiryYear = expiry?.slice(2, 4);
  return (
    <Pressable
      style={[
        styles.container,
        !pressing && styles.shadow,
        pressing && styles.pressing,
      ]}
      onPress={onPress}
      onPressIn={() => setPressing(true)}
      onPressOut={() => setPressing(false)}
    >
      <AppText style={styles.cardNumber}>**** **** **** {last_4}</AppText>
      <AppText style={styles.cardHolder}>{holder}</AppText>
      <View style={styles.secondLine}>
        <View style={styles.expiryContainer}>
          <AppText>expiry: </AppText>
          <AppText style={styles.expiryDate}>
            {expiryMonth}/{expiryYear}
          </AppText>
        </View>
        <FontAwesome
          name={
            type === "VISA"
              ? "cc-visa"
              : type === "AMEX"
              ? "cc-amex"
              : "cc-mastercard"
          }
          size={32}
          color={colors.darkGrey}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 300,
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: "flex-end",
  },
  shadow: {
    ...defaultStyles.shadow,
  },
  pressing: {
    backgroundColor: colors.lightGrey,
  },
  cardNumber: {
    position: "absolute",
    alignSelf: "center",
    top: 80,
    fontSize: 28,
    fontWeight: "bold",
  },
  cardHolder: {
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  secondLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  expiryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  expiryDate: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default PaymentCard;
