import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  Dimensions,
} from "react-native";

import AppText from "./AppText";

import colors from "../config/colors";

/**
 *
 * The buttons group of the application.
 *
 * @param {array} buttons - the array of strings that containing the name of the buttons
 * @param {object} containerStyle - the style of the container of the entire button group
 * @param {object} buttonContainerStyle - the style of the container of a single button
 * @param {object} selectedButtonStyle - the style of a single button when it is selected
 * @param {number} selectedIndex - the index of the buttons array that is selected
 * @param {object} textStyle - the style of the text
 * @param {object} selectedTextStyle - the style of the text when it is selected
 * @param {function} onPress - the function to be called when the corresponding button is pressed
 * @returns
 */
function ButtonGroup({
  buttons,
  containerStyle,
  buttonContainerStyle = [
    styles.buttonContainerStyle,
    {
      width:
        Dimensions.get("screen").width /
        (buttons.length <= 3 ? buttons.length : 3.5),
    },
  ],
  selectedButtonStyle = [
    styles.buttonContainerStyle,
    {
      width:
        Dimensions.get("screen").width /
        (buttons.length <= 3 ? buttons.length : 3.5),
    },
    styles.selectedButtonStyle,
  ],
  selectedIndex,
  textStyle = styles.textStyle,
  selectedTextStyle = [styles.textStyle, styles.selectedTextStyle],
  onPress,
}) {
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <FlatList
        horizontal
        data={buttons}
        keyExtractor={(button, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableHighlight
            style={
              index === selectedIndex
                ? selectedButtonStyle
                : buttonContainerStyle
            }
            onPress={() => onPress(index)}
          >
            <AppText
              style={index === selectedIndex ? selectedTextStyle : textStyle}
            >
              {item}
            </AppText>
          </TouchableHighlight>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.secondary,
  },
  buttonContainerStyle: {
    backgroundColor: colors.secondary,
  },
  selectedButtonStyle: {
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
  },
  textStyle: {
    fontSize: 12,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    color: colors.mediumGrey,
  },
  selectedTextStyle: {
    color: colors.primary,
  },
});

export default ButtonGroup;
