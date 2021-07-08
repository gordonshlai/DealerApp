import client from "./client";

/**
 * This module contains all the logic sending requests to the api/user endpoint.
 * @module api/users
 */

const endpoint = "api/user";

/**
 * Send a GET request to the api/user end point
 *
 */
const getUser = () => client.get(endpoint);

/**
 * Send a post request to the users end point, passing the information that the user
 * has input.
 * @param {object} userInfo - the information the user has input, sent from Formik.
 */
const register = (userInfo) => client.post(endpoint, userInfo);

export default { getUser, register };
