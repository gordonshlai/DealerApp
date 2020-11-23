import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import AppErrorMessage from "./AppErrorMessage";

/**
 * A field of a form, consist of an icon, text input and an error message.
 * @module components/forms/AppFormField
 * @param {string} name - the name of the field defined by the consumer of this component
 * @param {string|number} width - the width of the component
 * @param {} otherProps - other properties to add to the text input component
 */
const AppFormField = ({ name, width, ...otherProps }) => {
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
        width={width}
        {...otherProps}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormField;
