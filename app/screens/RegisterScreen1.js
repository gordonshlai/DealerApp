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
import { LinearGradient } from "expo-linear-gradient";
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

import routes from "../navigation/routes";
import colors from "../config/colors";

/**
 * The register screen, allowing user to input their details for registrating a new account
 * and handling the registration operation based on the user input.
 * @module screens/RegisterScreen1
 */

/**
 * The validation schema for the user input fields.
 */
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required().label("Full Name"),
  businessName: Yup.string().required().label("Business Name"),
  email: Yup.string().required().email().min(8).label("Email"),
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
function RegisterScreen1({ navigation }) {
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
  const registerApi = useApi(({ fullName, businessName, email, password }) =>
    client.post(endpoint, {
      name: fullName,
      note: businessName,
      email,
      password_1: password,
      password_2: password,
    })
  );

  const handleSubmit = async ({ fullName, businessName, email, password }) => {
    const result = await registerApi.request({
      fullName,
      businessName,
      email,
      password,
    });
    if (!result.ok) return setError(result.data.message);
    navigation.navigate(routes.REGISTER_2);
  };

  return (
    <>
      <View style={styles.background}>
        <LinearGradient
          colors={["#143C4B", "#0E262F"]}
          style={styles.linearGradient}
        />
      </View>

      <ActivityIndicator visible={registerApi.loading} />

      <Screen>
        <ScrollView
          showsVerticalScrollIndicator={false}
          centerContent
          contentContainerStyle={styles.scrollView}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
            keyboardVerticalOffset={Platform.OS == "ios" ? 150 : 0}
          >
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <AppForm
              initialValues={{
                fullName: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <View style={styles.formFieldContainer}>
                <AppText style={styles.fieldName}>Full Name</AppText>
                <AppFormField
                  autoCorrect={false}
                  name="fullName"
                  placeholder="Type Your Full Name"
                  color="white"
                />
              </View>
              <View style={styles.formFieldContainer}>
                <AppText style={styles.fieldName}>Business Name</AppText>
                <AppFormField
                  autoCorrect={false}
                  name="businessName"
                  placeholder="Type Your Business Name"
                  color="white"
                />
              </View>
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
              <View style={styles.formFieldContainer}>
                <AppText style={styles.fieldName}>Confirm Password</AppText>
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  secureTextEntry
                  textContentType="password"
                  color="white"
                />
              </View>
              <AppErrorMessage error={error} visible={error} />
              <SubmitButton title="Register" backgroundColor={colors.success} />
            </AppForm>
            <AppButton
              title="Back"
              backgroundColor={null}
              onPress={() => navigation.goBack()}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  linearGradient: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  logo: {
    width: 224,
    height: 80,
    alignSelf: "center",
    marginVertical: 30,
  },
  formFieldContainer: {
    marginVertical: 15,
  },
  fieldName: {
    color: colors.lightGrey,
    fontWeight: "bold",
  },
});

export default RegisterScreen1;
