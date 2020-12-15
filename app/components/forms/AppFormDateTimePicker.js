import React from "react";
import { useFormikContext } from "formik";

import AppErrorMessage from "./AppErrorMessage";
import AppDateTimePicker from "../AppDateTimePicker";

function AppFormDateTimePicker({
  icon,
  name,
  placeholder,
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
