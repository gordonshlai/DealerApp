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
      headerBackImage: () => (
        <MaterialCommunityIcons
          name="arrow-left"
          size={32}
          color={colors.primary}
          style={{ paddingHorizontal: 10 }}
        />
      ),
      headerRight: () => <Menu />,
    }}
  >
    <Stack.Screen name={routes.HOME} component={HomeScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;
