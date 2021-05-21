import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Linking,
} from "react-native";

import AppText from "../../../components/AppText";

import colors from "../../../config/colors";
import defaultStyles from "../../../config/styles";

function CoverOption({ data, title, margin, vat, selected, onSelect }) {
  const price = () => {
    return margin
      ? (data.pricing.total.price12 * (vat === "1" ? 1.2 : 1)).toFixed(2)
      : (data.pricing.base.price12 * (vat === "1" ? 1.2 : 1)).toFixed(2);
  };

  const vatValue = () => {
    return margin
      ? (data.pricing.total.price12 * (vat === "1" ? 0.2 : 0)).toFixed(2)
      : (data.pricing.base.price12 * (vat === "1" ? 0.2 : 0)).toFixed(2);
  };

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
    <TouchableWithoutFeedback onPress={() => onSelect(title)}>
      <View style={[styles.container, selected && styles.containerSelected]}>
        <View
          style={[
            styles.titleContainer,
            selected && styles.titleContainerSelected,
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
      </View>
    </TouchableWithoutFeedback>
  );
}

const CustomisedText = ({ style, children }) => {
  return <AppText style={[styles.text, style]}>{children}</AppText>;
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 20,
    opacity: 0.7,
    ...defaultStyles.shadow,
  },
  containerSelected: {
    opacity: 1,
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
});

export default CoverOption;
