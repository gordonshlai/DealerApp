import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as Yup from "yup";

import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import Info from "../components/Info";
import {
  AppErrorMessage,
  AppFormDateTimePicker,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/forms";

import defaultStyles from "../config/styles";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";
import client from "../api/client";
import { Formik } from "formik";

const validationSchema = Yup.object().shape({
  make: Yup.string().required().label("Make"),
  model: Yup.string().required().label("Model"),
  registration: Yup.string().required().label("Registration"),
  mileage: Yup.number().required().label("Mileage"),
  colour: Yup.string().label("Colour"),
  fuel: Yup.string().required().label("Fuel"),
  engine_capacity: Yup.string().required().label("Engine Capacity (cc)"),
  registration_date: Yup.date().required().label("Registration Date"),
  year: Yup.string().required().label("Year"),
  mot_expiry: Yup.date().required().label("MOT Expiry"),
  transmission: Yup.string().label("Transmission"),
  seats: Yup.string().label("Seats"),
  doors: Yup.string().label("Doors"),
  bodyStyle: Yup.string().label("Body Type"),
});

const fuelArray = ["Diesel", "Electric", "Hybrid", "Petrol"];
const transmissionArray = ["Automatic", "Semi-Automatic", "Manual"];
const bodyStyleArray = [
  "Hatchback",
  "Coupe",
  "Sedan",
  "Convertible",
  "Estate",
  "SUV",
  "Crossover",
  "Minivan/Van",
  "Pickup",
];

function VehicleDetailScreen({ route, navigation }) {
  const vehicleDetail = route.params;

  const [error, setError] = useState();

  const makesApi = useApi(() => client.get("api/car/makes"));
  const modelsApi = useApi((endpoint) => client.get(endpoint));

  useEffect(() => {
    makesApi.request();
    if (vehicleDetail && vehicleDetail.make) {
      modelsApi.request("api/car/models/" + vehicleDetail.make);
    }
  }, []);

  const handleSubmit = (inputDetail) => {
    console.log(inputDetail);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <Screen style={styles.screen}>
          <Formik
            initialValues={{
              make: vehicleDetail ? vehicleDetail.make : "",
              model: vehicleDetail ? vehicleDetail.model : "",
              registration: vehicleDetail ? vehicleDetail.registration : "",
              mileage:
                vehicleDetail && vehicleDetail.mileage
                  ? vehicleDetail.mileage.toString()
                  : "",
              colour:
                vehicleDetail && vehicleDetail.colour
                  ? vehicleDetail.colour
                  : "",
              fuel:
                vehicleDetail && vehicleDetail.fuel ? vehicleDetail.fuel : "",
              engine_capacity:
                vehicleDetail && vehicleDetail.engine_capacity
                  ? vehicleDetail.engine_capacity.toString()
                  : "",
              year:
                vehicleDetail && vehicleDetail.year
                  ? vehicleDetail.year.toString()
                  : "",
              registration_date: vehicleDetail
                ? new Date(vehicleDetail.registration_date)
                : "",
              mot_expiry:
                vehicleDetail && vehicleDetail.mot_expiry
                  ? new Date(vehicleDetail.mot_expiry)
                  : "",
              transmission:
                vehicleDetail && vehicleDetail.transmission
                  ? vehicleDetail.transmission
                  : "",
              seats: "",
              doors: "",
              bodyStyle: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, values, setFieldValue }) => (
              <>
                <View style={styles.fieldContainer}>
                  <Info
                    name="car"
                    text="Make"
                    color={defaultStyles.colors.mediumGrey}
                  />
                  <AppFormPicker
                    name="make"
                    placeholder="Please select"
                    items={makesApi.data}
                    onSelectItem={(item) => {
                      modelsApi.request("api/car/models/" + item);
                      if (values["make"] !== item) {
                        setFieldValue("model", "");
                      }
                    }}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Info
                    name="alpha-m"
                    text="Model"
                    color={defaultStyles.colors.mediumGrey}
                  />
                  <AppFormPicker
                    name="model"
                    placeholder="Please select"
                    items={modelsApi.data}
                    disabled={values["make"] === "" ? true : false}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Info
                    name="card-text"
                    text="Registration"
                    color={defaultStyles.colors.mediumGrey}
                  />
                  <AppFormField
                    name="registration"
                    placeholder="Registration"
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Info
                    name="speedometer"
                    text="Mileage"
                    color={defaultStyles.colors.mediumGrey}
                  />
                  <AppFormField
                    name="mileage"
                    placeholder="Miles"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Info
                    name="format-color-fill"
                    text="Colour"
                    color={defaultStyles.colors.mediumGrey}
                  />
                  <AppFormField name="colour" placeholder="Colour" />
                </View>

                <View style={styles.fieldContainer}>
                  <Info
                    name="fuel"
                    text="Fuel"
                    color={defaultStyles.colors.mediumGrey}
                  />
                  <AppFormPicker
                    name="fuel"
                    placeholder="Please select"
                    items={fuelArray}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Info
                    name="engine"
                    text="Engine Capacity (cc)"
                    color={defaultStyles.colors.mediumGrey}
                  />
                  <AppFormField
                    name="engine_capacity"
                    placeholder="Engine Capacity (cc)"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Info
                    name="calendar"
                    text="Year"
                    color={defaultStyles.colors.mediumGrey}
                  />
                  <AppFormField
                    name="year"
                    placeholder="Year"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Info
                    name="calendar-check"
                    text="Registration Date"
                    color={defaultStyles.colors.mediumGrey}
                  />
                  <AppFormDateTimePicker
                    name="registration_date"
                    placeholder="Please select"
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Info
                    name="alert-outline"
                    text="MOT Expiry"
                    color={defaultStyles.colors.mediumGrey}
                  />
                  <AppFormDateTimePicker
                    name="mot_expiry"
                    placeholder="Please select"
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Info
                    name="settings"
                    text="Transmission"
                    color={defaultStyles.colors.mediumGrey}
                  />
                  <AppFormPicker
                    name="transmission"
                    placeholder="Please select"
                    items={transmissionArray}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Info
                    name="car-seat"
                    text="Seats"
                    color={defaultStyles.colors.mediumGrey}
                  />
                  <AppFormField
                    name="seats"
                    placeholder="Seats"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Info
                    name="car-door"
                    text="Doors"
                    color={defaultStyles.colors.mediumGrey}
                  />
                  <AppFormField
                    name="doors"
                    placeholder="Doors"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Info
                    name="train-car"
                    text="Body Style"
                    color={defaultStyles.colors.mediumGrey}
                  />
                  <AppFormPicker
                    name="bodyStyle"
                    placeholder="Please select"
                    items={bodyStyleArray}
                  />
                </View>
                <AppErrorMessage
                  error="Please fix the errors above before moving on."
                  visible={
                    !(
                      Object.keys(errors).length === 0 &&
                      errors.constructor === Object
                    )
                  }
                />
                <AppErrorMessage error={error} visible={error} />
                <SubmitButton
                  icon="arrow-right"
                  color={defaultStyles.colors.primary}
                  title="Next"
                />
              </>
            )}
          </Formik>
          <AppButton
            icon="arrow-left"
            title="back"
            color={defaultStyles.colors.secondary}
            onPress={() => navigation.goBack()}
          />
        </Screen>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fieldContainer: {
    marginBottom: 10,
    alignItems: "flex-start",
  },
  infoContainer: {
    width: "45%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  modal: {
    padding: 20,
    backgroundColor: defaultStyles.colors.lightGrey,
    flex: 1,
    justifyContent: "center",
  },
});

export default VehicleDetailScreen;
