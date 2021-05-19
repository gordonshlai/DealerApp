import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import HomeNavigator from "./HomeNavigator";
import TradeNavigator from "./TradeNavigator";
import InventoryNavigator from "./InventoryNavigator";
import MessageNavigator from "./MessageNavigator";
import AccountNavigator from "./AccountNavigator";

import AccountIcon from "../components/icons/AccountIcon";
import CarIcon from "../components/icons/CarIcon";
import MessagesIcon from "../components/icons/MessagesIcon";
import TradeCarsIcon from "../components/icons/TradeCarsIcon";
import HomeIcon from "../components/icons/HomeIcon";

import routes from "./routes";
import defaultStyles from "../config/styles";
import colors from "../config/colors";
import AuthContext from "../auth/context";
import { Platform } from "react-native";
import navigation from "./rootNavigation";
import useNotifications from "../hooks/useNotifications";
import WarrantyNavigator from "./WarrantyNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const tabHiddenRoutes = [
  routes.TRADE_DETAIL,
  routes.INVENTORY_DETAIL,
  routes.NEW_CAR,
];

/**
 * The bottom tab navigator, including the following screens:
 * Home Screen, InventoryScreen, NewCarScreen, MessagesScreen, Account Screen.
 * @module navigation/AppNavigator
 */
const AppNavigator = () => {
  const { unread } = useContext(AuthContext);
  useNotifications((notification) => {
    navigation.navigate(routes.MESSAGES);
    console.log(notification);
  });

  const hideTabBar = (navigation, route) => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: defaultStyles.colors.primary,
        inactiveTintColor: "#8B8BA1",
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
        safeAreaInsets: { bottom: Platform.OS === "android" ? 10 : null },
      }}
    >
      <Tab.Screen
        name={routes.HOME}
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
        listeners={({ navigation, route }) => ({
          state: hideTabBar(navigation, route),
        })}
      />

      <Tab.Screen
        name={routes.TRADE}
        component={TradeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <TradeCarsIcon color={color} />,
        }}
        listeners={({ navigation, route }) => ({
          state: hideTabBar(navigation, route),
        })}
      />

      <Tab.Screen
        name={routes.INVENTORY}
        component={InventoryNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <CarIcon color={color} />,
        }}
        listeners={({ navigation, route }) => ({
          state: hideTabBar(navigation, route),
        })}
      />

      <Tab.Screen
        name={routes.WARRANTY}
        component={WarrantyNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="shield-car"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name={routes.MESSAGES}
        component={MessageNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <MessagesIcon color={color} />,
          tabBarBadge: unread ? unread : null,
          tabBarBadgeStyle: {
            backgroundColor: colors.primary,
            color: "white",
            borderColor: "white",
            borderWidth: 1,
          },
        }}
      />

      <Tab.Screen
        name={routes.ACCOUNT}
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <AccountIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
