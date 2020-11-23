import client from "./client";
/**
 * This module contains all the logic sending requests to the /auth endpoint.
 * @module api/auth
 */

const endpoint = "auth/login";
/**
 * Send a post request to the auth end point using the email and password provided by the user.
 * @param {string} email - the user email entered, sent by Formik.
 * @param {string} password - the password entered, sent by Formik
 */
const login = (email, password) => client.post(endpoint, { email, password });

export default {
  login,
};
