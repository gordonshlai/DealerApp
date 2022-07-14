import client from "./client";
/**
 * This module contains all the logic sending requests to the /auth endpoint.
 * @module api/auth
 */

const endpoint = "auth";
/**
 * Send a post request to the auth end point using the email and password provided by the user.
 * @param {object} info - the login info including email and password, sent by Formik.
 */
const login = (info) => client.post(`${endpoint}/login`, info);

/**
 * Send a post request to the register endpoint.
 * @param {object} info - the register info including sent by Formik.
 */
const register = ({ fullName, businessName, email, password }) =>
  client.post(`${endpoint}/register`, {
    name: fullName,
    note: businessName,
    email,
    password_1: password,
    password_2: password,
  });

/**
 * Send a post request to the auth end point using the email and password provided by the user.
 * @param {object} info - the email sent by Formik.
 */
const reset = (info) => client.post(`${endpoint}/reset`, info);

export default {
  login,
  register,
  reset,
};
