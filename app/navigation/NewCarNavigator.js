import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import NewCarScreen from "../screens/NewCarScreen";
import VehicleDetailScreen from "../screens/VehicleDetailScreen";
import VehicleDescriptionScreen from "../screens/VehicleDescriptionScreen";
import routes from "./routes";

import defaultStyles from "../config/styles";
import Menu from "../components/Menu";
import colors from "../config/colors";

const Stack = createStackNavigator();

const NewCarNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerBackTitle: "",
      headerTitleStyle: { marginHorizontal: 10 },
      headerStyle: { backgroundColor: colors.secondary },
      headerTintColor: "white",
      headerBackImage: () => (
        <MaterialCommunityIcons
          name="arrow-left"
          size={32}
          color={defaultStyles.colors.primary}
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
    <Stack.Screen
      name={routes.VEHICLE_DESCRIPTION}
      component={VehicleDescriptionScreen}
    />
  </Stack.Navigator>
);

export default NewCarNavigator;
