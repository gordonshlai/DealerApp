import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import * as Yup from "yup";
import { LinearGradient } from "expo-linear-gradient";
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
import useApi from "../hooks/useApi";
import authStorage from "../auth/storage";

import colors from "../config/colors";
import routes from "../navigation/routes";

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
  password: Yup.string().required().label("Password"),
});

/**
 * The login screen functional component
 */
const SignInScreen = ({ navigation }) => {
  // const loginApi = useApi(authApi.login);
  const { logIn } = useAuth();
  const [error, setError] = useState();

  /**
   * Handles the submit operation
   * @param {string} password - the user input in the password field
   */
  const endpoint = "auth/login";
  const loginApi = useApi(({ email, password }) =>
    client.post(endpoint, { email, password })
  );

  const handleSubmit = async ({ email, password }) => {
    const result = await loginApi.request({ email, password });
    if (!result.ok) return setError(result.data.message);
    logIn(result.data.token);
  };

  return (
    <>
      <LinearGradient
        colors={["#143C4B", "#0E262F"]}
        style={styles.background}
      />

      <ActivityIndicator visible={loginApi.loading} />

      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <AppForm
              initialValues={{ email: "", password: "" }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <View style={styles.formFieldContainer}>
                <AppText style={styles.fieldName}>Email</AppText>
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  name="email"
                  placeholder="Type Your Email"
                  textContentType="emailAddress"
                  color="white"
                />
              </View>
              <View style={styles.formFieldContainer}>
                <AppText style={styles.fieldName}>Password</AppText>
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  name="password"
                  placeholder="Type Your Password"
                  secureTextEntry
                  textContentType="password"
                  color="white"
                />
              </View>

              <AppErrorMessage error={error} visible={error} />
              <SubmitButton title="Sign in" style={{ marginTop: 30 }} />
              <AppText
                style={styles.forgetPassword}
                onPress={() => navigation.navigate(routes.RESET_PASSWORD)}
              >
                Forget Password?
              </AppText>
              <AppButton
                title="Back"
                backgroundColor={null}
                onPress={() => navigation.goBack()}
              />
            </AppForm>
          </ScrollView>
        </KeyboardAvoidingView>
        <AppText style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et elit
          hendrerit, vulputate libero ut, blandit libero. Vestibulum quis
          tincidunt dui, sollicitudin porttitor dui. Aliquam id augue eget dui
          iaculis rhoncus quis vitae sem. Pellentesque vestibulum consectetur
          nisl vel faucibus.
        </AppText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    height: "100%",
    width: "100%",
    position: "absolute",
    padding: 20,
    justifyContent: "center",
  },
  fieldName: {
    color: "white",
  },
  formFieldContainer: {
    marginVertical: 15,
  },
  forgetPassword: {
    alignSelf: "center",
    color: "white",
    fontStyle: "italic",
    marginTop: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 8,
    color: colors.lightGrey,
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
});

export default SignInScreen;
