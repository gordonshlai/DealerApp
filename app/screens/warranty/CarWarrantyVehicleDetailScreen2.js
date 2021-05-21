import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import * as Yup from "yup";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import dayjs from "dayjs";

import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Background from "../../components/Background";
import {
  AppErrorMessage,
  AppForm,
  AppFormDateTimePicker,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../../components/forms";
import Screen from "../../components/Screen";

import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import useApi from "../../hooks/useApi";
import client from "../../api/client";
import ActivityIndicator from "../../components/ActivityIndicator";
import routes from "../../navigation/routes";
import ProgressBar from "./components/ProgressBar";

const fuelArray = ["DIESEL", "ELECTRIC", "HYBRID", "PETROL"];
const vehicleOriginArray = [
  "UK",
  "Imported from EU",
  "Imported from Japan",
  "Other",
];

const validationSchema = Yup.object().shape({
  model: Yup.string().required().label("Registration"),
  mileage: Yup.number().required().label("Mileage"),
  engine_cc: Yup.number()
    .required()
    .max(7000, "Engine CC cannot be more than 7000cc")
    .label("Engine CC"),
  fuel_type: Yup.string().required().label("Fuel Type"),
  manufacture_date: Yup.date()
    .required()
    .max(dayjs(), "Manufacture Date cannot be in the future")
    .label("Manufacture Date"),
  retail_value: Yup.number()
    .min(1000, "Retail Value cannot be less than £1,000")
    .required()
    .label("Retail Value"),
  vehicle_origin: Yup.string()
    .required()
    .matches(
      /UK|Imported from EU|Imported from Japan/,
      "We currently only cover vehicles within the UK, EU and Japan. Please speak to your account manager for further information."
    )
    .label("Vehicle Origin"),
});

function CarWarrantyVehicleDetailScreen2({ navigation, route }) {
  const {
    engine_cc,
    fuel_type,
    make,
    manufacture_date,
    mileage,
    model,
    owned,
    registration,
    retail_value,
    service_history,
    tax_due_date,
    tax_status,
    token,
    transmission,
  } = route.params;
  const tabBarHeight = useBottomTabBarHeight();

  const [error, setError] = useState();

  const modelsApi = useApi(() => client.get("api/car/models/" + make));
  const comparisonApi = useApi((data) =>
    client.post("api/car/warranty/comparison", data)
  );
  const userApi = useApi(() => client.get("api/user"));

  const getModels = async () => {
    modelsApi.request();
  };

  useEffect(() => {
    getModels();
  }, []);

  const handleSubmit = async (data) => {
    const computedData = { ...data };
    computedData.vehicle_origin = vehicleOriginArray.indexOf(
      computedData.vehicle_origin
    );

    const user = await userApi.request();
    if (!user.ok) return setError(user.data.message);

    const payload = {
      dealer_id: user.data.user.dealer_id,
      make,
      registration,
      ...computedData,
    };
    const comparison = await comparisonApi.request(payload);
    if (!comparison.ok) return setError(comparison.data.message);

    navigation.navigate(routes.CAR_WARRANTY_COVER_OPTIONS, {
      payload,
      comparison: comparison.data,
      user: user.data.user,
    });
  };

  return (
    <>
      <Background />
      <ActivityIndicator
        visible={modelsApi.loading || userApi.loading || comparisonApi.loading}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        keyboardVerticalOffset={Platform.OS == "ios" ? 50 : 0}
        style={styles.keyboardAvoidingView}
      >
        <ProgressBar route={route} />
        <ScrollView>
          <Screen style={styles.screen}>
            <View style={[styles.card, { marginBottom: tabBarHeight }]}>
              <AppText style={styles.sectionTitle}>
                Vehicle Detail (2/2)
              </AppText>
              <View style={styles.formContainer}>
                <AppForm
                  initialValues={{
                    model: model || "",
                    mileage: mileage ? mileage.toString() : "",
                    engine_cc: engine_cc || "",
                    fuel_type: fuel_type || "",
                    manufacture_date: manufacture_date || "",
                    retail_value: retail_value || "",
                    vehicle_origin: vehicleOriginArray[0],
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  <View style={styles.fieldContainer}>
                    <AppText style={styles.fieldTitle}>Model</AppText>
                    <AppFormPicker name="model" items={modelsApi.data} />
                  </View>
                  <View style={styles.fieldContainer}>
                    <AppText style={styles.fieldTitle}>Mileage</AppText>
                    <AppFormField
                      name="mileage"
                      placeholder="Mileage"
                      keyboardType="numeric"
                      style={styles.appFormField}
                    />
                  </View>
                  <View style={styles.fieldContainer}>
                    <AppText style={styles.fieldTitle}>Engine CC</AppText>
                    <AppFormField
                      name="engine_cc"
                      placeholder="Engine CC"
                      keyboardType="numeric"
                      style={styles.appFormField}
                    />
                  </View>
                  <View style={styles.fieldContainer}>
                    <AppText style={styles.fieldTitle}>Fuel Type</AppText>
                    <AppFormPicker name="fuel_type" items={fuelArray} />
                  </View>
                  <View style={styles.fieldContainer}>
                    <AppText style={styles.fieldTitle}>
                      Manufacture Date
                    </AppText>
                    <AppFormDateTimePicker name="manufacture_date" />
                  </View>
                  <View style={styles.fieldContainer}>
                    <AppText style={styles.fieldTitle}>Retail Value</AppText>
                    <AppFormField
                      icon="currency-gbp"
                      name="retail_value"
                      placeholder="Retail Value"
                      keyboardType="numeric"
                      style={styles.appFormField}
                    />
                  </View>
                  <View style={styles.fieldContainer}>
                    <AppText style={styles.fieldTitle}>Vehicle Origin</AppText>
                    <AppFormPicker
                      name="vehicle_origin"
                      items={vehicleOriginArray}
                    />
                  </View>
                  <AppErrorMessage error={error} visible={error} />
                  <SubmitButton title="Next" />
                </AppForm>
                <AppButton
                  backgroundColor={null}
                  color={colors.success}
                  title="Back"
                  onPress={() => navigation.goBack()}
                />
              </View>
            </View>
          </Screen>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  screen: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    ...defaultStyles.shadow,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.secondary,
    marginBottom: 10,
  },
  formContainer: {
    marginTop: 30,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  fieldTitle: {
    color: defaultStyles.colors.mediumGrey,
  },
  appFormField: {
    backgroundColor: colors.white,
    borderRadius: 5,
  },
});

export default CarWarrantyVehicleDetailScreen2;
