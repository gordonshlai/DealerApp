import Constants from "expo-constants";

/**
 * This module contains the logic for setting up the base URL depending on the
 * environment of the application.
 * @module config/settings
 */

const settings = {
  dev: {
    apiUrl: "https://dev-dealer.warrantywise.co.uk/app/",
    // apiUrl: "http://ed1e89d6275d.ngrok.io/app/",
    tradeEnv: "1",
  },
  staging: {
    apiUrl: "https://dev-dealer.warrantywise.co.uk/app/",
    tradeEnv: "1",
  },
  prod: {
    apiUrl: "https://dealer.warrantywise.co.uk/app/",
    tradeEnv: "1",
  },
};

/**
 * Returning the base URL for different environment of the application, development, staging or production.
 * @returns - the base URL of the application.
 */
const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
