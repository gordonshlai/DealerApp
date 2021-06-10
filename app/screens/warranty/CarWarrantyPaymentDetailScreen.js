import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Linking,
  Dimensions,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { WebView } from "react-native-webview";
import { Buffer } from "buffer";

import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Background from "../../components/Background";
import Screen from "../../components/Screen";
import ProgressBar from "./components/ProgressBar";
import Terms from "./components/Terms";

import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import useApi from "../../hooks/useApi";
import client from "../../api/client";
import ActivityIndicator from "../../components/ActivityIndicator";
import routes from "../../navigation/routes";
import WarrantyContext from "../../warranty/context";
import settings from "../../config/settings";

function CarWarrantyPaymentDetailScreen({ route, navigation }) {
  const { user, quote, booking, customer } = useContext(WarrantyContext);
  const tabBarHeight = useBottomTabBarHeight();

  const [error, setError] = useState();
  const [termsVisible, setTermsVisible] = useState(false);

  const pdfApi = useApi(() =>
    client.get(`api/car/warranty/quote/document/${quote.token}`)
  );

  const price = () =>
    user.account.vat === "1"
      ? (booking.cost_margin / 1.2).toFixed(2)
      : booking.cost_margin.toFixed(2);

  const vatRate = () => (user.account.vat === "1" ? "20%" : "0%");

  const vatDue = () =>
    user.account.vat === "1" ? (price() * 0.2).toFixed(2) : "0.00";

  const PdfReader = ({ url: uri }) => (
    <WebView javaScriptEnabled={true} style={{ flex: 1 }} source={{ uri }} />
  );

  return (
    <>
      <Background />
      <ActivityIndicator visible={pdfApi.loading} />
      {/* {console.log(quote)}
      {console.log(booking)}
      {console.log(customer)} */}
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        keyboardVerticalOffset={Platform.OS == "ios" ? 50 : 0}
        style={styles.keyboardAvoidingView}
      >
        <ProgressBar route={route} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginRight: 20,
          }}
        >
          <AppText style={styles.sectionTitle}>Payment Detail</AppText>
          <AppButton
            title="Download Quote"
            backgroundColor={colors.primary}
            border={null}
            onPress={
              async () => {
                const res = await pdfApi.request();
                console.log(res);
                if (!res.ok) return setError(res.data.message);
                const buff = Buffer.from(res, "base64");
                console.log(buff.toString());
              }
              // Linking.openURL(
              //   `${settings.apiUrl}api/car/warranty/quote/document/${quote.token}`
              // )
            }
          />
        </View>
        <ScrollView>
          <Screen style={styles.screen}>
            <View style={[styles.card, { marginBottom: tabBarHeight }]}>
              <AppText style={styles.title}>Payment Summary</AppText>
              <View
                style={{ flex: 1, height: 300, backgroundColor: "#ecf0f1" }}
              >
                <PdfReader
                // url={`https://dev-dealer.warrantywise.co.uk/api/car/warranty/quote/document/${quote.token}`}
                // url={`${settings.apiUrl}api/car/warranty/quote/document/${quote.token}`}
                // url={"https://google.com"}
                />
              </View>
              <View style={styles.fieldContainer}>
                <AppText style={[styles.fieldValue, { fontWeight: "bold" }]}>
                  Cover Level
                </AppText>
                <AppText style={styles.fieldValue}>{quote.quote.cover}</AppText>
              </View>
              <View style={styles.fieldContainer}>
                <AppText style={[styles.fieldValue, { fontWeight: "bold" }]}>
                  Cover Length
                </AppText>
                <AppText style={styles.fieldValue}>
                  {quote.coverLength} Months
                </AppText>
              </View>
              <View style={[styles.fieldContainer, styles.price]}>
                <AppText style={[styles.fieldValue, { fontWeight: "bold" }]}>
                  Price
                </AppText>
                <AppText style={styles.fieldValue}>£{price()}</AppText>
              </View>
              <View style={[styles.fieldContainer, { marginTop: 20 }]}>
                <AppText style={[styles.fieldValue, { fontWeight: "bold" }]}>
                  VAT Rate
                </AppText>
                <AppText style={styles.fieldValue}>{vatRate()}</AppText>
              </View>
              <View style={styles.fieldContainer}>
                <AppText style={[styles.fieldValue, { fontWeight: "bold" }]}>
                  VAT Due
                </AppText>
                <AppText style={styles.fieldValue}>£{vatDue()}</AppText>
              </View>
              <View style={[styles.fieldContainer, styles.totalDue]}>
                <AppText style={[styles.fieldValue, { fontWeight: "bold" }]}>
                  Total Due
                </AppText>
                <AppText style={[styles.fieldValue, { fontWeight: "bold" }]}>
                  £{booking.cost_margin.toFixed(2)}
                </AppText>
              </View>

              <AppText style={styles.title}>Qualifying Statements</AppText>
              <AppText style={{ fontWeight: "bold" }}>
                By clicking agree below you are agreeing with the following
                statements:
              </AppText>
              <View style={{ padding: 20 }}>
                <AppText style={{ marginBottom: 10 }}>
                  This vehicle has never been declared as an insurance write off
                  (Any category, A, B or S)
                </AppText>
                <AppText style={{ marginBottom: 10 }}>
                  This vehicle has and will never be used for hire and reward
                  (police, ambulance, driving school or taxi)
                </AppText>
                <AppText style={{ marginBottom: 10 }}>
                  The named customer is not the owner, proprietor or director of
                  a motor trade business, vehicle auction, repair garage,
                  vehicle leasing, hire or rental company.
                </AppText>
              </View>

              <AppText style={styles.title}>Terms & Conditions</AppText>
              <AppButton
                backgroundColor={colors.secondary}
                border={null}
                title="View Terms & Conditions"
                onPress={() => setTermsVisible(true)}
              />
              <Terms visible={termsVisible} setVisible={setTermsVisible} />

              <AppText style={styles.title}>Payment Type</AppText>

              <AppButton title="Accept & Purchase" />
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.secondary,
    marginTop: 10,
    marginBottom: 20,
  },
  fieldContainer: {
    flexDirection: "row",
  },
  fieldValue: {
    flex: 1,
    textAlign: "right",
  },
  price: {
    marginTop: 20,
    borderColor: colors.lightGrey,
    borderTopWidth: 1,
  },
  totalDue: {
    paddingTop: 20,
    borderColor: colors.lightGrey,
    borderTopWidth: 1,
    marginBottom: 30,
  },
});

export default CarWarrantyPaymentDetailScreen;
