import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import InventoryScreen from "../screens/InventoryScreen";
import InventoryDetailScreen from "../screens/InventoryDetailScreen";
import routes from "./routes";
import colors from "../config/colors";
import Menu from "../components/Menu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NewCarNavigator from "./NewCarNavigator";

const Stack = createStackNavigator();

const InventoryNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerBackTitle: "",
      textTransform: "uppercase",
      headerTitleStyle: {
        marginHorizontal: 10,
        fontWeight: "bold",
        textTransform: "uppercase",
      },
      headerStyle: {
        backgroundColor: colors.secondary,
        shadowColor: "transparent",
        elevation: 0,
      },
      headerTintColor: "white",
      headerTitleAlign: "center",
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
    {/* <Stack.Screen
      name={routes.VEHICLE_DETAIL}
      component={VehicleDetailScreen}
    /> */}
  </Stack.Navigator>
);

export default InventoryNavigator;
