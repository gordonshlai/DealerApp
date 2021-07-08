import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Yup from "yup";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";

import ActivityIndicator from "../../components/ActivityIndicator";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import {
  AppErrorMessage,
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../../components/forms";
import Screen from "../../components/Screen";

import useApi from "../../hooks/useApi";
import settingsApi from "../../api/settings";
import colors from "../../config/colors";
import routes from "../../navigation/routes";

/**
 * Validation schema for the New Card form.
 */
const validationSchema = Yup.object().shape({
  holder: Yup.string().required().label("Card Holder"),
  number: Yup.string().required().label("Card Number"),
  type: Yup.string().required().label("Card Type"),
  expiry: Yup.string().required().label("Card Expiry"),
  cv2: Yup.string().required().label("CV2"),
  address_1: Yup.string().required().label("Address line 1"),
  address_2: Yup.string().label("Address line 2"),
  city: Yup.string().required().label("City"),
  postcode: Yup.string().required().label("Postcode"),
  permissions: Yup.boolean().label("Permission"),
});

/**
 * Card types applicable to the backend.
 */
const cardType = ["VISA", "Master Card", "American Express"];

function NewCardScreen({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();

  const [checked, setChecked] = useState(false);
  const [error, setError] = useState();

  const postPaymentCardApi = useApi((payload) =>
    settingsApi.postPayment(payload)
  );

  /**
   * Handle the submit for the new card form.
   *
   * @param {object} values The input values to the new card form.
   */
  const handleSubmit = async (values) => {
    values.number = values.number.replace(/\s+/g, "");
    values.type =
      values.type === "Master Card"
        ? "MC"
        : values.type === "American Express"
        ? "AMEX"
        : "VISA";

    const result = await postPaymentCardApi.request(values);
    console.log(result);
    if (!result.ok)
      return setError(
        result.data?.message?.StatusDetail ?? result.data?.message
      );
    navigation.popToTop();
    navigation.navigate(routes.PAYMENT_CARDS);
  };

  return (
    <>
      <LinearGradient
        colors={["#143C4B", "#0E262F"]}
        style={styles.background}
      />

      <ActivityIndicator visible={postPaymentCardApi.loading} />
      <Screen>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : ""}
          keyboardVerticalOffset={Platform.OS == "ios" ? 50 : 0}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            centerContent
            contentContainerStyle={styles.scrollView}
          >
            <AppForm
              initialValues={{
                holder: "",
                number: "",
                type: "",
                expiry: "",
                cv2: "",
                address_1: "",
                address_2: "",
                city: "",
                postcode: "",
                permissions: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <View style={styles.formFieldContainer}>
                <AppText style={styles.fieldName}>Card Holder</AppText>
                <AppFormField
                  name="holder"
                  placeholder="Card holder"
                  color="white"
                />
              </View>
              <View style={styles.formFieldContainer}>
                <AppText style={styles.fieldName}>Card Number</AppText>
                <AppFormField
                  keyboardType="numeric"
                  name="number"
                  placeholder="Card Number"
                  color="white"
                />
              </View>
              <View style={styles.formFieldContainer}>
                <AppText style={styles.fieldName}>Card Type</AppText>
                <AppFormPicker name="type" items={cardType} />
              </View>
              <View style={styles.formFieldContainer}>
                <AppText style={styles.fieldName}>Card Expiry</AppText>
                <AppFormField
                  keyboardType="numeric"
                  name="expiry"
                  placeholder="Card Expiry"
                  color="white"
                />
              </View>
              <View style={styles.formFieldContainer}>
                <AppText style={styles.fieldName}>Card CV2</AppText>
                <AppFormField
                  keyboardType="numeric"
                  name="cv2"
                  placeholder="Card CV2"
                  color="white"
                />
              </View>
              <View style={styles.formFieldContainer}>
                <AppText style={styles.fieldName}>Address Line 1</AppText>
                <AppFormField
                  name="address_1"
                  placeholder="Address Line 1"
                  color="white"
                />
              </View>
              <View style={styles.formFieldContainer}>
                <AppText style={styles.fieldName}>Address Line 2</AppText>
                <AppFormField
                  name="address_2"
                  placeholder="Address Line 2"
                  color="white"
                />
              </View>
              <View style={styles.formFieldContainer}>
                <AppText style={styles.fieldName}>City</AppText>
                <AppFormField name="city" placeholder="City" color="white" />
              </View>
              <View style={styles.formFieldContainer}>
                <AppText style={styles.fieldName}>Postcode</AppText>
                <AppFormField
                  name="postcode"
                  placeholder="Postcode"
                  color="white"
                />
              </View>
              <View style={styles.formFieldContainer}>
                <AppText style={styles.fieldName}>Declaration</AppText>
                <CheckBox
                  checked={checked}
                  checkedColor="#0F0"
                  title=" I understand that the card used above is registered to the
                  Supplying Dealer as named on the Warrantywise Dealernet
                  System. I understand that the use of any third party payment
                  card (ie the customer) is prohibited and will result in my
                  Dealer Account being frozen or even cancelled. I understand
                  that the Dealernet System will store my credit/debit card
                  details in a secure and encrypted manner approved by SagePay
                  and that I am the registered cardholder with full permission
                  to provide these details."
                  onPress={() => setChecked(!checked)}
                  containerStyle={styles.checkBoxContainer}
                  textStyle={styles.checkBoxText}
                />
              </View>
              <AppErrorMessage visible={error} error={error} />
              <SubmitButton title="Add Card" />
              <AppButton
                title="Cancel"
                backgroundColor={null}
                onPress={() => navigation.goBack()}
                style={{ marginBottom: tabBarHeight }}
              />
            </AppForm>
          </ScrollView>
        </KeyboardAvoidingView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  formFieldContainer: {
    marginVertical: 15,
  },
  fieldName: {
    color: "white",
    fontWeight: "bold",
  },
  checkBoxContainer: {
    backgroundColor: null,
    borderWidth: 0,
  },
  checkBoxText: {
    color: colors.lightGrey,
  },
});

export default NewCardScreen;
