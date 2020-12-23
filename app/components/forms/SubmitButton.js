import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

/**
 * The submit button of a form
 * @module components/forms/SubmitButton
 * @param {string} title - the text to display on the button
 * @param {string} color - the background color of the button
 */
const SubmitButton = ({ icon, title, color, size, style }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton
      icon={icon}
      title={title}
      color={color}
      size={size}
      style={style}
      onPress={handleSubmit}
    />
  );
};

export default SubmitButton;
