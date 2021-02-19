import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TradeScreen from "../screens/TradeScreen";
import TradeDetailScreen from "../screens/TradeDetailScreen";

import routes from "./routes";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Menu from "../components/Menu";

const Stack = createStackNavigator();

const TradeNavigator = () => {
  return (
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
      <Stack.Screen name={routes.TRADE} component={TradeScreen} />
      <Stack.Screen
        name={routes.TRADE_DETAIL}
        component={TradeDetailScreen}
        options={({ route }) => ({
          headerTitle: route.params.title,
        })}
      />
    </Stack.Navigator>
  );
};

export default TradeNavigator;
