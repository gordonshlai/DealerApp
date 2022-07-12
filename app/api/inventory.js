import client from "./client";

/**
 * This module contains all the logic sending requests to the api/inventory endpoint.
 * @module api/inventory
 */

const endpoint = "api/inventory";

/**
 * Send a GET request to the api/trade end point
 */
const getInventory = () => client.get(`${endpoint}/vehicles?make=all&page=1`);

/**
 * Send a post request to the users end point, passing the information that the user
 * has input.
 * @param {object} userInfo - the information the user has input, sent from Formik.
 */
// const register = (userInfo) => client.post(endpoint, userInfo);

export default { getInventory };
