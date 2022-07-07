import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TradeScreen from "../screens/TradeScreen";
import TradeDetailScreen from "../screens/TradeDetailScreen";
import NewCarNavigator from "./NewCarNavigator";
import Menu from "../components/Menu";

import routes from "./routes";
import defaultStyles from "../config/styles";

const Stack = createStackNavigator();

const TradeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      ...defaultStyles.stackNavigator,
      headerRight: () => <Menu />,
    }}
  >
    <Stack.Screen name={routes.TRADE_INNER} component={TradeScreen} />
    <Stack.Screen
      name={routes.TRADE_DETAIL}
      component={TradeDetailScreen}
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

export default TradeNavigator;
