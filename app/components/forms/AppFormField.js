import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import AppErrorMessage from "./AppErrorMessage";

/**
 * A field of a form, consist of an icon, text input and an error message.
 * @module components/forms/AppFormField
 * @param {string} name - the name of the field defined by the consumer of this component
 * @param {string|number} style - the style of the component container
 * @param {} otherProps - other properties to add to the text input component
 */
const AppFormField = ({ name, style, ...otherProps }) => {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();
  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        style={style}
        {...otherProps}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormField;
