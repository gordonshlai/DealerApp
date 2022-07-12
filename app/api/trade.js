import settings from "../config/settings";
import client from "./client";

/**
 * This module contains all the logic sending requests to the api/trade endpoint.
 * @module api/trade
 */

const endpoint = "api/trade";

/**
 * Send a GET request to the api/trade end point
 */
const getTrade = () =>
  client.get(
    `${endpoint}/all/inventory?make=all&seller=&env=${settings.tradeEnv}&sortBy=listed-desc&perPage=12&page=1`
  );

/**
 * Send a post request to the users end point, passing the information that the user
 * has input.
 * @param {object} userInfo - the information the user has input, sent from Formik.
 */
// const register = (userInfo) => client.post(endpoint, userInfo);

export default { getTrade };
