import client from "./client";

/**
 * This module contains all the logic sending requests to the api/settings endpoint.
 */
const endpoint = "api/settings";

/**
 * Send a GET request to the api/settings/users/account endpoint.
 * Get the dealership's users.
 */
const getUser = () => client.get(`${endpoint}/users/account`);

/**
 * Send a PATCH request to the api/settings/profile endpoint.
 * Changes the user's detail.
 *
 * @param {number} userId The user ID
 * @param {object} payload parameters to sent to the endpoint
 */
const patchUser = (userId, payload) =>
  client.patch(`${endpoint}/profile/${userId}`, payload);

/**
 * Send a POST request to the api/settings/users endpoint.
 * Adding a new user.
 *
 * @param {object} payload parameters to sent to the endpoint
 * @param {object} options axios options
 */
const postUser = (payload, options) =>
  client.post(`${endpoint}/users`, payload, options);

/**
 * Send a PATCH request to the api/settings/users/{userId} endpoint.
 * Changing the permissions of a user.
 *
 * @param {string} id the user ID
 * @param {object} payload parameters to sent to the endpoint
 */
const patchUserPermission = (id, payload) =>
  client.patch(`${endpoint}/users${id}`, payload);

/**
 * Send a DELETE request to the api/settings/users/{userId} endpoint.
 * Delete a user.
 *
 * @param {string} id the user ID
 */
const deleteUser = (id) => client.delete(`${endpoint}/users${id}`);

/**
 * Send a PATCH request to the api/settings/password/{userId} endpoint.
 * Changing the password.
 *
 * @param {number} userId The user ID
 * @param {object} payload parameters to sent to the endpoint
 */
const patchPassword = (userId, payload) =>
  client.patch(`${endpoint}/password/${userId}`, payload);

/**
 * Send a GET request to the api/settings/margin/account endpoint.
 * Getting the current margin.
 */
const getMargin = () => client.get(`${endpoint}/margin/account`);

/**
 * Send a PATCH request to the api/settings/margin/{userId} endpoint.
 * Changing the margin.
 *
 * @param {number} userId The user ID
 * @param {object} payload parameters to sent to the endpoint
 */
const patchMargin = (userId, payload) =>
  client.patch(`${endpoint}/margin/${userId}`, payload);

/**
 * Send a GET request to the api/settings/payment/user endpoint.
 * Get the payment cards.
 */
const getPayment = () => client.get(`${endpoint}/payment/user`);

/**
 * Send a POST request to the api/settings/payment endpoint.
 * Adding a new card.
 *
 * @param {object} payload parameters to sent to the endpoint
 */
const postPayment = (payload) => client.post(`${endpoint}/payment`, payload);

/**
 * Send a PATCH request to the api/settings/payment/{id} endpoint.
 * Setting the card as the default payment card.
 *
 * @param {object} id card ID
 */
const patchPayment = (id) => client.patch(`${endpoint}/payment/${id}`);

/**
 * Send a DELETE request to the api/settings/payment/{id} endpoint.
 * Delete a payment card.
 *
 * @param {object} id card ID
 */
const deletePayment = (id) => client.delete(`${endpoint}/payment/${id}`);

export default {
  getUser,
  patchUser,
  postUser,
  patchUserPermission,
  deleteUser,
  patchPassword,
  getMargin,
  patchMargin,
  getPayment,
  postPayment,
  patchPayment,
  deletePayment,
};
