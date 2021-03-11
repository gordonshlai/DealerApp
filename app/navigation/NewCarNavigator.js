import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import NewCarScreen from "../screens/NewCarScreen";
import VehicleDetailScreen from "../screens/VehicleDetailScreen";
import Menu from "../components/Menu";

import routes from "./routes";
import colors from "../config/colors";

const Stack = createStackNavigator();

const NewCarNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerBackTitle: "",
      headerTitleStyle: { marginHorizontal: 10 },
      headerStyle: {
        backgroundColor: colors.secondary,
        shadowColor: "transparent",
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
    <Stack.Screen name={routes.NEW_CAR} component={NewCarScreen} />
    <Stack.Screen
      name={routes.VEHICLE_DETAIL}
      component={VehicleDetailScreen}
    />
  </Stack.Navigator>
);

export default NewCarNavigator;
