import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "../screens/MessagesScreen";
import MessageDetailScreen from "../screens/MessageDetailScreen";
import routes from "./routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import Menu from "../components/Menu";
import colors from "../config/colors";

const Stack = createStackNavigator();

const MessageNavigator = () => (
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
    <Stack.Screen name={routes.MESSAGES} component={MessagesScreen} />
    <Stack.Screen
      name={routes.MESSAGE_DETAIL}
      component={MessageDetailScreen}
      options={({ route }) => ({
        headerTitle: route.params.title,
      })}
    />
  </Stack.Navigator>
);

export default MessageNavigator;
