import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import routes from "./routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import Menu from "../components/Menu";
import colors from "../config/colors";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerBackTitle: "",
      headerStyle: {
        backgroundColor: colors.secondary,
      },
      headerTintColor: "white",
      headerTitleStyle: { marginHorizontal: 10 },
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
    <Stack.Screen name={routes.ACCOUNT} component={AccountScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
