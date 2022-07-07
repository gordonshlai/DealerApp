import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MessagesScreen from "../screens/MessagesScreen";
import MessageDetailScreen from "../screens/MessageDetailScreen";
import Menu from "../components/Menu";

import routes from "./routes";
import defaultStyles from "../config/styles";

const Stack = createStackNavigator();

const MessageNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      ...defaultStyles.stackNavigator,
      headerRight: () => <Menu />,
    }}
  >
    <Stack.Screen name={routes.MESSAGES_INNER} component={MessagesScreen} />
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
