import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
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

import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import useApi from "../../hooks/useApi";
import client from "../../api/client";
import ActivityIndicator from "../../components/ActivityIndicator";
import routes from "../../navigation/routes";
import WarrantyContext from "../../warranty/context";

const withRegValidationSchema = Yup.object().shape({
  registration: Yup.string().label("Registration"),
  mileage: Yup.number().label("Mileage"),
});

const withoutRegValidationSchema = Yup.object().shape({
  make: Yup.string().label("Make"),
  model: Yup.string().label("Model"),
});

function CarWarrantyDetailScreen({ navigation }) {
  const { booking } = useContext(WarrantyContext);
  const tabBarHeight = useBottomTabBarHeight();

  const [error, setError] = useState();
  const [withReg, setWithReg] = useState(true);

  const makesApi = useApi(() => client.get("api/car/makes"));
  const modelsApi = useApi((endpoint) => client.get(endpoint));

  const handleWithRegSubmit = async ({ registration, mileage }) => {
    console.log(registration + mileage);
    navigation.navigate(routes.CAR_WARRANTY_CUSTOMER_DETAIL);
  };

  const handleWithoutRegSubmit = async ({ make, model }) => {
    console.log(make + model);
    navigation.navigate(routes.CAR_WARRANTY_CUSTOMER_DETAIL);
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

  const WithRegForm = () => {
    return (
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
    );
  };

  const WithoutRegForm = () => {
    return (
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
              <AppText style={styles.fieldTitle}>Model</AppText>
              <AppFormPicker
                name="model"
                placeholder="Please select"
                items={modelsApi.data}
                disabled={!values["make"]}
              />
            </View>
            <AppErrorMessage error={error} visible={error} />
            <SubmitButton title="Next" />
          </>
        )}
      </Formik>
    );
  };

  return (
    <>
      <Background />
      <ActivityIndicator visible={makesApi.loading || modelsApi.loading} />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        keyboardVerticalOffset={Platform.OS == "ios" ? 50 : 0}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView>
          <Screen style={styles.screen}>
            <View style={[styles.card, { marginBottom: tabBarHeight }]}>
              <AppText style={styles.sectionTitle}>Warranty Detail</AppText>
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
              <View style={styles.formContainer}>
                {withReg ? <WithRegForm /> : <WithoutRegForm />}
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
  formContainer: {
    marginTop: 30,
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
