import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

/**
 * The submit button of a form
 * @module components/forms/SubmitButton
 * @param {string} icon - the name of the icon
 * @param {string} title - the text to display on the button
 * @param {string} backgroundColor - the background color of the button
 * @param {string} color - the text color of the button
 * @param {number} size - the size of the text of the button
 * @param {object} style - the styles of the button
 */
const SubmitButton = ({ icon, title, backgroundColor, color, size, style }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton
      icon={icon}
      title={title}
      backgroundColor={backgroundColor}
      color={color}
      size={size}
      style={style}
      onPress={handleSubmit}
    />
  );
};

export default SubmitButton;
