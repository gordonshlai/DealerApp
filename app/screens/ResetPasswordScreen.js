import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import * as Yup from "yup";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";

// import authApi from "../api/auth";
// import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
// import ActivityIndicator from "../components/ActivityIndicator";
import {
  AppErrorMessage,
  AppInfoMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import client from "../api/client";

import defaultStyles from "../config/styles";
import routes from "../navigation/routes";

/**
 * The login screen, allowing user to input their login details and handling the
 * login operation based on the user input.
 * @module screens/ResetPasswordScreen
 */

/**
 * The validation schema for the user input fields.
 */
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

/**
 * The reset password screen functional component
 */
const ResetPasswordScreen = ({ navigation }) => {
  // const loginApi = useApi(authApi.login);
  // const { logIn } = useAuth();
  const [error, setError] = useState();
  const [info, setInfo] = useState();

  /**
   * Handles the submit operation
   * @param {string} email - the user input in the email field
   */
  // const handleSubmit = async ({ email, password }) => {
  //   const result = await loginApi.request(email, password);
  //   if (!result.ok) return setError(result.data);
  //   logIn(result.data);
  // };
  const endpoint = "auth/reset";
  const resetPassword = ({ email }) => client.post(endpoint, { email });
  const resetPasswordApi = useApi(resetPassword);

  const handleSubmit = async ({ email }) => {
    const result = await resetPasswordApi.request({ email });
    if (!result.ok) {
      setError(result.data.message);
      setInfo(null);
      return;
    }
    setError(null);
    setInfo(result.data.message);
  };

  return (
    <>
      <ImageBackground
        style={styles.background}
        source={require("../assets/background.jpg")}
      />

      {/* <ActivityIndicator visible={loginApi.loading} /> */}
      <View style={styles.container}>
        <Screen style={styles.screen}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <ScrollView>
              <Image
                style={styles.logo}
                source={require("../assets/logo-2.png")}
              />
              <AppText style={styles.tagline}>Reset Password</AppText>
              <AppForm
                initialValues={{ email: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <AppErrorMessage error={error} visible={error} />
                <AppInfoMessage info={info} visible={info} />
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  name="email"
                  icon="email"
                  placeholder="Email"
                  textContentType="emailAddress"
                />

                <SubmitButton
                  icon="exclamation"
                  color={defaultStyles.colors.warning}
                  title="Send Password Reset"
                />
              </AppForm>
              <AppButton
                icon="arrow-left-bold-outline"
                title="Back"
                color={defaultStyles.colors.secondary}
                onPress={() => navigation.navigate(routes.SIGN_IN_2)}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </Screen>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    opacity: 0.3,
  },
  container: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  logo: {
    width: 226,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  screen: {
    padding: 10,
  },
  tagline: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 50,
    alignSelf: "center",
    color: defaultStyles.colors.darkGrey,
  },
});

export default ResetPasswordScreen;
