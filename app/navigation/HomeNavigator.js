import React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Menu from "../components/Menu";
import HomeScreen from "../screens/HomeScreen";

import routes from "./routes";
import colors from "../config/colors";
import { Platform } from "react-native";
import { Dimensions } from "react-native";
import TradeDetailScreen from "../screens/TradeDetailScreen";
import WarrantywiseNoEye from "../components/logos/WarrantywiseNoEye";
import { View } from "react-native";

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerBackTitle: "",
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
    <Stack.Screen
      name={routes.HOME}
      component={HomeScreen}
      options={{
        headerTitle: () => <WarrantywiseNoEye />,
      }}
    />
  </Stack.Navigator>
);

export default HomeNavigator;
