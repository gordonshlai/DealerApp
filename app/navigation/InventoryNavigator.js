import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import InventoryScreen from "../screens/inventory/InventoryScreen";
import InventoryDetailScreen from "../screens/inventory/InventoryDetailScreen";
import NewCarNavigator from "./NewCarNavigator";
import Menu from "../components/Menu";

import routes from "./routes";
import defaultStyles from "../config/styles";

const Stack = createStackNavigator();

const InventoryNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      ...defaultStyles.stackNavigator,
      headerRight: () => <Menu />,
    }}
  >
    <Stack.Screen name={routes.INVENTORY} component={InventoryScreen} />
    <Stack.Screen
      name={routes.INVENTORY_DETAIL}
      component={InventoryDetailScreen}
      options={({ route }) => ({
        headerTitle:
          route.params.make +
          " " +
          route.params.model +
          " (" +
          route.params.year +
          ")",
      })}
    />
    <Stack.Screen
      name={routes.NEW_CAR}
      component={NewCarNavigator}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default InventoryNavigator;
