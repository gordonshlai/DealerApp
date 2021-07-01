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
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../../components/forms";
import Screen from "../../components/Screen";
import ProgressBar from "./components/ProgressBar";
import ViewDocument from "../../components/ViewDocument";
import Picker from "../../components/Picker";
import AppSwitch from "../../components/AppSwitch";

import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import useApi from "../../hooks/useApi";
import client from "../../api/client";
import ActivityIndicator from "../../components/ActivityIndicator";
import routes from "../../navigation/routes";
import WarrantyContext from "../../warranty/context";
import settings from "../../config/settings";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
  first_name: Yup.string().required().label("First Name"),
  last_name: Yup.string().required().label("Last Name"),
  telephone: Yup.string().required().label("Telephone"),
  email: Yup.string().required().email().label("Email"),
  address_1: Yup.string().required().label("Address Line 1"),
  address_2: Yup.string().label("Address Line 2"),
  town: Yup.string().required().label("Town"),
  county: Yup.string().required().label("County"),
  postcode: Yup.string().required().label("Postcode"),
  print: Yup.boolean().required().label("Print"),
});

function CarWarrantyCustomerDetailScreen({ route, navigation }) {
  const { quote, setCustomer } = useContext(WarrantyContext);

  const tabBarHeight = useBottomTabBarHeight();

  const titleOptions = ["Mr", "Ms", "Mrs", "Miss", "Dr"];

  const [error, setError] = useState();
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = (values) => {
    setCustomer(values);
    navigation.navigate(routes.CAR_WARRANTY_PAYMENT_DETAIL);
  };

  const lookupApi = useApi((payload) =>
    client.post("api/customer/postcode/lookup", payload)
  );

  const addressesArray = () => {
    let addressCollection = [];
    addresses.map((item) => {
      addressCollection.push(`${item.address_1}, ${item.address_2}`);
    });
    return addressCollection;
  };

  const onSelectAddress = (item, setFieldValue) => {
    const selectedAddress = addresses[addressesArray().indexOf(item)];
    setFieldValue("address_1", selectedAddress.address_1);
    setFieldValue("address_2", selectedAddress.address_2);
    setFieldValue("town", selectedAddress.city);
    setFieldValue("county", selectedAddress.county);
    setAddress(item);
  };

  return (
    <>
      <Background />
      <ActivityIndicator visible={lookupApi.loading} />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        keyboardVerticalOffset={Platform.OS == "ios" ? 50 : 0}
        style={styles.keyboardAvoidingView}
      >
        <ProgressBar route={route} />
        <View style={styles.sectionTitleContainer}>
          <AppText style={styles.sectionTitle}>Customer Detail</AppText>
          <AppButton
            title="View Quote"
            backgroundColor={colors.primary}
            border={null}
            onPress={() => setModalVisible(true)}
          />
          <ViewDocument
            visible={modalVisible}
            setVisible={setModalVisible}
            uri={`${settings.apiUrl}api/car/warranty/quote/document/${quote.token}`}
          />
        </View>
        <ScrollView>
          <Screen style={styles.screen}>
            <View style={[styles.card, { marginBottom: tabBarHeight }]}>
              <Formik
                initialValues={{
                  title: "",
                  first_name: "",
                  last_name: "",
                  telephone: "",
                  email: "",
                  address_1: "",
                  address_2: "",
                  town: "",
                  county: "",
                  postcode: "",
                  print: false,
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {({ values, setFieldValue, isValid, submitCount }) => (
                  <>
                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>Name</AppText>
                      <AppFormPicker
                        name="title"
                        items={titleOptions}
                        placeholder="Title"
                      />
                      <AppFormField
                        name="first_name"
                        placeholder="First Name"
                        style={styles.appFormField}
                      />
                      <AppFormField
                        name="last_name"
                        placeholder="Last Name"
                        style={styles.appFormField}
                      />
                    </View>
                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>Email</AppText>
                      <AppFormField
                        name="email"
                        placeholder="Email"
                        keyboardType="email-address"
                        style={styles.appFormField}
                      />
                    </View>
                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>Telephone</AppText>
                      <AppFormField
                        name="telephone"
                        placeholder="Telephone"
                        keyboardType="numeric"
                        style={styles.appFormField}
                      />
                    </View>
                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>
                        Address Lookup
                      </AppText>
                      <View style={styles.lookupContainer}>
                        <View style={styles.postcodeContainer}>
                          <AppFormField
                            name="postcode"
                            placeholder="Postcode"
                            autoCapitalize="characters"
                            onContentSizeChange={() => setError(null)}
                            style={styles.appFormField}
                          />
                        </View>
                        <AppButton
                          title="Lookup"
                          onPress={async () => {
                            const lookupResponse = await lookupApi.request({
                              postcode: values["postcode"],
                            });
                            console.log(lookupResponse);
                            if (!lookupResponse.ok) {
                              setAddresses([]);
                              setAddress("");
                              return setError(
                                lookupResponse.data.message ||
                                  lookupResponse.data.Message
                              );
                            }
                            setAddresses(lookupResponse.data);
                          }}
                        />
                      </View>
                      <AppErrorMessage error={error} visible={error} />
                      {addresses.length > 0 && (
                        <Picker
                          items={addressesArray()}
                          selectedItem={address}
                          onSelectItem={(item) =>
                            onSelectAddress(item, setFieldValue)
                          }
                        />
                      )}
                    </View>

                    <View style={[styles.fieldContainer, { marginTop: 30 }]}>
                      <AppText style={styles.fieldTitle}>
                        Address Line 1
                      </AppText>
                      <AppFormField
                        name="address_1"
                        placeholder="Address Line 1"
                        style={styles.appFormField}
                      />
                    </View>
                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>
                        Address Line 2
                      </AppText>
                      <AppFormField
                        name="address_2"
                        placeholder="Address Line 2"
                        style={styles.appFormField}
                      />
                    </View>
                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>Town</AppText>
                      <AppFormField
                        name="town"
                        placeholder="Town"
                        style={styles.appFormField}
                      />
                    </View>
                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>County</AppText>
                      <AppFormField
                        name="county"
                        placeholder="County"
                        style={styles.appFormField}
                      />
                    </View>
                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>Postcode</AppText>
                      <AppFormField
                        name="postcode"
                        placeholder="Postcode"
                        autoCapitalize="characters"
                        style={styles.appFormField}
                      />
                    </View>
                    <View style={styles.fieldContainer}>
                      <AppSwitch
                        value={values["print"]}
                        text="Print Plan Documents"
                        tooltip="If you check this we will print and mail the documents to the customer"
                        onValueChange={() =>
                          setFieldValue("print", !values["print"])
                        }
                      />
                    </View>
                    <AppErrorMessage
                      error="Please fix the errors above before moving on."
                      visible={!isValid && submitCount}
                    />
                    <SubmitButton title="Next" />
                  </>
                )}
              </Formik>
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
  sectionTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 20,
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
  lookupContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  postcodeContainer: {
    flex: 1,
    marginRight: 10,
  },
});

export default CarWarrantyCustomerDetailScreen;
