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
        headerTitle: () => (
          <Image
            source={require("../assets/logo.png")}
            style={{
              width: 120,
              height: 60,
              resizeMode: "contain",
              marginLeft:
                Platform.OS === "android"
                  ? Dimensions.get("window").width / 2 - 60 - 20
                  : 0,
            }}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

export default HomeNavigator;
