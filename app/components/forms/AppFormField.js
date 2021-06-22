import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import AppErrorMessage from "./AppErrorMessage";

/**
 * A field of a form, consist of an icon, text input and an error message.
 * @module components/forms/AppFormField
 * @param {string} name - the name of the field defined by the consumer of this component
 * @param {string|number} style - the style of the component container
 * @param {string} color - the color of the text of the component
 * @param {number} size - the size of the text of the component
 * @param {} otherProps - other properties to add to the text input component
 */
const AppFormField = ({ icon, name, style, color, size, ...otherProps }) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        style={style}
        color={color}
        size={size}
        icon={icon}
        {...otherProps}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormField;
