import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TradeNavigator from "./TradeNavigator";
import InventoryScreen from "../screens/InventoryScreen";
import AccountScreen from "../screens/AccountScreen";
import NewCarButton from "./NewCarButton";
import NewCarNavigator from "./NewCarNavigator";
import MessageNavigator from "./MessageNavigator";

import defaultStyles from "../config/styles";
import routes from "./routes";
import AuthContext from "../auth/context";
import AppText from "../components/AppText";
import colors from "../config/colors";

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
        name={routes.MESSAGES}
        component={MessageNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <>
              <MaterialCommunityIcons
                name="message-text-outline"
                color={color}
                size={size}
              />
              {unread && (
                <View style={styles.unreadBadge}>
                  <AppText style={styles.unreadNumber}>{unread}</AppText>
                </View>
              )}
            </>
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
};

const styles = StyleSheet.create({
  unreadBadge: {
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 0,
    backgroundColor: colors.primary,
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 10,
    justifyContent: "center",
  },
  unreadNumber: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default AppNavigator;
