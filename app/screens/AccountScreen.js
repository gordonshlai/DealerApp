import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView, Modal } from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import * as Yup from "yup";

import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import client from "../api/client";
import colors from "../config/colors";
import Screen from "../components/Screen";
import {
  AppErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";
import { ListItem, ListItemSeparator } from "../components/lists";
import Icon from "../components/Icon";
import AppTextInput from "../components/AppTextInput";
import { RefreshControl } from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";
import Info from "../components/Info";

const detailsValidationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().min(8).label("Email"),
});
const changePasswordValidationSchema = Yup.object().shape({
  current_password: Yup.string().required().label("Password"),
  password_1: Yup.string()
    .required()
    .label("New Password")
    .matches(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})",
      "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number."
    ),
  password_2: Yup.string().oneOf(
    [Yup.ref("password_1"), null],
    "New Password must match"
  ),
});

function AccountScreen(props) {
  const { logOut } = useAuth();

  const [error, setError] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [updatedMessage, setUpdatedMessage] = useState(null);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const getUserApi = useApi(() => client.get("api/user"));
  const patchUserApi = useApi((payload) =>
    client.patch("api/settings/profile/" + getUserApi.data.user.id, payload)
  );
  const patchPasswordApi = useApi((payload) =>
    client.patch("api/settings/password/" + getUserApi.data.user.id, payload)
  );

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const result = await getUserApi.request();
    if (!result.ok) return setError(result.data.message);
  };

  const handleChangeDetailsSubmit = async ({ name, email }) => {
    getUserApi.data.user.name = name;
    getUserApi.data.user.email = email;
    const result = await patchUserApi.request(getUserApi.data.user);
    console.log(result);
    if (!result.ok) return setError(getUserApi.data.message);
    setEditing(false);
    getUser();
    setUpdatedMessage(result.data.message);
    setTimeout(() => {
      setUpdatedMessage(null);
    }, 3000);
  };

  const handleChangePasswordSubmit = async (passwords) => {
    const result = await patchPasswordApi.request(passwords);
    if (!result.ok) return setError(result.data.message);
    setChangePasswordVisible(false);
    setUpdatedMessage(result.data.message);
    setTimeout(() => {
      setUpdatedMessage(null);
    }, 3000);
  };

  return (
    <>
      <ActivityIndicator
        visible={
          getUserApi.loading || patchUserApi.loading || patchPasswordApi.loading
        }
      />
      {getUserApi.error ? (
        <>
          <AppText style={styles.errorMessage}>
            Couldn't retrieve user detail.
          </AppText>
          <AppErrorMessage visible={error} visible={error} />
          <AppButton title="RETRY" onPress={getUser} />
        </>
      ) : (
        <>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getUser} />
            }
          >
            <Image
              source={require("../assets/logo-2.png")}
              style={styles.logo}
            />
            {getUserApi.data.user && (
              <View style={styles.card}>
                <AppForm
                  initialValues={{
                    name: getUserApi.data.user ? getUserApi.data.user.name : "",
                    email: getUserApi.data.user
                      ? getUserApi.data.user.email
                      : "",
                  }}
                  onSubmit={handleChangeDetailsSubmit}
                  validationSchema={detailsValidationSchema}
                >
                  <View style={styles.formFieldContainer}>
                    <AppText style={styles.fieldTitle}>Account ID</AppText>
                    <AppTextInput
                      editable={false}
                      style={styles.nonEditable}
                      value={getUserApi.data.user.account.account_id}
                    />
                  </View>

                  <View style={styles.formFieldContainer}>
                    <AppText style={styles.fieldTitle}>Comapny</AppText>
                    <AppTextInput
                      editable={false}
                      style={styles.nonEditable}
                      value={getUserApi.data.user.account.name}
                    />
                  </View>

                  <View style={styles.formFieldContainer}>
                    <AppText style={styles.fieldTitle}>Name</AppText>
                    <AppFormField
                      autoCapitalize="none"
                      autoCorrect={false}
                      icon="account"
                      name="name"
                      placeholder="Name"
                      editable={editing}
                      onContentSizeChange={() => setError(null)}
                      style={editing ? styles.editable : styles.nonEditable}
                    />
                  </View>

                  <View style={styles.formFieldContainer}>
                    <AppText style={styles.fieldTitle}>Email</AppText>
                    <AppFormField
                      autoCorrect={false}
                      icon="email"
                      name="email"
                      placeholder="Email"
                      editable={editing}
                      onContentSizeChange={() => setError(null)}
                      style={editing ? styles.editable : styles.nonEditable}
                    />
                  </View>
                  <AppErrorMessage error={error} visible={patchUserApi.error} />

                  {!editing ? (
                    <AppButton
                      icon="pencil"
                      title="Edit"
                      color={colors.secondary}
                      onPress={() => setEditing(true)}
                    />
                  ) : (
                    <SubmitButton
                      icon="check"
                      title="Save"
                      color={colors.success}
                    />
                  )}
                </AppForm>
              </View>
            )}
            <View style={styles.listItemsContainer}>
              {!changePasswordVisible ? (
                <ListItem
                  IconComponent={
                    <Icon name="lock-reset" backgroundColor={colors.success} />
                  }
                  title="Change Password"
                  onPress={() => setChangePasswordVisible(true)}
                />
              ) : (
                <View style={styles.card}>
                  <AppForm
                    initialValues={{
                      current_password: "",
                      password_1: "",
                      password_2: "",
                    }}
                    onSubmit={handleChangePasswordSubmit}
                    validationSchema={changePasswordValidationSchema}
                  >
                    <View style={styles.formFieldContainer}>
                      <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="lock-clock"
                        name="current_password"
                        placeholder="Current Password"
                        secureTextEntry
                        onContentSizeChange={() => setError(null)}
                        style={styles.editable}
                      />
                    </View>

                    <View style={styles.formFieldContainer}>
                      <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="lock"
                        name="password_1"
                        placeholder="New Password"
                        secureTextEntry
                        onContentSizeChange={() => setError(null)}
                        style={styles.editable}
                      />
                    </View>

                    <View style={styles.formFieldContainer}>
                      <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="lock-reset"
                        name="password_2"
                        placeholder="Repeat New Password"
                        secureTextEntry
                        style={styles.editable}
                      />
                    </View>
                    <AppErrorMessage
                      error={error}
                      visible={patchPasswordApi.error}
                    />
                    <SubmitButton
                      icon="check"
                      title="Save"
                      color={colors.success}
                    />
                  </AppForm>
                  <AppButton
                    icon="cancel"
                    title="Cancel"
                    color={null}
                    onPress={() => setChangePasswordVisible(false)}
                  />
                </View>
              )}
              <ListItemSeparator />
              <ListItem
                IconComponent={
                  <Icon name="logout" backgroundColor={colors.warning} />
                }
                title="Log Out"
                onPress={() => setLogoutModalVisible(true)}
              />
            </View>
          </ScrollView>

          <Modal
            visible={logoutModalVisible}
            animationType="fade"
            transparent
            onRequestClose={() => setLogoutModalVisible(false)}
          >
            <View style={styles.modal}>
              <AppText style={styles.actionTitle}>Log Out?</AppText>
              <View style={styles.actionButtonsContainer}>
                <AppButton
                  icon="check"
                  title="Confirm"
                  color={colors.warning}
                  onPress={logOut}
                />
                <AppButton
                  icon="cancel"
                  title="Cancel"
                  color={colors.secondary}
                  onPress={() => setLogoutModalVisible(false)}
                />
              </View>
            </View>
          </Modal>

          {updatedMessage && (
            <View style={styles.updatedContainer}>
              <Info
                name="check"
                size={24}
                text={updatedMessage}
                color="white"
                textStyle={styles.updatedText}
              />
            </View>
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  logo: {
    height: 100,
    width: "80%",
    resizeMode: "contain",
    marginTop: 60,
    marginBottom: 10,
    alignSelf: "center",
  },
  card: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },
  fieldTitle: {
    fontWeight: "bold",
  },
  formFieldContainer: {
    marginBottom: 10,
  },
  editable: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  nonEditable: {
    backgroundColor: colors.lightGrey,
  },
  listItemsContainer: {
    marginBottom: 20,
  },
  modal: {
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: colors.lightGrey + "ee",
    flex: 1,
  },
  actionTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  updatedContainer: {
    backgroundColor: colors.success + "ee",
    position: "absolute",
    top: 50,
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    zIndex: 1,
  },
  updatedText: {
    fontWeight: "bold",
  },
});

export default AccountScreen;
