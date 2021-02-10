import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

/**
 * A custom text input component of the application
 * @module components/AppTextInput
 * @param {string} icon - the name of the icon
 * @param {string|number} width - the width of the component
 * @param {} otherProps - all other properties to add into the text component
 */
const AppTextInput = ({ icon, style, color, ...otherProps }) => {
  return (
    <View style={[styles.container, style]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={16}
          color={defaultStyles.colors.mediumGrey}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={"#bbb"}
        style={[defaultStyles.text, styles.text, { color: color }]}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: defaultStyles.colors.lightGrey,
    borderBottomWidth: 1,
    flexDirection: "row",
    padding: 12,
    marginVertical: 7,
    alignItems: "center",
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
});

export default AppTextInput;
