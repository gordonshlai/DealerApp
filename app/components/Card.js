import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Registration from "./Registration";

function Card({
  title,
  make,
  model,
  year,
  mileage,
  engineCapacity,
  priceAsking,
  registration,
  onPress,
  imageUrl,
}) {
  const numberWithCommas = (x) => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  return (
    <View style={styles.card}>
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
            <AppText style={styles.info}>{year}</AppText>
            <AppText style={styles.info}>
              {numberWithCommas(mileage) + " mi"}
            </AppText>
            <AppText style={styles.info}>{engineCapacity + " cc"}</AppText>
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
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 10,
    width: "48%",
    shadowColor: colors.black,
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: { height: 5 },
    elevation: 10,
  },
  detailsContainer: {
    padding: 10,
  },
  imageContainer: {
    height: 90,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },
  image: {
    height: 90,
    width: "100%",
    resizeMode: "cover",
  },
  firstLine: {
    flexDirection: "row",
    marginBottom: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
  },
  secondLine: {
    flexDirection: "row",
    marginBottom: 9,
    justifyContent: "space-between",
  },
  info: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.mediumGrey,
  },
  thirdLine: {
    flexDirection: "row",
  },
  priceAsking: {
    color: colors.success,
    fontSize: 11,
    fontWeight: "bold",
    flex: 1,
  },
  registration: {
    fontSize: 12,
  },
});

export default Card;
