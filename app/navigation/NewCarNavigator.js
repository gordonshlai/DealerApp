import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NewCarScreen from "../screens/newCar/NewCarScreen";
import VehicleDetailScreen from "../screens/newCar/VehicleDetailScreen";
import Menu from "../components/Menu";

import routes from "./routes";
import defaultStyles from "../config/styles";

const Stack = createStackNavigator();

const NewCarNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      ...defaultStyles.stackNavigator,
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
