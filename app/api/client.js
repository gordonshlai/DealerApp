import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";
import settings from "../config/settings";
/**
 * This module contains all the logic for the api client.
 * @module api/client
 */

/**
 * The client instance created using ApiSauce, base URL obtained from the configuration.
 * @type {ApisauceInstance}
 */
const apiClient = create({
  baseURL: settings.apiUrl,
});

/**
 * Add a json web token to the header of the request.
 */
apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["Authorization"] = authToken;
});

const get = apiClient.get;
/**
 * Alter the get requests, so that the system will store the response from the
 * request in the cache.
 * @param {string} url - the URL of the server request
 * @param {object} params - the parameters passes to the request
 * @param {AxiosRequestConfig} axiosConfig - Axios request configuration
 */
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);
  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

export default apiClient;
