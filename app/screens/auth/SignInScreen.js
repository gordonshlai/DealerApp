import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import * as Yup from "yup";
import { LinearGradient } from "expo-linear-gradient";

import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import ActivityIndicator from "../../components/ActivityIndicator";
import {
  AppErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../../components/forms";

import useAuth from "../../auth/useAuth";
import useApi from "../../hooks/useApi";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";
import authApi from "../../api/auth";

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

  const loginApi = useApi((info) => authApi.login(info));

  /**
   * Handles the submit operation
   * @param {object} info - the user input including the email and password field
   */
  const handleSubmit = async (info) => {
    const result = await loginApi.request(info);
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

      <Screen>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : ""}
          keyboardVerticalOffset={Platform.OS == "ios" ? 50 : 0}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            centerContent
            contentContainerStyle={styles.scrollView}
          >
            <Image
              style={styles.logo}
              source={require("../../assets/logo.png")}
            />
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
                onPress={() => navigation.navigate(routes.WELCOME)}
              />
            </AppForm>
          </ScrollView>
        </KeyboardAvoidingView>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  keyboardAvoidingView: {
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
  fieldName: {
    color: "white",
    fontWeight: "bold",
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
});

export default SignInScreen;
