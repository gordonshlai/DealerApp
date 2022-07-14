import client from "./client";

/**
 * This module contains all the logic sending requests to the api/inventory endpoint.
 * @module api/inventory
 */

const endpoint = "api/inventory";

/**
 * Send a GET request to the api/inventory/vehicles end point
 *
 * @param {string} make the make of the vehicles
 * @param {string} status the status of the vehicles (in stock/ listed/ sold)
 * @param {string|number} pageCurrent the current page for the pagination
 * @param {string} search the string search against the vehicle title
 * @returns list of vehicles in the inventory
 */
const getInventory = (make, status, pageCurrent, search) =>
  client.get(
    `${endpoint}/vehicles?make=${make}&status=${status}page=${pageCurrent}&search=${search}`
  );

/**
 * Send a GET request to the api/inventory/makes end point
 *
 * @returns a list of car makes
 */
const getMakes = () => client.get(`${endpoint}/makes`);

export default { getInventory, getMakes };
