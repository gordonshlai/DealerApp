import React, { useContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import Svg, { Path, G, Circle } from "react-native-svg";

import TradeNavigator from "./TradeNavigator";
import InventoryNavigator from "./InventoryNavigator";
import NewCarButton from "./NewCarButton";
import NewCarNavigator from "./NewCarNavigator";
import MessageNavigator from "./MessageNavigator";

import defaultStyles from "../config/styles";
import routes from "./routes";
import AuthContext from "../auth/context";
import colors from "../config/colors";
import AccountNavigator from "./AccountNavigator";
import AccountIcon from "../components/icons/AccountIcon";
import CarIcon from "../components/icons/CarIcon";
import MessagesIcon from "../components/icons/MessagesIcon";
import TradeCarsIcon from "../components/icons/TradeCarsIcon";

const Tab = createBottomTabNavigator();
const tabHiddenRoutes = [routes.TRADE_DETAIL, routes.INVENTORY_DETAIL];

/**
 * The bottom tab navigator, including the following screens:
 * Home Screen, InventoryScreen, NewCarScreen, MessagesScreen, Account Screen.
 * @module navigation/AppNavigator
 */
const AppNavigator = () => {
  const { unread } = useContext(AuthContext);
  const [tabBarButtonVisible, setTabBarButtonVisible] = useState(true);

  const hideTabBar = (navigation, route) => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarVisible: false });
      setTabBarButtonVisible(false);
    } else {
      navigation.setOptions({ tabBarVisible: true });
      setTabBarButtonVisible(true);
    }
  };

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
          tabBarIcon: ({ color, size }) => <TradeCarsIcon color={color} />,
        }}
        listeners={({ navigation, route }) => ({
          state: hideTabBar(navigation, route),
        })}
      />

      <Tab.Screen
        name={routes.INVENTORY}
        component={InventoryNavigator}
        options={{ tabBarIcon: ({ color, size }) => <CarIcon color={color} /> }}
        listeners={({ navigation, route }) => ({
          state: hideTabBar(navigation, route),
        })}
      />

      <Tab.Screen
        name={routes.NEW_CAR}
        component={NewCarNavigator}
        options={({ navigation }) => ({
          tabBarButton: () =>
            tabBarButtonVisible && (
              <NewCarButton
                onPress={() => navigation.navigate(routes.NEW_CAR)}
              />
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
