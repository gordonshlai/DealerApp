import React, { memo } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import Registration from "./Registration";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

/**
 * The status of the a vehicle, ordered in a way that matches with the backend.
 */
const vehicleStatusArray = ["In Stock", "Sold", "Trade Listed", "Sold"];

/**
 * A component showcasing the brief details of the vehicle. It is a pressable component when can
 * trigger a function when it is pressed on.
 *
 * @param {string} title The title of the vehicle
 * @param {string} make Vehicle's make
 * @param {string} model Vehicle's model
 * @param {string} year Vehicle's manufacture year
 * @param {string} mileage Vehicle's mileage
 * @param {number} engineCapacity Vehicle's engine capacity
 * @param {number} priceAsking Vehicle's asking price
 * @param {string} registration Vehicle's registration
 * @param {number} sales_status Vehicle's sale status
 * @param {function} onPress Function to be called when the card is pressed
 * @param {string} imageUrl The URL of the vehicle's image, pointing to the AWS database
 *
 */
function Card({
  title,
  make,
  model,
  year,
  mileage,
  engineCapacity,
  priceAsking,
  registration,
  sales_status,
  onPress,
  imageUrl,
}) {
  /**
   * Added commas into the prices. eg. 1000000.00 will become 1,000,000.00
   *
   * @param {string|number} num
   * @returns the number with commas in.
   */
  const numberWithCommas = (num) => {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <Image
              style={styles.image}
              tint="light"
              source={{ uri: imageUrl }}
              loadingIndicatorSource={require("../assets/animations/loading.json")}
            />
          ) : (
            <MaterialCommunityIcons name="car" size={90} color="white" />
          )}
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.firstLine}>
            <AppText style={styles.title} numberOfLines={1}>
              {title ? title : make + " " + model}
            </AppText>
          </View>

          <View style={styles.secondLine}>
            {year && <AppText style={styles.info}>{year}</AppText>}
            <AppText style={styles.info}>
              {`-  ${numberWithCommas(mileage)}mi`}
            </AppText>
            <AppText style={styles.info}>{`-  ${engineCapacity}cc`}</AppText>
          </View>

          <View style={styles.thirdLine}>
            <AppText style={styles.priceAsking} numberOfLines={1}>
              £{priceAsking === "0.00" ? " POA" : numberWithCommas(priceAsking)}
            </AppText>
            <Registration
              registration={registration}
              style={styles.registration}
            />
          </View>
        </View>

        {sales_status && (
          <View
            style={[
              styles.sales_statusContainer,
              {
                backgroundColor:
                  sales_status == 0
                    ? "orange"
                    : sales_status == 2
                    ? "green"
                    : "crimson",
              },
            ]}
          >
            <AppText style={styles.sales_statusText}>
              {vehicleStatusArray[sales_status]}
            </AppText>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const arePropsEqual = (prevProps, nextProps) => {
  return prevProps.label === nextProps.label;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 10,
    width: "100%",
    ...defaultStyles.shadow,
  },
  detailsContainer: {
    padding: 10,
  },
  imageContainer: {
    height: Platform.isPad ? 130 : 90,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },
  image: {
    height: Platform.isPad ? 130 : 90,
    width: "100%",
    resizeMode: "cover",
  },
  firstLine: {
    flexDirection: "row",
    marginBottom: 3,
  },
  title: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 12,
  },
  secondLine: {
    flexDirection: "row",
    marginBottom: 9,
  },
  info: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.mediumGrey,
    marginRight: 5,
  },
  thirdLine: {
    flexDirection: "row",
  },
  priceAsking: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "bold",
    flex: 1,
  },
  registration: {
    fontSize: 12,
  },
  sales_statusContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 10,
    fontWeight: "bold",
  },
  sales_statusText: {
    color: "white",
    fontSize: 10,
  },
});

export default memo(Card, arePropsEqual);
