import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  RefreshControl,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Yup from "yup";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import {
  AppErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../../components/forms";
import ActivityIndicator from "../../components/ActivityIndicator";
import Screen from "../../components/Screen";
import Message from "./components/Message";

import routes from "../../navigation/routes";
import userApi from "../../api/users";
import settingsApi from "../../api/settings";
import useAuth from "../../auth/useAuth";
import useApi from "../../hooks/useApi";
import colors from "../../config/colors";

/**
 * validation schema for the "Edit Details" form.
 */
const detailsValidationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().min(8).label("Email"),
});

/**
 * validation schema for the "Change Password" form.
 */
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

function AccountScreen({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();
  const { logOut } = useAuth();

  const [error, setError] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(null);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const getUserApi = useApi(userApi.getUser);
  const patchUserApi = useApi((payload) =>
    settingsApi.patchUser(getUserApi.data.user.id, payload)
  );
  const patchPasswordApi = useApi((payload) =>
    settingsApi.patchPassword(getUserApi.data.user.id, payload)
  );

  useEffect(() => {
    requestUser();
  }, []);

  /**
   * Send the GET request to the api getting the user information.
   */
  const requestUser = async () => {
    const result = await getUserApi.request();
    if (!result.ok) return setError(result.data.message);
  };

  /**
   * Handles the submit for Edit Details.
   *
   * @param {string} name The name of the user they want to change to
   * @param {string} name The email of the user they want to change to
   */
  const handleChangeDetailsSubmit = async ({ name, email }) => {
    getUserApi.data.user.name = name;
    getUserApi.data.user.email = email;
    const result = await patchUserApi.request(getUserApi.data.user);
    if (!result.ok) return setError(getUserApi.data.message);
    setEditing(false);
    requestUser();
    setMessage(result.data.message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  /**
   * Handles the submit for the Change password.
   *
   * @param {string} passwords The password the user wants to change to
   */
  const handleChangePasswordSubmit = async (passwords) => {
    const result = await patchPasswordApi.request(passwords);
    if (!result.ok) return setError(result.data.message);
    setChangePasswordVisible(false);
    setMessage(result.data.message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <>
      <LinearGradient
        colors={["#143C4B", "#0E262F"]}
        style={styles.background}
      />
      <ActivityIndicator
        visible={
          getUserApi.loading || patchUserApi.loading || patchPasswordApi.loading
        }
      />
      <Screen style={styles.screen}>
        {getUserApi.error ? (
          <>
            <AppText style={styles.errorMessage}>
              Couldn't retrieve user detail.
            </AppText>
            <AppErrorMessage visible={error} visible={error} />
            <AppButton title="RETRY" onPress={requestUser} />
          </>
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
            keyboardVerticalOffset={Platform.OS == "ios" ? 50 : 0}
            style={styles.keyboardAvoidingView}
          >
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={requestUser}
                />
              }
            >
              <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
              />
              {getUserApi.data.user && (
                <View>
                  <AppText style={styles.sectionTitle}>Details</AppText>

                  <View style={styles.fieldContainer}>
                    <AppText style={styles.fieldTitle}>Account ID</AppText>
                    <AppText style={styles.fieldValue}>
                      {getUserApi.data.user.account.account_id}
                    </AppText>
                  </View>

                  <View style={styles.fieldContainer}>
                    <AppText style={styles.fieldTitle}>Company</AppText>
                    <AppText style={styles.fieldValue}>
                      {getUserApi.data.user.account.name}
                    </AppText>
                  </View>

                  {!editing ? (
                    <>
                      <View style={styles.fieldContainer}>
                        <AppText style={styles.fieldTitle}>Name</AppText>
                        <AppText style={styles.fieldValue}>
                          {getUserApi.data.user.name}
                        </AppText>
                      </View>
                      <View style={styles.fieldContainer}>
                        <AppText style={styles.fieldTitle}>Email</AppText>
                        <AppText style={styles.fieldValue}>
                          {getUserApi.data.user.email}
                        </AppText>
                      </View>
                      <AppButton
                        title="Edit Details"
                        backgroundColor={null}
                        onPress={() => setEditing(true)}
                      />
                    </>
                  ) : (
                    <View style={styles.formContainer}>
                      <AppForm
                        initialValues={{
                          name: getUserApi.data.user
                            ? getUserApi.data.user.name
                            : "",
                          email: getUserApi.data.user
                            ? getUserApi.data.user.email
                            : "",
                        }}
                        onSubmit={handleChangeDetailsSubmit}
                        validationSchema={detailsValidationSchema}
                      >
                        <View style={styles.editFieldContainer}>
                          <AppText style={styles.editFieldTitle}>Name</AppText>
                          <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            name="name"
                            placeholder="Name"
                            color="white"
                            onContentSizeChange={() => setError(null)}
                          />
                        </View>
                        <View style={styles.editFieldContainer}>
                          <AppText style={styles.editFieldTitle}>Email</AppText>
                          <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            name="email"
                            placeholder="Email"
                            color="white"
                            onContentSizeChange={() => setError(null)}
                          />
                        </View>
                        <AppErrorMessage
                          error={error}
                          visible={patchUserApi.error}
                        />
                        <View
                          style={{
                            flexDirection: "row",
                            marginVertical: 10,
                            justifyContent: "space-between",
                          }}
                        >
                          <AppButton
                            title="Back"
                            backgroundColor={null}
                            onPress={() => setEditing(false)}
                            style={{ width: "45%" }}
                          />
                          <SubmitButton title="Save" style={{ width: "45%" }} />
                        </View>
                      </AppForm>
                    </View>
                  )}
                </View>
              )}
              {!changePasswordVisible ? (
                <AppButton
                  title="Change Password"
                  backgroundColor={null}
                  onPress={() => setChangePasswordVisible(true)}
                />
              ) : (
                <View style={styles.formContainer}>
                  <AppForm
                    initialValues={{
                      current_password: "",
                      password_1: "",
                      password_2: "",
                    }}
                    onSubmit={handleChangePasswordSubmit}
                    validationSchema={changePasswordValidationSchema}
                  >
                    <View style={styles.editFieldContainer}>
                      <AppText style={styles.editFieldTitle}>
                        Current Password
                      </AppText>
                      <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="current_password"
                        placeholder="Current Password"
                        secureTextEntry
                        color="white"
                        onContentSizeChange={() => setError(null)}
                      />
                    </View>

                    <View style={styles.editFieldContainer}>
                      <AppText style={styles.editFieldTitle}>
                        New Password
                      </AppText>
                      <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="password_1"
                        placeholder="New Password"
                        secureTextEntry
                        color="white"
                        onContentSizeChange={() => setError(null)}
                      />
                    </View>

                    <View style={styles.editFieldContainer}>
                      <AppText style={styles.editFieldTitle}>
                        Repeat New Password
                      </AppText>
                      <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="password_2"
                        placeholder="Repeat New Password"
                        secureTextEntry
                        color="white"
                        onContentSizeChange={() => setError(null)}
                      />
                    </View>
                    <AppErrorMessage
                      error={error}
                      visible={patchPasswordApi.error}
                    />
                    <View style={styles.buttonsContainer}>
                      <AppButton
                        title="Back"
                        backgroundColor={null}
                        onPress={() => setChangePasswordVisible(false)}
                        style={{ width: "45%" }}
                      />
                      <SubmitButton title="Save" style={{ width: "45%" }} />
                    </View>
                  </AppForm>
                </View>
              )}

              <AppButton
                title="Payment Cards"
                backgroundColor={null}
                onPress={() => navigation.navigate(routes.PAYMENT_CARDS)}
              />

              <AppButton
                title="Margins"
                backgroundColor={null}
                onPress={() => navigation.navigate(routes.MARGIN)}
              />

              <AppButton
                title="Users"
                backgroundColor={null}
                onPress={() => navigation.navigate(routes.USERS)}
              />

              <AppButton
                title="Log Out"
                onPress={() => setLogoutModalVisible(true)}
                style={{ marginBottom: tabBarHeight }}
              />
            </ScrollView>

            <Modal
              visible={logoutModalVisible}
              animationType="fade"
              transparent
              onRequestClose={() => setLogoutModalVisible(false)}
            >
              <View style={styles.modal}>
                <AppText style={styles.actionTitle}>Log Out?</AppText>
                <View style={styles.buttonsContainer}>
                  <AppButton
                    title="Cancel"
                    backgroundColor={null}
                    color={colors.success}
                    style={{ width: "45%" }}
                    onPress={() => setLogoutModalVisible(false)}
                  />
                  <AppButton
                    title="Confirm"
                    style={{ width: "45%" }}
                    onPress={logOut}
                  />
                </View>
              </View>
            </Modal>
            <Message message={message} />
          </KeyboardAvoidingView>
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  screen: {
    paddingHorizontal: 20,
  },
  errorMessage: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  logo: {
    height: 100,
    width: "70%",
    resizeMode: "contain",
    marginBottom: 30,
    alignSelf: "center",
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  fieldContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  fieldTitle: {
    width: "40%",
    color: colors.lightGrey,
  },
  fieldValue: {
    width: "60%",
    color: "white",
    fontWeight: "bold",
  },
  formContainer: {
    marginVertical: 20,
  },
  editFieldTitle: {
    color: "white",
    fontWeight: "bold",
  },
  editFieldContainer: {
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
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
});

export default AccountScreen;
