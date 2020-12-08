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
import client from "../api/client";
import useAuth from "../auth/useAuth";
import ActivityIndicator from "../components/ActivityIndicator";
import {
  AppErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import authStorage from "../auth/storage";

import defaultStyles from "../config/styles";
import routes from "../navigation/routes";

/**
 * The login screen, allowing user to input their login details and handling the
 * login operation based on the user input.
 * @module screens/SignInScreen2
 */

/**
 * The validation schema for the user input fields.
 */
const validationSchema = Yup.object().shape({
  password: Yup.string().required().label("Password"),
});

/**
 * The login screen functional component
 */
const SignInScreen2 = ({ navigation, route }) => {
  const { email } = route.params;
  // const loginApi = useApi(authApi.login);
  const { logIn } = useAuth();
  const [error, setError] = useState();

  /**ß
   * Handles the submit operation
   * @param {string} password - the user input in the password field
   */
  const endpoint = "auth/login";
  const loginApi = useApi(({ password }) =>
    client.post(endpoint, { email, password })
  );

  const handleSubmit = async ({ password }) => {
    const result = await loginApi.request({ password });
    console.log(result);
    if (!result.ok) return setError(result.data.message);
    logIn(result.data.token);
    const user = await client.get("/api/user");
  };

  return (
    <>
      <ImageBackground
        style={styles.background}
        source={require("../assets/background.jpg")}
      />

      <ActivityIndicator visible={loginApi.loading} />
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
              <AppText style={styles.tagline}>Sign In</AppText>
              <AppForm
                initialValues={{ password: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <AppText
                  style={styles.forgetPassword}
                  onPress={() => navigation.navigate(routes.RESET_PASSWORD)}
                >
                  Forget Password?
                </AppText>
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="lock"
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                  textContentType="password"
                />
                <AppErrorMessage error={error} visible={error} />
                <SubmitButton
                  color={defaultStyles.colors.success}
                  icon="login"
                  title="Sign In"
                />
              </AppForm>
              <AppButton
                icon="arrow-left-bold-outline"
                title="Back"
                color={defaultStyles.colors.secondary}
                onPress={() => navigation.navigate(routes.SIGN_IN_1)}
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
  forgetPassword: {
    // fontSize: 20,
    alignSelf: "flex-end",
    // borderBottomColor: defaultStyles.colors.black,
    // backgroundColor: defaultStyles.colors.primary,
    // borderBottomWidth: 2,
    color: defaultStyles.colors.black,
    fontWeight: "bold",
    fontStyle: "italic",
    paddingHorizontal: 5,
  },
  logo: {
    width: 224,
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

export default SignInScreen2;
