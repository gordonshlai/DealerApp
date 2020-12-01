import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";

function Info({ name, color, size = 18, text }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={name} color={color} size={size} />
      <AppText style={{ color, paddingHorizontal: 5 }}>{text}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Info;
