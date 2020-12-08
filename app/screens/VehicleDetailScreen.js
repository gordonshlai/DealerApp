import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import * as Yup from "yup";

import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppText from "../components/AppText";
import Info from "../components/Info";
import {
  AppErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";

import defaultStyles from "../config/styles";
import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
  make: Yup.string().required().label("Make"),
  model: Yup.string().required().label("Model"),
  registration: Yup.string().required().label("Registration"),
  mileage: Yup.number().required().label("Mileage"),
  colour: Yup.string().label("Colour"),
  fuel: Yup.string().required().label("Fuel"),
  engineCC: Yup.number().required().label("Engine CC"),
  registraionDate: Yup.date().required().label("Registration Date"),
  year: Yup.number().required().label("Year"),
  motExpiry: Yup.date().required().label("MOT Expiry"),
  transmission: Yup.string().label("Transmission"),
  seats: Yup.number().label("Seats"),
  doors: Yup.number().label("Doors"),
  bodyType: Yup.string().label("Body Type"),
});

function VehicleDetailScreen({ route, navigation }) {
  const vehicle = route.params;
  return (
    <ScrollView>
      <Screen style={styles.screen}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <AppTextInput icon="car" placeholder="Make" />
          <AppButton
            icon="arrow-left"
            title="back"
            color={defaultStyles.colors.secondary}
            onPress={() => navigation.navigate(routes.NEW_CAR)}
          />
        </KeyboardAvoidingView>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
});

export default VehicleDetailScreen;
