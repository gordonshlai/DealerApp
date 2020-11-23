import React from "react";
import { StyleSheet } from "react-native";
import AppText from "../AppText";

/**
 * The error message for a form, only shows if there are error arrose from the input in the form,
 * or the user leaves the form field without fullfilling the requirements of the corresponding field.
 * @module components/forms/ErrorMessage
 * @param {string} error - the error that returns from formik
 * @param {boolean} visible - the value that returns from formik based on whether the
 *                            corresponding firm field is touched.
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
