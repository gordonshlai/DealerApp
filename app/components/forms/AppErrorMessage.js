import React from "react";
import { StyleSheet } from "react-native";
import AppText from "../AppText";

/**
 * The error message for a form, only shows if there are error arrose from the input in the form,
 * or the user leaves the form field without fullfilling the requirements of the corresponding field.
 * @module components/forms/ErrorMessage
 * @param {string} error - the error message
 * @param {boolean} visible - boolean determining visibility of the error message
 */
const ErrorMessage = ({ error, visible }) => {
  if (!error || !visible) return null;
  return <AppText style={styles.error}>{error}</AppText>;
};

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});

export default ErrorMessage;
