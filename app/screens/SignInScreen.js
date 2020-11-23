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
// import ActivityIndicator from "../components/ActivityIndicator";
import {
  AppErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
// import useApi from "../hooks/useApi";

import defaultStyles from "../config/styles";

/**
 * The login screen, allowing user to input their login details and handling the
 * login operation based on the user input.
 * @module screens/SignInScreen
 */

/**
 * The validation schema for the user input fields.
 */
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

/**
 * The login screen functional component
 */
const SignInScreen = () => {
  // const loginApi = useApi(authApi.login);
  // const { logIn } = useAuth();
  // const [error, setError] = useState();

  /**
   * Handles the submit operation
   * @param {string} email - the user input in the email field
   * @param {string} password - the user input in the password field
   */
  // const handleSubmit = async ({ email, password }) => {
  //   const result = await loginApi.request(email, password);
  //   if (!result.ok) return setError(result.data);
  //   logIn(result.data);
  // };
  const handleSubmit = ({ email, password }) => {
    console.log("Logged in.");
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
              <AppText style={styles.tagline}>Sign In</AppText>
              <AppForm
                initialValues={{ email: "", password: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {/* <AppErrorMessage
                error={error}
                // error={"Invalid email and/or password."}
                visible={error}
              /> */}
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  name="email"
                  icon="email"
                  placeholder="Email"
                  textContentType="emailAddress"
                />
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="lock"
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                  textContentType="password"
                />

                <SubmitButton icon="login" title="Sign In" />
              </AppForm>
              <AppButton
                icon="exclamation"
                title="Forget password"
                color="lightGrey"
                onPress={() => console.log("Forget Password")}
              />
              <AppButton
                icon="plus"
                title="Register"
                color="lightGrey"
                onPress={() => console.log("Register")}
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
    opacity: 0.5,
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
  screen: {
    padding: 10,
  },
  tagline: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 30,
    alignSelf: "center",
    color: defaultStyles.colors.darkGrey,
  },
});

export default SignInScreen;
