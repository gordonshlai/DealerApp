import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";

import TradeNavigator from "./TradeNavigator";
import InventoryNavigator from "./InventoryNavigator";
import NewCarButton from "./NewCarButton";
import NewCarNavigator from "./NewCarNavigator";
import MessageNavigator from "./MessageNavigator";
import AccountScreen from "../screens/AccountScreen";

import defaultStyles from "../config/styles";
import routes from "./routes";
import AuthContext from "../auth/context";
import colors from "../config/colors";
import AccountNavigator from "./AccountNavigator";

const Tab = createBottomTabNavigator();
/**
 * The bottom tab navigator, including the following screens:
 * Home Screen, InventoryScreen, NewCarScreen, MessagesScreen, Account Screen.
 * @module navigation/AppNavigator
 */
const AppNavigator = () => {
  const { unread } = useContext(AuthContext);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: defaultStyles.colors.primary,
        inactiveTintColor: defaultStyles.colors.mediumGrey,
        style: {
          shadowColor: defaultStyles.colors.black,
          shadowRadius: 5,
          shadowOpacity: 0.5,
          elevation: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          keyboardHidesTabBar: true,
          position: "absolute",
        },
      }}
    >
      <Tab.Screen
        name={routes.TRADE}
        component={TradeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="arrow-swap" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.INVENTORY}
        component={InventoryNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="car" color={color} size={size} />
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
        name={routes.MESSAGES}
        component={MessageNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="message-text-outline"
              color={color}
              size={size}
            />
          ),
          tabBarBadge: unread ? unread : null,
          tabBarBadgeStyle: { backgroundColor: colors.primary, color: "white" },
        }}
      />
      <Tab.Screen
        name={routes.ACCOUNT}
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
