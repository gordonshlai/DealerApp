import Constants from "expo-constants";

/**
 * This module contains the logic for setting up the base URL depending on the
 * environment of the application.
 * @module config/settings
 */
const settings = {
  dev: {
    apiUrl: "https://dev-dealer.warrantywise.co.uk/app/",
    tradeEnv: "1", // "1" means pulling data from the testing database.
  },
  staging: {
    apiUrl: "https://dev-dealer.warrantywise.co.uk/app/",
    tradeEnv: "1",
  },
  prod: {
    apiUrl: "https://dealer.warrantywise.co.uk/app/",
    tradeEnv: "1", // change this to "0" if decided to push the app live. It will pull the data from the live database.
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
