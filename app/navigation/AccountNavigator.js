import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/account/AccountScreen";
import PaymentCardsScreen from "../screens/account/PaymentCardsScreen";
import NewCardScreen from "../screens/account/NewCardScreen";
import MarginScreen from "../screens/account/MarginScreen";
import UsersScreen from "../screens/account/UsersScreen";
import NewUserScreen from "../screens/account/NewUserScreen";
import Menu from "../components/Menu";

import routes from "./routes";
import defaultStyles from "../config/styles";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      ...defaultStyles.stackNavigator,
      headerRight: () => <Menu />,
    }}
  >
    <Stack.Screen
      name={routes.ACCOUNT}
      component={AccountScreen}
      options={{ title: null }}
    />
    <Stack.Screen name={routes.PAYMENT_CARDS} component={PaymentCardsScreen} />
    <Stack.Screen name={routes.NEW_CARD} component={NewCardScreen} />
    <Stack.Screen name={routes.MARGIN} component={MarginScreen} />
    <Stack.Screen name={routes.USERS} component={UsersScreen} />
    <Stack.Screen name={routes.NEW_USER} component={NewUserScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
