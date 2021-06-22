import React from "react";
import { Formik } from "formik";

/**
 * A wrapper around a formik component.
 * @module components/forms/AppForm
 * @param {string} initialValues - the initial value inside the form field before editing
 * @param {function} onSubmit - the function to execute when the form submits
 * @param {Yup.ObjectSchema} validationSchema - the Yup validation schema
 * @param {object} children - the components to render inside the form
 */
const AppForm = ({ initialValues, onSubmit, validationSchema, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
};

export default AppForm;
