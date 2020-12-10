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

import defaultStyles from "../config/styles";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import ActivityIndicator from "../components/ActivityIndicator";

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
      <ActivityIndicator visible={registrationLookupApi.loading} />
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <Screen style={styles.screen}>
            <View style={styles.card}>
              <AppText style={styles.title}>ADD A NEW CAR</AppText>
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
                <SubmitButton
                  icon="magnify"
                  color={defaultStyles.colors.success}
                  title="Find"
                />
              </AppForm>
              <AppButton
                title="Without registration"
                color={defaultStyles.colors.secondary}
                onPress={() => navigation.navigate(routes.VEHICLE_DETAIL)}
              />
            </View>
            <AppButton
              icon="cancel"
              color={null}
              title="cancel"
              onPress={() => navigation.goBack()}
            />
          </Screen>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  title: {
    alignSelf: "center",
    color: defaultStyles.colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default NewCarScreen;
