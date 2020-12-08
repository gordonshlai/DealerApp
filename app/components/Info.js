import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";

function Info({ name, color, size = 18, text, textStyle }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={name} color={color} size={size} />
      <AppText
        style={[
          {
            color,
            fontSize: size,
            paddingHorizontal: 5,
          },
          textStyle,
        ]}
      >
        {text}
      </AppText>
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
