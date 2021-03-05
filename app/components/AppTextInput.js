import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

/**
 * A custom text input component of the application
 * @module components/AppTextInput
 * @param {string} icon - the name of the icon
 * @param {string|number} width - the width of the component
 * @param {} otherProps - all other properties to add into the text component
 */
const AppTextInput = ({ icon, style, color, size = 14, ...otherProps }) => {
  return (
    <View style={[styles.container, style]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={size}
          color={color ? color : colors.mediumGrey}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={"#bbb"}
        style={[
          defaultStyles.text,
          styles.text,
          color && { color: color },
          size && { fontSize: size },
        ]}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.lightGrey,
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
