import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import InventoryScreen from "../screens/InventoryScreen";
import InventoryDetailScreen from "../screens/InventoryDetailScreen";
import routes from "./routes";
import colors from "../config/colors";
import VehicleDetailScreen from "../screens/VehicleDetailScreen";
import VehicleDescriptionScreen from "../screens/VehicleDescriptionScreen";
import Menu from "../components/Menu";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const InventoryNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerBackTitle: "",
      headerTitleStyle: { marginHorizontal: 10 },
      headerStyle: {
        backgroundColor: colors.secondary,
        shadowColor: "transparent",
        elevation: 0,
      },
      headerTintColor: "white",
      headerBackImage: () => (
        <MaterialCommunityIcons
          name="chevron-left"
          size={32}
          color={colors.primary}
          style={{ paddingHorizontal: 10 }}
        />
      ),
      headerRight: () => <Menu />,
    }}
  >
    <Stack.Screen name={routes.INVENTORY} component={InventoryScreen} />
    <Stack.Screen
      name={routes.INVENTORY_DETAIL}
      component={InventoryDetailScreen}
      options={({ route }) => ({
        headerTitle: route.params.title
          ? route.params.title
          : route.params.make + " " + route.params.model,
      })}
    />
    <Stack.Screen
      name={routes.VEHICLE_DETAIL}
      component={VehicleDetailScreen}
    />
    <Stack.Screen
      name={routes.VEHICLE_DESCRIPTION}
      component={VehicleDescriptionScreen}
    />
  </Stack.Navigator>
);

export default InventoryNavigator;
