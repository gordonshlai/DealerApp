import { useEffect } from "react";
import * as Permissions from "expo-permissions";
import expoPushTokenApi from "../api/expoPushToken";
import * as Notifications from "expo-notifications";

export default useNotifications = (notificationListener) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  useEffect(() => {
    registerForPushNotification();
    if (notificationListener)
      Notifications.addNotificationResponseReceivedListener(
        notificationListener
      );
  }, []);

  const registerForPushNotification = async () => {
    try {
      const permission = await Notifications.requestPermissionsAsync();
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      expoPushTokenApi.register(token.data);
      console.log(token);
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };
};
