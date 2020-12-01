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
// import userApi from "../api/users";
// import useAuth from "../auth/useAuth";
import ActivityIndicator from "../components/ActivityIndicator";
import client from "../api/client";
import {
  AppErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";

import defaultStyles from "../config/styles";
import routes from "../navigation/routes";

/**
 * The register screen, allowing user to input their details for registrating a new account
 * and handling the registration operation based on the user input.
 * @module screens/RegisterScreen2
 */

/**
 * The validation schema for the user input fields.
 */
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required()
    .label("Password")
    .matches(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})",
      "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number."
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
});

/**
 * The register screen functional component
 */
function RegisterScreen2({ navigation, route }) {
  const { fullName, businessName, email } = route.params;
  // const registerApi = useApi(userApi.register);
  // const loginApi = useApi(authApi.login);

  // const {logIn} = useAuth();
  const [error, setError] = useState();

  /**
   * Handles the registration operation
   * @param {string} password - the user input in the password field
   * @param {string} confirmPassword - the user input in the confirm password field
   */

  const endpoint = "auth/register";
  const registerApi = useApi(({ password }) =>
    client.post(endpoint, {
      name: fullName,
      note: businessName,
      email,
      password_1: password,
    })
  );

  const handleSubmit = async ({ password }) => {
    const result = await registerApi.request({ password });
    if (!result.ok) return setError(result.data.message);
    navigation.navigate(routes.REGISTER_3);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading} />
      <ImageBackground
        style={styles.background}
        source={require("../assets/background.jpg")}
      />
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
              <AppText style={styles.tagline}>Register</AppText>
              <AppForm
                initialValues={{
                  password: "",
                  confirmPassword: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <AppErrorMessage error={error} visible={error} />
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="lock"
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                  textContentType="password"
                />
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="lock-reset"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  secureTextEntry
                  textContentType="password"
                />
                <SubmitButton
                  icon="plus"
                  title="Register"
                  color={defaultStyles.colors.success}
                />
              </AppForm>
              <AppButton
                icon="arrow-left-bold-outline"
                title="Back"
                color={defaultStyles.colors.secondary}
                onPress={() => navigation.navigate(routes.REGISTER_1)}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </Screen>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    opacity: 0.3,
  },
  screen: {
    padding: 10,
  },
  container: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  logo: {
    width: 224,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  tagline: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 30,
    alignSelf: "center",
    color: defaultStyles.colors.darkGrey,
  },
});

export default RegisterScreen2;
