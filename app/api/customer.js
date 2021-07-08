import client from "./client";

/**
 * This module contains all the logic sending requests to the api/customer endpoint.
 */
const endpoint = "api/customer";

/**
 * Send a POST request to the api/customer/postcode/lookup endpoint.
 * Obtain the addresses from postcode lookup.
 *
 * @param {object} payload parameters to sent to the endpoint
 */
const postcodeLookup = (payload) =>
  client.post(`${endpoint}/postcode/lookup`, payload);

export default {
  postcodeLookup,
};
