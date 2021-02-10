import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import SignInScreen from "../screens/SignInScreen";
import RegisterScreen1 from "../screens/RegisterScreen1";
import RegisterScreen2 from "../screens/RegisterScreen2";
import RegisterScreen3 from "../screens/RegisterScreen3";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

import routes from "./routes";

import defaultStyles from "../config/styles";

const Stack = createStackNavigator();

/**
 * The stack navigator for the authentication process, including the following screens:
 * Welcome screen, Login Screens, Register screens, Reset Password screen.
 * @module navigation/AuthNavigator
 */
const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: defaultStyles.colors.primary },
      headerTintColor: defaultStyles.colors.white,
      headerShown: false,
    }}
  >
    <Stack.Screen name={routes.WELCOME} component={WelcomeScreen} />
    <Stack.Screen name={routes.SIGN_IN} component={SignInScreen} />
    <Stack.Screen name={routes.REGISTER_1} component={RegisterScreen1} />
    <Stack.Screen name={routes.REGISTER_2} component={RegisterScreen2} />
    <Stack.Screen name={routes.REGISTER_3} component={RegisterScreen3} />
    <Stack.Screen
      name={routes.RESET_PASSWORD}
      component={ResetPasswordScreen}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
