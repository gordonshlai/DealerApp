import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";

import defaultStyles from "../config/styles";

function Info({
  name,
  color = defaultStyles.colors.darkGrey,
  size = 18,
  text,
  textStyle,
}) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={name} color={color} size={size} />
      <AppText
        style={[
          {
            color,
            fontSize: size,
            paddingLeft: 5,
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
    paddingHorizontal: 10,
  },
});

export default Info;
