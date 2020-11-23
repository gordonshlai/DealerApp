import Constants from "expo-constants";

/**
 * This module contains the logic for setting up the base URL depending on the
 * environment of the application.
 * @module config/settings
 */

const settings = {
  dev: {
    apiUrl: "http://d78b7a9e8c36.ngrok.io/app/",
  },
  staging: {
    apiUrl: "https://dealer.azor.laravel/api/app/",
  },
  prod: {
    apiUrl: "https://dealer.warrantywise.co.uk/api/app/",
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
