import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";

import AppText from "../../../components/AppText";

import colors from "../../../config/colors";
import defaultStyles from "../../../config/styles";

/**
 *
 * The button on Home screen navigating to other stack navigators
 *
 * @param {function} onPress Function to be called when the button is pressed.
 * @param {string} icon The name of the icon, referring to https://icons.expo.fyi/
 * @param {string} title The title of the button.
 */
function NavigationButton({ onPress, icon, title }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={[colors.primary, "#F83600"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.linearGradient}
      />
      <View style={styles.iconContainer}>{icon}</View>
      <AppText style={styles.cardTitle}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: Dimensions.get("screen").width * 0.27,
    alignItems: "center",
    zIndex: 1,
    borderRadius: 10,
    ...defaultStyles.shadow,
  },
  linearGradient: {
    height: "100%",
    width: "100%",
    position: "absolute",
    borderRadius: 10,
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: Platform.isPad ? 18 : 12,
    marginBottom: 10,
    marginHorizontal: 3,
    color: "white",
    textAlign: "left",
  },
});

export default NavigationButton;
