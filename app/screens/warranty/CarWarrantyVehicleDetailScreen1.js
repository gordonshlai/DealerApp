import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import { Formik } from "formik";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Background from "../../components/Background";
import {
  AppErrorMessage,
  AppForm,
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
import useApi from "../../hooks/useApi";
import client from "../../api/client";
import routes from "../../navigation/routes";
import WarrantyContext from "../../warranty/context";

const withRegValidationSchema = Yup.object().shape({
  registration: Yup.string().required().label("Registration"),
  mileage: Yup.string().required().label("Mileage"),
});

const withoutRegValidationSchema = Yup.object().shape({
  make: Yup.string().required().label("Make"),
  model: Yup.string().required().label("Model"),
});

function CarWarrantyVehicleDetailScreen1({ navigation, route }) {
  const { setVehicle } = useContext(WarrantyContext);
  const tabBarHeight = useBottomTabBarHeight();

  const [error, setError] = useState();
  const [withReg, setWithReg] = useState(true);

  const makesApi = useApi(() => client.get("api/car/makes"));
  const modelsApi = useApi((endpoint) => client.get(endpoint));
  const lookupApi = useApi((payload) => client.post("api/car/lookup", payload));

  const handleWithRegSubmit = async ({ registration, mileage }) => {
    const result = await lookupApi.request({ registration, mileage });
    console.log(result);
    if (!result.ok) return setError(result.data.message);
    setVehicle(result.data);
    navigation.navigate(routes.CAR_WARRANTY_VEHICLE_DETAIL_2);
  };

  const handleWithoutRegSubmit = ({ make, model }) => {
    console.log(make + model);
    setVehicle({ make, model });
    navigation.navigate(routes.CAR_WARRANTY_VEHICLE_DETAIL_2);
  };

  const WithRegButton = ({ text, onPress, icon, selected }) => {
    return (
      <TouchableOpacity
        style={[styles.withRegButton, selected && styles.withRegButtonSelected]}
        onPress={onPress}
      >
        <MaterialCommunityIcons
          name={icon}
          size={40}
          color={selected ? colors.primary : colors.mediumGrey}
        />
        <AppText
          style={[styles.withRegText, selected && styles.withRegTextSelected]}
        >
          {text}
        </AppText>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Background />
      <ActivityIndicator
        visible={makesApi.loading || modelsApi.loading || lookupApi.loading}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        keyboardVerticalOffset={Platform.OS == "ios" ? 50 : 0}
        style={styles.keyboardAvoidingView}
      >
        <ProgressBar route={route} />
        <AppText style={styles.sectionTitle}>Vehicle Detail (1/2)</AppText>
        <ScrollView>
          <Screen style={styles.screen}>
            <View style={[styles.card, { marginBottom: tabBarHeight }]}>
              <WithRegButton
                text="With Registration"
                icon="check-circle"
                onPress={() => setWithReg(true)}
                selected={withReg}
              />
              <WithRegButton
                text="Without Registration"
                icon="close-circle"
                onPress={async () => {
                  setWithReg(false);
                  await makesApi.request();
                }}
                selected={!withReg}
              />
              {withReg ? (
                <AppForm
                  initialValues={{ registration: "", mileage: "" }}
                  onSubmit={handleWithRegSubmit}
                  validationSchema={withRegValidationSchema}
                >
                  <View style={styles.fieldContainer}>
                    <RegistrationPlateInput
                      name="registration"
                      placeholder="ENTER REGISTRATION"
                      onContentSizeChange={() => setError("")}
                    />
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
                  <AppErrorMessage error={error} visible={error} />
                  <SubmitButton title="Next" />
                </AppForm>
              ) : (
                <Formik
                  initialValues={{ make: "", model: "" }}
                  onSubmit={handleWithoutRegSubmit}
                  validationSchema={withoutRegValidationSchema}
                >
                  {({ values, setFieldValue }) => (
                    <>
                      <View style={styles.fieldContainer}>
                        <AppText style={styles.fieldTitle}>Make</AppText>
                        <AppFormPicker
                          name="make"
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
                        <AppText style={styles.fieldTitle}>Model</AppText>
                        <AppFormPicker
                          name="model"
                          items={modelsApi.data}
                          disabled={!values["make"]}
                        />
                      </View>
                      <SubmitButton title="Next" />
                    </>
                  )}
                </Formik>
              )}
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
  withRegButton: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 20,
    borderColor: colors.mediumGrey,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  withRegButtonSelected: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: "white",
    ...defaultStyles.shadow,
  },
  withRegText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.mediumGrey,
  },
  withRegTextSelected: {
    color: colors.darkGrey,
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

export default CarWarrantyVehicleDetailScreen1;
