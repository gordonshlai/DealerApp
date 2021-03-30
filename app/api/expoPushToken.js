import client from "./client";

const register = (expoPushToken) =>
  client.post("api/expoPushToken", { expoPushToken: expoPushToken });

export default {
  register,
};
