import React, { useContext } from "react";
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
  AppForm,
  AppFormDateTimePicker,
  AppFormField,
  AppFormPicker,
  RegistrationPlateInput,
  SubmitButton,
} from "../../components/forms";
import Screen from "../../components/Screen";
import ProgressBar from "./components/ProgressBar";
import ActivityIndicator from "../../components/ActivityIndicator";

import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";
import WarrantyContext from "../../warranty/context";

const validationSchema = Yup.object().shape({
  purchase_date: Yup.date()
    .required()
    .max(dayjs().add(2, "year"))
    .label("Purchase Date"),
  start_date: Yup.date()
    .required()
    .min(dayjs().subtract(5, "day"))
    .max(dayjs().add(2, "year"))
    .label("Warranty Start Date"),
  mot_date: Yup.date()
    .required()
    .min(dayjs().subtract(1, "day"))
    .max(dayjs().add(4, "year"))
    .label("MOT Due Date"),
  service_date: Yup.date()
    .required()
    .min(dayjs().subtract(5, "year"))
    .max(dayjs().add(1, "day"))
    .label("Last Service Date"),
  service_history: Yup.string().required().label("Service History"),
  registration: Yup.string().required().label("Registration"),
  vin_number: Yup.string().label("VIN Number"),
});

const serviceHistoryOptions = [
  "Full (all with main dealer)",
  "Full (some with main dealer)",
  "Full (none at main dealer)",
  "Last few services only",
  "Last service only",
];

function CarWarrantyDetailScreen({ route, navigation }) {
  const {
    quote: {
      vehicle: { registration },
    },
    booking,
    setBooking,
  } = useContext(WarrantyContext);
  const tabBarHeight = useBottomTabBarHeight();

  const handleSubmit = (values) => {
    const payload = { ...booking, ...values };

    payload.service_history = (
      serviceHistoryOptions.indexOf(payload.service_history) + 1
    ).toString();
    payload.purchase_date = dayjs(payload.purchase_date).format("YYYY-MM-DD");
    payload.start_date = dayjs(payload.start_date).format("YYYY-MM-DD");
    payload.mot_date = dayjs(payload.mot_date).format("YYYY-MM-DD");
    payload.service_date = dayjs(payload.service_date).format("YYYY-MM-DD");

    setBooking(payload);

    navigation.navigate(routes.CAR_WARRANTY_CUSTOMER_DETAIL);
  };

  return (
    <>
      <Background />
      <ActivityIndicator visible={false} />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        keyboardVerticalOffset={Platform.OS == "ios" ? 50 : 0}
        style={styles.keyboardAvoidingView}
      >
        <ProgressBar route={route} />
        <AppText style={styles.sectionTitle}>Warranty Detail</AppText>
        <ScrollView>
          <Screen style={styles.screen}>
            <View style={[styles.card, { marginBottom: tabBarHeight }]}>
              <AppForm
                initialValues={{
                  purchase_date: dayjs(),
                  start_date: dayjs(),
                  mot_date: "",
                  service_date: "",
                  service_history: "",
                  registration: registration || "",
                  vin_number: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <View style={styles.fieldContainer}>
                  <AppText style={styles.fieldTitle}>Purchase Date</AppText>
                  <AppFormDateTimePicker name="purchase_date" />
                </View>
                <View style={styles.fieldContainer}>
                  <AppText style={styles.fieldTitle}>
                    Warranty Start Date
                  </AppText>
                  <AppFormDateTimePicker name="start_date" />
                </View>
                <View style={styles.fieldContainer}>
                  <AppText style={styles.fieldTitle}>MOT Due Date</AppText>
                  <AppFormDateTimePicker name="mot_date" />
                </View>
                <View style={styles.fieldContainer}>
                  <AppText style={styles.fieldTitle}>Last Service Date</AppText>
                  <AppFormDateTimePicker name="service_date" />
                </View>
                <View style={styles.fieldContainer}>
                  <AppText style={styles.fieldTitle}>Service History</AppText>
                  <AppFormPicker
                    name="service_history"
                    items={serviceHistoryOptions}
                  />
                </View>
                <View style={styles.fieldContainer}>
                  <AppText style={styles.fieldTitle}>Registration</AppText>
                  <RegistrationPlateInput name="registration" />
                </View>
                <View style={styles.fieldContainer}>
                  <AppText style={styles.fieldTitle}>VIN Number</AppText>
                  <AppFormField
                    name="vin_number"
                    placeholder="VIN Number"
                    style={styles.appFormField}
                  />
                </View>
                <SubmitButton title="Next" />
              </AppForm>
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
    color: "white",
    marginLeft: 20,
    marginVertical: 10,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  fieldTitle: {
    color: defaultStyles.colors.mediumGrey,
    fontWeight: "bold",
  },
  appFormField: {
    backgroundColor: colors.white,
    borderRadius: 5,
  },
});

export default CarWarrantyDetailScreen;
