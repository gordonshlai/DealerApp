import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TradeScreen from "../screens/TradeScreen";
import TradeDetailScreen from "../screens/TradeDetailScreen";
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
    <Stack.Screen name={routes.TRADE} component={TradeScreen} />
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
