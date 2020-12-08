import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
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
    navigation.navigate(routes.VEHICLE_DETAIL, result.data);
  };

  return (
    <>
      <ActivityIndicator visible={registrationLookupApi.loading} />
      <ScrollView>
        <Screen style={styles.screen}>
          <AppText
            style={[styles.title, { color: defaultStyles.colors.primary }]}
          >
            ADD A NEW CAR
          </AppText>
          <AppForm
            initialValues={{ registration: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppText style={styles.title}>Registration Lookup</AppText>
            <AppErrorMessage error={error} visible={error} />
            <RegistrationPlateInput name="registration" />
            <SubmitButton
              icon="magnify"
              color={defaultStyles.colors.success}
              title="Find"
            />
          </AppForm>
          <AppText style={styles.title}>OR</AppText>
          <AppButton
            icon="pencil"
            title="Manually enter vehicle details"
            color={defaultStyles.colors.secondary}
            onPress={() => navigation.navigate(routes.VEHICLE_DETAIL)}
          />
        </Screen>
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
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
});

export default NewCarScreen;
