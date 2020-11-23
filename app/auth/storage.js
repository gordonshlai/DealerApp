import * as SecureStore from "expo-secure-store";
// import jwtDecode from "jwt-decode";

/**
 * This module contains all the logic around the authentication json web token.
 * @module auth/storage
 */

const key = "authToken";

/**
 * Store the authentication json web token in the secure store of the application.
 * @param {string} authToken - the authentication json web token of the user
 */
const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("error storing the auth token", error);
  }
};

/**
 * get the authentication json web token that previously stored in the
 * secure store of the application.
 */
const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("error getting the auth token", error);
  }
};

/**
 * Remove the authentication json web token from the secure store of the application.
 */
const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("error removing the auth token", error);
  }
};

/**
 * Get the user from the decoded json web token.
 */
// const getUser = async () => {
//   const token = await getToken();
//   return token ? jwtDecode(token) : null;
// };

export default {
  getToken,
  // getUser,
  storeToken,
  removeToken,
};
