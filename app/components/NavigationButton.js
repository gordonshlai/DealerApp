import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import colors from "../config/colors";
import defaultStyles from "../config/styles";
import AppText from "./AppText";

function NavigationButton({ onPress, icon, title }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={[colors.primary, "#F83600"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.linearGradient}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
      </View>
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
  cardTitle: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 10,
    marginHorizontal: 3,
    color: "white",
    textAlign: "left",
  },
});

export default NavigationButton;
