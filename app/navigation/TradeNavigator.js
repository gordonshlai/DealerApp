import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TradeScreen from "../screens/TradeScreen";
import TradeDetailScreen from "../screens/TradeDetailScreen";
import routes from "./routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

const Stack = createStackNavigator();

const TradeNavigator = () => (
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
      name={routes.TRADE}
      component={TradeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.TRADE_DETAIL}
      component={TradeDetailScreen}
      options={({ route }) => ({
        headerTitle: route.params.title,
      })}
    />
  </Stack.Navigator>
);

export default TradeNavigator;
