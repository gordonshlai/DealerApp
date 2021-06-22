import { useContext } from "react";

import AuthContext from "./context";
import authStorage from "./storage";

/**
 * This module contains all the authentication logics
 * @module auth/useAuth
 */
export default useAuth = () => {
  const { authToken, setAuthToken } = useContext(AuthContext);

  /**
   * Login with the authentication json web token
   * @function login
   * @param {string} authToken - the authentication json web token of the user
   */
  const logIn = (authToken) => {
    setAuthToken(authToken);
    authStorage.storeToken(authToken);
  };

  /**
   * Logout the user
   * @function logOut
   */
  const logOut = () => {
    setAuthToken(null);
    authStorage.removeToken();
  };

  return { authToken, logIn, logOut };
};
