import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewCarScreen from "../screens/NewCarScreen";
import VehicleDetailScreen from "../screens/VehicleDetailScreen";
import routes from "./routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

const Stack = createStackNavigator();

const NewCarNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerBackTitle: "",
      headerTitleStyle: { marginHorizontal: 10 },
      headerBackImage: () => (
        <MaterialCommunityIcons
          name="arrow-left"
          size={32}
          color={defaultStyles.colors.primary}
          style={{ paddingHorizontal: 10 }}
        />
      ),
    }}
  >
    <Stack.Screen
      name={routes.NEW_CAR}
      component={NewCarScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.VEHICLE_DETAIL}
      component={VehicleDetailScreen}
    />
  </Stack.Navigator>
);

export default NewCarNavigator;
