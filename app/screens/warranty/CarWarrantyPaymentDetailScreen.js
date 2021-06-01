import React, { useContext, useState } from "react";
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
import ProgressBar from "./components/ProgressBar";

import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import useApi from "../../hooks/useApi";
import client from "../../api/client";
import ActivityIndicator from "../../components/ActivityIndicator";
import routes from "../../navigation/routes";
import WarrantyContext from "../../warranty/context";

function CarWarrantyPaymentDetailScreen({ route, navigation }) {
  const { booking } = useContext(WarrantyContext);
  const tabBarHeight = useBottomTabBarHeight();

  const [error, setError] = useState();

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
        <AppText style={styles.sectionTitle}>Payment Detail</AppText>
        <ScrollView>
          <Screen style={styles.screen}>
            <View style={[styles.card, { marginBottom: tabBarHeight }]}>
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

export default CarWarrantyPaymentDetailScreen;
