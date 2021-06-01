import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import * as Yup from "yup";

import client from "../api/client";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import {
  AppErrorMessage,
  AppForm,
  AppFormField,
  RegistrationPlateInput,
  SubmitButton,
} from "../components/forms";

import colors from "../config/colors";
import defaultStyles from "../config/styles";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import ActivityIndicator from "../components/ActivityIndicator";
import Background from "../components/Background";

const validationSchema = Yup.object().shape({
  registration: Yup.string().required().label("Registration"),
});

function NewCarScreen({ navigation }) {
  const [error, setError] = useState();

  const registrationLookupApi = useApi((endpoint) => client.get(endpoint));

  const handleSubmit = async ({ registration }) => {
    const result = await registrationLookupApi.request(
      "api/inventory/lookup/" + registration
    );
    if (!result.ok)
      return setError("Vehicle with the given registration was not found.");
    console.log(result.data);
    navigation.navigate(routes.VEHICLE_DETAIL, result.data);
  };

  return (
    <>
      <Background />
      <ActivityIndicator visible={registrationLookupApi.loading} />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        keyboardVerticalOffset={Platform.OS == "ios" ? 50 : 0}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView>
          <Screen style={styles.screen}>
            <View style={styles.card}>
              <AppForm
                initialValues={{ registration: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <RegistrationPlateInput
                  name="registration"
                  onContentSizeChange={() => setError("")}
                />
                <AppErrorMessage error={error} visible={error} />
                <SubmitButton title="Find Vehicle" />
              </AppForm>
              <AppButton
                title="Add without registration"
                backgroundColor={null}
                color={colors.success}
                onPress={() => navigation.navigate(routes.VEHICLE_DETAIL)}
              />
            </View>
            <View style={styles.card}>
              <AppButton
                backgroundColor={null}
                color={colors.success}
                title="Back"
                onPress={() => navigation.goBack()}
              />
            </View>
          </Screen>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    ...defaultStyles.shadow,
  },
});

export default NewCarScreen;
