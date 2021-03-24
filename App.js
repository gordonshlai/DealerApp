import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import AuthContext from "./app/auth/context";
import AppNavigator from "./app/navigation/AppNavigator";
import authStorage from "./app/auth/storage";

import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import client from "./app/api/client";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import OnboardingScreen from "./app/screens/OnboardingScreen";
import routes from "./app/navigation/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppStack = createStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState("null");
  const [authToken, setAuthToken] = useState();
  const [isReady, setIsReady] = useState(false);
  const [unread, setUnread] = useState(null);
  const [loadMessagesFlag, setLoadMessagesFlag] = useState(false);
  const [loadTradeFlag, setLoadTradeFlag] = useState(false);
  const [loadTradeDetailFlag, setLoadTradeDetailFlag] = useState(false);
  const [loadInventoryFlag, setLoadInventoryFlag] = useState(false);
  const [loadInventoryDetailFlag, setLoadInventoryDetailFlag] = useState(false);

  useEffect(() => {
    repeatRequest();
  }, [authToken]);

  useEffect(() => {
    firstLaunch();
  }, []);

  const firstLaunch = () => {
    // AsyncStorage.removeItem("alreadyLaunched");

    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  };

  const repeatRequest = async () => {
    if (!authToken) return;

    const storageToken = await authStorage.getToken();
    if (!storageToken) return;

    const user = await client.get("api/user");
    if (!user.ok) return;

    const result = await client.get("api/inbox/unread");
    console.log(result.data);
    setUnread(result.data);

    setTimeout(() => {
      repeatRequest();
    }, 30000);
  };

  /**
   * restore the authentication json web token from the secure storage of the application.
   */
  const restoreToken = async () => {
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
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreToken} onFinish={() => setIsReady(true)} />
    );
  if (isFirstLaunch === null) {
    return null;
  } else {
    return (
      <AuthContext.Provider
        value={{
          setIsFirstLaunch,
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
        <NavigationContainer theme={navigationTheme}>
          <StatusBar barStyle="light-content" />
          {isFirstLaunch ? (
            <OnboardingScreen />
          ) : (
            <>{authToken ? <AppNavigator /> : <AuthNavigator />}</>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
}
