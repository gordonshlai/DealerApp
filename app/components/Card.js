import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Registration from "./Registration";

import AppText from "./AppText";
import colors from "../config/colors";
import defaultStyles from "../config/styles";

const vehicleStatusArray = ["In Stock", "Sold", "Trade Listed", "Sold"];

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
  const numberWithCommas = (x) => {
    var parts = x.toString().split(".");
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

export default Card;
