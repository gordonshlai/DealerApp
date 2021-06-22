import React from "react";
import { useFormikContext } from "formik";

import AppErrorMessage from "./AppErrorMessage";
import AppDateTimePicker from "../AppDateTimePicker";

/**
 *
 * A field of a form, consist of an icon, date time picker and an error message.
 *
 * @param {string} icon The name of the icon
 * @param {string} name The name of the field defined by the consumer of this component
 * @param {string} placeholder The string to display as the placeholder when the field is empty
 * @param {string|number} width The width of the component
 * @param {function} onSelectDate The function to be called when the date is selected
 * @param {boolean} disabled to disable the field
 */
function AppFormDateTimePicker({
  icon,
  name,
  placeholder = "Please Select",
  width,
  onSelectDate,
  disabled,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <AppDateTimePicker
        icon={icon}
        onSelectDate={(date) => {
          setFieldValue(name, new Date(date));
          onSelectDate ? onSelectDate(date) : null;
        }}
        placeholder={placeholder}
        selectedDate={values[name]}
        width={width}
        disabled={disabled}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormDateTimePicker;
