import { AsyncStorage } from "react-native";
import dayjs from "dayjs";

/**
 * This module contains the logic of caching data.
 * @module utility/cache
 */

const prefix = "cache";
const expiryInMinutes = 5;

/**
 * Store the data returned from the api call into the cache.
 * @param {string} key - the key of the key-value pair of the JSON object
 * @param {string} value - the value of the key-value pair of the JSON object
 */
const store = async (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now,
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

/**
 * Determines whether the cache is expired.
 * @param {string} item - the item that stored in the cache.
 */
const isExpired = (item) => {
  const now = dayjs();
  const storedTime = dayjs(item.timestamp);
  return now.diff(storedTime, "minute") > expiryInMinutes;
};

/**
 * Retrive the cache based on the key of the cache.
 * @param {string} key - key of the JSON object of the stored in the cache
 */
const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);

    if (!item) return null;

    if (isExpired(item)) {
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }
    return item.value;
  } catch (error) {
    console.log(error);
  }
};

export default {
  store,
  get,
};
