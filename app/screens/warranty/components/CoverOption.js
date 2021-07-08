import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Linking,
} from "react-native";

import AppText from "../../../components/AppText";

import colors from "../../../config/colors";
import defaultStyles from "../../../config/styles";

/**
 * The component showcasing the information of a cover option.
 *
 * @param {object} data The object containing the cover option's information
 * @param {string} title The title of the cover option
 * @param {boolean} margin if true, it will show the price with added margin, else it will show the base price
 * @param {boolean} vat if true, it will show the price with added vat
 * @param {boolean} selected True if the component is currently selected
 * @param {function} onSelect Function to be called when the component is pressed
 */
function CoverOption({ data, title, margin, vat, selected, onSelect }) {
  const [pressing, setPressing] = useState(false);

  /**
   * Calculate the total price
   * @returns the total price in 2 decimal places
   */
  const price = () => {
    return margin
      ? (data.pricing.total.price12 * (vat === "1" ? 1.2 : 1)).toFixed(2)
      : (data.pricing.base.price12 * (vat === "1" ? 1.2 : 1)).toFixed(2);
  };

  /**
   * Calculate the VAT
   * @returns the VAT in 2 decimal places
   */
  const vatValue = () => {
    return margin
      ? (data.pricing.total.price12 * (vat === "1" ? 0.2 : 0)).toFixed(2)
      : (data.pricing.base.price12 * (vat === "1" ? 0.2 : 0)).toFixed(2);
  };

  /**
   * Return th cover limit.
   * @returns The repair limit in £1000s
   */
  const repairLimit = () => {
    return title === "gold"
      ? 3
      : title === "silver"
      ? 2
      : title === "bronze"
      ? 1
      : 5;
  };

  return (
    <Pressable
      style={[
        styles.container,
        selected && styles.containerSelected,
        !pressing && styles.shadow,
        pressing && styles.pressing,
      ]}
      onPress={() => onSelect(title)}
      onPressIn={() => setPressing(true)}
      onPressOut={() => setPressing(false)}
    >
      <View
        style={[
          styles.titleContainer,
          selected && styles.titleContainerSelected,
          pressing && styles.titlePressing,
        ]}
      >
        <AppText style={styles.title}>{title.toUpperCase()}</AppText>
      </View>
      <View style={styles.contentContainer}>
        <CustomisedText style={styles.line1}>12 Months</CustomisedText>
        <CustomisedText style={styles.line2}>£{price()}</CustomisedText>
        {vat === "1" && (
          <CustomisedText style={styles.line3}>
            Incl. {vatValue()} VAT
          </CustomisedText>
        )}
        <CustomisedText style={styles.line4}>
          {data.limits.age} years old
        </CustomisedText>
        <CustomisedText>{data.limits.mileage} miles</CustomisedText>
        <CustomisedText>Up to £{repairLimit()}k Repair Limit</CustomisedText>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://plan-books.s3.us-east-2.amazonaws.com/Warrantywise+Dealer+Terms+v11.pdf"
            )
          }
        >
          <CustomisedText style={styles.termsAndConditions}>
            {`Terms & Conditions   >`}
          </CustomisedText>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

const CustomisedText = ({ style, children }) => {
  return <AppText style={[styles.text, style]}>{children}</AppText>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 20,
    opacity: 0.5,
  },
  containerSelected: {
    opacity: 1,
  },
  pressing: {
    backgroundColor: colors.lightGrey,
  },
  shadow: {
    ...defaultStyles.shadow,
  },
  titleContainer: {
    backgroundColor: colors.mediumGrey,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainerSelected: {
    backgroundColor: colors.primary,
  },
  titlePressing: {
    opacity: 0.9,
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  contentContainer: {
    alignItems: "center",
    padding: 20,
  },
  line1: {
    color: colors.mediumGrey,
  },
  line2: {
    color: "black",
    fontSize: 24,
  },
  line3: {
    color: colors.mediumGrey,
    fontSize: 12,
  },
  line4: {
    paddingTop: 20,
  },
  termsAndConditions: {
    color: colors.primary,
    fontSize: 12,
  },
  text: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});

export default CoverOption;
