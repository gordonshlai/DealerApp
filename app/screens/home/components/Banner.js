import { Dimensions, Image, StyleSheet, View } from "react-native";
import React from "react";

import defaultStyles from "../../../config/styles";

/**
 * The banner image in HomeScreen
 */
const Banner = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require("../../../assets/Generic-Home-Banner.jpg")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    ...defaultStyles.shadow,
  },
  innerContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    height: (Dimensions.get("window").width - 40) / 1.5,
    width: Dimensions.get("window").width - 40,
    borderRadius: 10,
  },
});
