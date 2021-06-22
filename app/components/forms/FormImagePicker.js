import React from "react";
import { useFormikContext } from "formik";

import AppErrorMessage from "./AppErrorMessage";
import ImageInputList from "../ImageInputList";

/**
 *
 * A field of a form, consist image picker and an error message.
 *
 * @param {string} name the name of the field defined by the consumer of this component
 */
function FormImagePicker({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const images = values[name];

  const handleAdd = (image) => {
    if (image.height > image.width) {
      return alert("Images must be in landscape orientation.");
    }
    setFieldValue(name, [...images, image]);
  };

  const handleRemove = (imageToRemove) => {
    setFieldValue(
      name,
      images.filter((image) => image !== imageToRemove)
    );
  };

  return (
    <>
      <ImageInputList
        images={images}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormImagePicker;
