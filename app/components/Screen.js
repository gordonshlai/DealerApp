import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View } from "react-native";

/**
 * A wrapper of other components inside a safe area view
 * @module components/Screen
 * @param {object} children - the components to render inside this component
 * @param {object} style - styles to add into the conatiner of this component
 */
function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    // paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
