import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as Yup from "yup";

import ActivityIndicator from "../../components/ActivityIndicator";
import AppText from "../../components/AppText";
import AppButton from "../../components/AppButton";
import {
  AppErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../../components/forms";
import UploadScreen from "../UploadScreen";
import Screen from "../../components/Screen";

import useApi from "../../hooks/useApi";
import settingsApi from "../../api/settings";
import colors from "../../config/colors";
import routes from "../../navigation/routes";

/**
 * Validation schema for the New User form.
 */
const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password_1: Yup.string()
    .required()
    .label("Password")
    .matches(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})",
      "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number."
    ),
  password_2: Yup.string().oneOf(
    [Yup.ref("password_1"), null],
    "Password must match"
  ),
});

function NewUserScreen({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();

  const [error, setError] = useState();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState();

  const postUserApi = useApi((payload, onUploadProgress) =>
    settingsApi.postUser(payload, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    })
  );

  /**
   * Handles the submit for the new user form.
   *
   * @param {object} values The input values from the new user form.
   */
  const handleSubmit = async (values) => {
    setUploadVisible(true);
    const result = await postUserApi.request(values, (progress) => {
      setProgress(progress);
    });
    console.log(result);
    if (!result.ok) setError(result.data.message);
  };

  return (
    <>
      <LinearGradient
        colors={["#143C4B", "#0E262F"]}
        style={styles.background}
      />
      <ActivityIndicator visible={postUserApi.loading} />
      <UploadScreen
        onDone={async () => {
          setUploadVisible(false);
          navigation.popToTop();
          navigation.navigate(routes.USERS);
        }}
        progress={progress}
        visible={uploadVisible}
      />
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
            <AppForm
              initialValues={{
                name: "",
                email: "",
                password_1: "",
                password_2: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <View style={styles.formFieldContainer}>
                <AppText style={styles.fieldName}>Name</AppText>
                <AppFormField
                  name="name"
                  placeholder="Type Your Name"
                  color="white"
                />
              </View>
              <View style={styles.formFieldContainer}>
                <AppText style={styles.fieldName}>Email</AppText>
                <AppFormField
                  name="email"
                  placeholder="Type Your Email"
                  color="white"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                />
              </View>
              <View style={styles.formFieldContainer}>
                <AppText style={styles.fieldName}>Password</AppText>
                <AppFormField
                  name="password_1"
                  placeholder="Type Your Password"
                  color="white"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  textContentType="password"
                />
              </View>
              <View style={styles.formFieldContainer}>
                <AppText style={styles.fieldName}>Confirm Password</AppText>
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  name="password_2"
                  placeholder="Confirm Password"
                  secureTextEntry
                  textContentType="password"
                  color="white"
                />
              </View>
              <AppErrorMessage visible={error} error={error} />
              <SubmitButton title="Add" backgroundColor={colors.success} />
              <AppButton
                backgroundColor={null}
                title="Back"
                onPress={() => navigation.goBack()}
                style={{ marginBottom: tabBarHeight }}
              />
            </AppForm>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  formFieldContainer: {
    marginVertical: 15,
  },
  fieldName: {
    color: "white",
    fontWeight: "bold",
  },
});

export default NewUserScreen;
