import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import PlaceHolder from "./app/screens/PlaceHolder";

export default function App() {
  const [authToken, setAuthToken] = useState();
  const [isReady, setIsReady] = useState(false);

  /**
   * restore the authentication json web token from the secure storage of the application.
   */
  const restoreToken = async () => {
    const user = await authStorage.getToken();
    if (user) setAuthToken(user);
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreToken} onFinish={() => setIsReady(true)} />
    );
  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      <NavigationContainer theme={navigationTheme}>
        {authToken ? <PlaceHolder /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
