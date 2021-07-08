import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import ActivityIndicator from "../../components/ActivityIndicator";

import User from "./components/User";

import useApi from "../../hooks/useApi";
import settingsApi from "../../api/settings";
import client from "../../api/client";
import routes from "../../navigation/routes";
import Message from "./components/Message";
import AppButton from "../../components/AppButton";

function UsersScreen({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();

  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState();

  const getUsersApi = useApi(settingsApi.getUser);
  const patchUserApi = useApi((id, payload) =>
    settingsApi.patchUserPermission(id, payload)
  );
  const deleteUserApi = useApi((id) => settingsApi.deleteUser(id));

  /**
   * Handle the change of permissions of a user.
   *
   * @param {string} id user ID
   */
  const handlePatch = async (id) => {
    const result = await patchUserApi.request(id, { permissions: "1" });
    setMessage(result.data.message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
    getUsersApi.request();
  };

  /**
   * Handle the delete user action.
   *
   * @param {string} id user ID
   */
  const handleDelete = async (id) => {
    const result = await deleteUserApi.request(id);
    setMessage(result.data.message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
    getUsersApi.request();
  };

  useEffect(() => {
    getUsersApi.request();
  }, []);

  return (
    <>
      <LinearGradient
        colors={["#143C4B", "#0E262F"]}
        style={styles.background}
      />
      <ActivityIndicator
        visible={
          getUsersApi.loading || deleteUserApi.loading || patchUserApi.loading
        }
      />
      <AppButton
        title="New User"
        backgroundColor={null}
        style={styles.newUserButton}
        onPress={() => navigation.navigate(routes.NEW_USER)}
      />
      <FlatList
        data={getUsersApi.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <User
            data={item}
            onSetAdminPress={(id) => handlePatch(id)}
            onDeletePress={(id) => handleDelete(id)}
          />
        )}
        refreshing={refreshing}
        onRefresh={() => getUsersApi.request()}
        contentContainerStyle={styles.flatlist}
        style={{ marginBottom: tabBarHeight }}
      />
      <Message message={message} />
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  newUserButton: {
    alignSelf: "flex-end",
    marginRight: 20,
  },
  flatlist: {
    padding: 20,
  },
});

export default UsersScreen;
