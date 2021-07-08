import client from "./client";

/**
 * This module contains all the logic sending requests to the api/car/warranty endpoint.
 */
const endpoint = "api/car/warranty";

/**
 * Send a POST request to the api/car/warranty/quote endpoint.
 * Adding a new quote.
 *
 * @param {object} payload parameters to sent to the endpoint
 */
const postWarranty = (payload) => client.post(`${endpoint}/quote`, payload);

export default {
  postWarranty,
};
