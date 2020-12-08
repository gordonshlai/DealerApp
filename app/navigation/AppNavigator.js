import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TradeNavigator from "./TradeNavigator";
import InventoryScreen from "../screens/InventoryScreen";
import MessageScreen from "../screens/MessageScreen";
import AccountScreen from "../screens/AccountScreen";
import NewCarButton from "./NewCarButton";
import NewCarNavigator from "./NewCarNavigator";

import defaultStyles from "../config/styles";
import routes from "./routes";

const Tab = createBottomTabNavigator();

/**
 * The bottom tab navigator, including the following screens:
 * Home Screen, InventoryScreen, NewCarScreen, MessageScreen, Account Screen.
 * @module navigation/AppNavigator
 */
const AppNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: "white",
      activeTintColor: defaultStyles.colors.primary,
      inactiveBackgroundColor: "white",
      inactiveTintColor: defaultStyles.colors.black,
      style: {
        shadowColor: defaultStyles.colors.black,
        shadowRadius: 5,
        shadowOpacity: 0.5,
      },
    }}
  >
    <Tab.Screen
      name={routes.TRADE}
      component={TradeNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="cart-outline"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name={routes.INVENTORY}
      component={InventoryScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="car-multiple"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name={routes.NEW_CAR}
      component={NewCarNavigator}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewCarButton onPress={() => navigation.navigate(routes.NEW_CAR)} />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="plus-circle"
            color={color}
            size={size}
          />
        ),
      })}
    />
    <Tab.Screen
      name={routes.MESSAGE}
      component={MessageScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="message-text-outline"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name={routes.ACCOUNT}
      component={AccountScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="account-outline"
            color={color}
            size={size}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
