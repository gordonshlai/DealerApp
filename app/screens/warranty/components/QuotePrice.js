import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import AppText from "../../../components/AppText";
import Icon from "../../../components/Icon";

import colors from "../../../config/colors";
import defaultStyles from "../../../config/styles";

function QuotePrice({ coverLength, data, vat, selected, onPress }) {
  const [pressing, setPressing] = useState(false);

  const price = () => (data * (vat === "1" ? 1.2 : 1)).toFixed(2);

  const vatValue = () => (data * (vat === "1" ? 0.2 : 0)).toFixed(2);
  return (
    <Pressable
      style={[
        styles.container,
        selected && styles.selected,
        !pressing && styles.shadow,
        pressing && styles.pressing,
      ]}
      onPress={onPress}
      onPressIn={() => setPressing(true)}
      onPressOut={() => setPressing(false)}
    >
      <CustomisedText style={styles.line1}>{coverLength} Months</CustomisedText>
      <CustomisedText style={styles.line2}>£{price()}</CustomisedText>
      {vat === "1" && (
        <CustomisedText style={styles.line3}>
          incl. £{vatValue()} VAT
        </CustomisedText>
      )}
      {selected && (
        <Icon
          name="check"
          size={25}
          backgroundColor={colors.primary}
          style={styles.icon}
        />
      )}
    </Pressable>
  );
}

const CustomisedText = ({ style, children }) => {
  return <AppText style={[styles.text, style]}>{children}</AppText>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  selected: {
    opacity: 1,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  pressing: {
    backgroundColor: colors.lightGrey,
  },
  shadow: {
    ...defaultStyles.shadow,
  },
  line1: {
    fontSize: 16,
    color: colors.mediumGrey,
  },
  line2: {
    fontSize: 20,
  },
  line3: {
    color: colors.mediumGrey,
    fontSize: 12,
  },
  icon: {
    position: "absolute",
    right: -7,
    top: -7,
  },
  text: {
    fontWeight: "bold",
  },
});

export default QuotePrice;
