import client from "./client";

/**
 * This module contains all the logic sending requests to the /users endpoint.
 * @module api/users
 */

const endpoint = "/users";

/**
 * Send a get request to the users/me end point using the authentication
 * json web token.
 * @param {string} authToken - the authentication json web token of the user
 */
const getUser = (authToken) => client.get(endpoint + "/me", authToken);

/**
 * Send a post request to the users end point, passing the information that the user
 * has input.
 * @param {object} userInfo - the information the user has input, sent from Formik.
 */
const register = (userInfo) => client.post(endpoint, userInfo);

export default { getUser, register };
