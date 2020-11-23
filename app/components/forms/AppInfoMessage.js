import React from "react";
import { StyleSheet } from "react-native";
import AppText from "../AppText";

/**
 * The info message for a form, only shows if there are info arrose from the input in the form,
 * or the user leaves the form field without fullfilling the requirements of the corresponding field.
 * @module components/forms/InfoMessage
 * @param {string} info - the info that returns from formik
 * @param {boolean} visible - the value that returns from formik based on whether the
 *                            corresponding firm field is touched.
 */
const InfoMessage = ({ info, visible }) => {
  if (!info || !visible) return null;
  return <AppText style={styles.info}>{info}</AppText>;
};

const styles = StyleSheet.create({
  info: {
    color: "green",
  },
});

export default InfoMessage;
