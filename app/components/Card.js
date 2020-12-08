import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
// import { Image } from "react-native-expo-image-cache";

import AppText from "./AppText";
import defaultStyles from "../config/styles";
import Info from "./Info";
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
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <Image
              style={styles.image}
              tint="light"
              source={{ uri: imageUrl }}
            />
          ) : (
            <MaterialCommunityIcons name="car" size={200} color="white" />
          )}
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.firstLine}>
            <AppText style={styles.title} numberOfLines={2}>
              {title ? title : make + " " + model}
            </AppText>
          </View>
          <View style={styles.secondLine}>
            <Info name="calendar" text={year} />
            <Info name="speedometer" text={numberWithCommas(mileage) + " mi"} />
            <Info name="engine" text={engineCapacity + " cc"} />
          </View>
          <View style={styles.thirdLine}>
            <AppText style={styles.priceAsking} numberOfLines={1}>
              £{priceAsking === "0.00" ? " POA" : numberWithCommas(priceAsking)}
            </AppText>
            <Registration registration={registration} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  imageContainer: {
    height: 200,
    width: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },
  image: {
    height: 200,
    width: "100%",
  },
  firstLine: {
    flexDirection: "row",
    marginBottom: 7,
  },
  title: {
    fontWeight: "bold",
  },
  secondLine: {
    flexDirection: "row",
    marginBottom: 7,
    justifyContent: "space-around",
  },
  thirdLine: {
    flexDirection: "row",
  },
  priceAsking: {
    color: defaultStyles.colors.success,
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
});

export default Card;
