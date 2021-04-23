import React from "react";
import { useFormikContext } from "formik";

import Picker from "../Picker";
import AppErrorMessage from "./AppErrorMessage";

function AppFormPicker({
  icon,
  items,
  name,
  placeholder,
  width,
  onSelectItem,
  disabled,
}) {
  const { setFieldValue, errors, touched, values } = useFormikContext();

  return (
    <>
      <Picker
        icon={icon}
        items={items}
        onSelectItem={(item) => {
          if (onSelectItem) {
            onSelectItem(item);
          }
          setFieldValue(name, item);
        }}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width}
        disabled={disabled}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
