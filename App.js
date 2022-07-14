import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "./app/auth/context";
import AppNavigator from "./app/navigation/AppNavigator";
import authStorage from "./app/auth/storage";
import * as SplashScreen from "expo-splash-screen";

import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import client from "./app/api/client";
import { LogBox, StatusBar } from "react-native";
// import OnboardingScreen from "./app/screens/OnboardingScreen";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from "./app/navigation/rootNavigation";

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  "NativeBase: The contrast ratio of",
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default function App() {
  // const [isFirstLaunch, setIsFirstLaunch] = useState("null");
  const [authToken, setAuthToken] = useState();
  const [isReady, setIsReady] = useState(false);
  const [unread, setUnread] = useState(null);
  const [loadMessagesFlag, setLoadMessagesFlag] = useState(false);
  const [loadTradeFlag, setLoadTradeFlag] = useState(false);
  const [loadTradeDetailFlag, setLoadTradeDetailFlag] = useState(false);
  const [loadInventoryFlag, setLoadInventoryFlag] = useState(false);
  const [loadInventoryDetailFlag, setLoadInventoryDetailFlag] = useState(false);

  useEffect(() => {
    restoreToken();
  }, []);

  /**
   * restore the authentication json web token from the secure storage of the application.
   */
  const restoreToken = async () => {
    try {
      // Keep the splash screen visible while we fetch resources
      await SplashScreen.preventAutoHideAsync();
      const token = await authStorage.getToken();
      if (token) {
        const user = await client.get("api/user");
        if (!user.ok) {
          setAuthToken(null);
          authStorage.removeToken();
          return;
        }
        setAuthToken(token);
      }
    } catch (error) {
      console.warn(error);
    } finally {
      // Tell the application to render
      setIsReady(true);
    }
  };

  const onLayoutRootView = async () => {
    if (isReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    onLayoutRootView();
  }, [isReady]);

  // useEffect(() => {
  //   firstLaunch();
  // }, []);

  // const firstLaunch = () => {
  //   // AsyncStorage.removeItem("alreadyLaunched");

  //   AsyncStorage.getItem("alreadyLaunched").then((value) => {
  //     if (value == null) {
  //       AsyncStorage.setItem("alreadyLaunched", "true");
  //       setIsFirstLaunch(true);
  //     } else {
  //       setIsFirstLaunch(false);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   repeatRequest();
  // }, [authToken]);

  // const repeatRequest = async () => {
  //   if (!authToken) return;

  //   const storageToken = await authStorage.getToken();
  //   if (!storageToken) return;

  //   const user = await client.get("api/user");
  //   if (!user.ok) return;

  //   const result = await client.get("api/inbox/unread");
  //   console.log(result.data);
  //   setUnread(result.data);

  //   setTimeout(() => {
  //     repeatRequest();
  //   }, 30000);
  // };

  if (!isReady) return null;
  return (
    <AuthContext.Provider
      value={{
        // setIsFirstLaunch,
        authToken,
        setAuthToken,
        unread,
        setUnread,
        loadMessagesFlag,
        setLoadMessagesFlag,
        loadTradeFlag,
        setLoadTradeFlag,
        loadTradeDetailFlag,
        setLoadTradeDetailFlag,
        loadInventoryFlag,
        setLoadInventoryFlag,
        loadInventoryDetailFlag,
        setLoadInventoryDetailFlag,
      }}
    >
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <StatusBar barStyle="light-content" />
        {/* {isFirstLaunch ? (
          <OnboardingScreen />
        ) : (
          <>{authToken ? <AppNavigator /> : <AuthNavigator />}</>
        )} */}
        {authToken ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
