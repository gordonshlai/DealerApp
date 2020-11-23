import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

/**
 * The submit button of a form
 * @module components/forms/SubmitButton
 * @param {string} title - the text to display on the button
 * @param {string} color - the background color of the button
 */
const SubmitButton = ({ icon, title, color }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton icon={icon} color={color} title={title} onPress={handleSubmit} />
  );
};

export default SubmitButton;
