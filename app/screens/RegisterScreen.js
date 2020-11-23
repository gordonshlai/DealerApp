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
 * The register screen, allowing user to input their details for registrating a new account
 * and handling the registration operation based on the user input.
 * @module screens/RegisterScreen
 */

/**
 * The validation schema for the user input fields.
 */
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required().label("Full Name"),
  businessName: Yup.string().required().label("Business Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string()
    .required()
    .min(5)
    .label("Password")
    .matches(
      "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
      "Must Contain 8 Characters, One Uppercase and One Number."
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
});

/**
 * The register screen functional component
 */
function RegisterScreen() {
  // const registerApi = useApi(userApi.register);
  // const loginApi = useApi(authApi.login);

  // const auth = useAuth();
  // const [error, setError] = useState();

  /**
   * Handles the registration operation
   * @param {string} firstName - the user input in the first name field
   * @param {string} lastName - the user input in the last name field
   * @param {string} email - the user input in the email field
   * @param {string} password - the user input in the password field
   */
  // const handleSubmit = async ({ firstName, lastName, email, password }) => {
  //   const result = await registerApi.request({
  //     firstName,
  //     lastName,
  //     email,
  //     password,
  //   });
  //   if (!result.ok) {
  //     if (result.data) setError(result.data);
  //     else {
  //       setError("An unexpected error occured.");
  //       console.log(result);
  //     }
  //     return;
  //   }

  //   const { data: authToken } = await loginApi.request(email, password);
  //   auth.logIn(authToken);
  // };
  const handleSubmit = ({
    fullName,
    businessName,
    email,
    password,
    confirmPassword,
  }) => {
    console.log("Registered");
  };

  return (
    <>
      {/* <ActivityIndicator visible={registerApi.loading || loginApi.loading} /> */}
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
                  fullName: "",
                  businessName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {/* <AppErrorMessage error={error} visible={error} /> */}
                <AppFormField
                  autoCorrect={false}
                  icon="account-plus"
                  name="fullName"
                  placeholder="Full Name"
                />
                <AppFormField
                  autoCorrect={false}
                  icon="account-plus-outline"
                  name="businessName"
                  placeholder="Business Name"
                />
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="email"
                  keyboardType="email-address"
                  name="email"
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
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="lock-reset"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  secureTextEntry
                  textContentType="password"
                />
                <SubmitButton icon="plus" title="Register" color="success" />
              </AppForm>
              <AppButton
                icon="arrow-left-bold-outline"
                title="Back"
                color="secondary"
                onPress={() => console.log("Register")}
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

export default RegisterScreen;
