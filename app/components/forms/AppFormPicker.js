import React from "react";
import { useFormikContext } from "formik";

import Picker from "../Picker";
import AppErrorMessage from "./AppErrorMessage";

/**
 *
 * @param {string} icon The name of the icon
 * @param {Array} items The fields of the
 * @param {string} name The name of the field defined by the consumer of this component
 * @param {string} placeholder The string to display as the placeholder when the field is empty
 * @param {string|number} width The width of the component
 * @param {function} onSelectDate The function to be called when the item is selected
 * @param {boolean} disabled to disable the field
 */
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
