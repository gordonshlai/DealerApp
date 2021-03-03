import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TradeScreen from "../screens/TradeScreen";
import TradeDetailScreen from "../screens/TradeDetailScreen";
import NewCarScreen from "../screens/NewCarScreen";
import VehicleDetailScreen from "../screens/VehicleDetailScreen";
import VehicleDescriptionScreen from "../screens/VehicleDescriptionScreen";
import Menu from "../components/Menu";

import routes from "./routes";
import colors from "../config/colors";
import NewCarNavigator from "./NewCarNavigator";

const Stack = createStackNavigator();

const TradeNavigator = () => (
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
    <Stack.Screen name={routes.TRADE} component={TradeScreen} />
    <Stack.Screen
      name={routes.TRADE_DETAIL}
      component={TradeDetailScreen}
      options={({ route }) => ({
        headerTitle: route.params.title,
      })}
    />
    <Stack.Screen
      name={routes.NEW_CAR}
      component={NewCarNavigator}
      options={{ headerShown: false }}
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

export default TradeNavigator;
