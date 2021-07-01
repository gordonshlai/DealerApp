import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  RefreshControl,
  Modal,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { WebView } from "react-native-webview";
import dayjs from "dayjs";

import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import ActivityIndicator from "../../components/ActivityIndicator";
import Background from "../../components/Background";
import Screen from "../../components/Screen";
import ProgressBar from "./components/ProgressBar";
import Terms from "./components/Terms";
import PaymentCard from "../../components/PaymentCard";
import AppTextInput from "../../components/AppTextInput";
import { AppErrorMessage } from "../../components/forms";

import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import useApi from "../../hooks/useApi";
import client from "../../api/client";
import routes from "../../navigation/routes";
import WarrantyContext from "../../warranty/context";
import settings from "../../config/settings";
import ViewDocument from "../../components/ViewDocument";

function CarWarrantyPaymentDetailScreen({ route, navigation }) {
  const { user, quote, booking, customer } = useContext(WarrantyContext);
  const tabBarHeight = useBottomTabBarHeight();

  const [error, setError] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);
  const [cv2, setCV2] = useState("");
  const [documentModalVisible, setDocumentModalVisible] = useState(false);
  const [sageModalVisible, setSageModalVisible] = useState(false);
  const [sage, setSage] = useState({});

  const pdfApi = useApi(() =>
    client.get(`api/car/warranty/quote/document/${quote.token}`)
  );
  const getPaymentCardApi = useApi(() =>
    client.get("api/car/warranty/payment")
  );
  const postPaymentApi = useApi((payload) =>
    client.post("api/car/warranty/payment", payload)
  );
  const postAcsurlApi = useApi((url, payload) => client.post(url, payload));

  useEffect(() => {
    getPaymentCardApi.request();
  }, []);

  const price = () =>
    user.account.vat === "1"
      ? (booking.cost_margin / 1.2).toFixed(2)
      : booking.cost_margin.toFixed(2);

  const vatRate = () => (user.account.vat === "1" ? "20%" : "0%");

  const vatDue = () =>
    user.account.vat === "1" ? (price() * 0.2).toFixed(2) : "0.00";

  const handlePurchase = async () => {
    const payload = {
      amount: booking.cost_margin,
      booking: {
        address_1: customer.address_1,
        address_2: customer.address_2,
        airbags: quote.quote.airbags,
        aircon: quote.quote.aircon,
        assist: quote.quote.assist,
        claims: quote.quote.claims,
        cost_margin: booking.cost_margin,
        cost_net: booking.cost_net,
        cost_total: booking.cost_total,
        country: customer.country,
        cover_length: quote.coverLength,
        cover_type: quote.quote.cover,
        dealer_id: user.account.id,
        email: customer.email,
        emissions: quote.quote.emissions,
        engine_cc: quote.vehicle.engine_cc,
        ev: quote.quote.ev,
        first_name: customer.first_name,
        fuel_type: quote.vehicle.fuel_type,
        issue_date: dayjs().format("YYYY-MM-DD"),
        labour: quote.quote.labour,
        last_name: customer.last_name,
        make: quote.vehicle.make,
        manufacture_date: quote.vehicle.manufacture_date,
        mileage: quote.vehicle.mileage,
        model: quote.vehicle.model,
        mot: quote.quote.mot,
        mot_date: booking.mot_date,
        multimedia: quote.quote.multimedia,
        postcode: customer.postcode,
        print: customer.print,
        purchase_date: booking.purchase_date,
        quote_id: quote.id,
        registration: quote.vehicle.registration,
        retail_value: quote.vehicle.retail_value,
        service_date: booking.service_date,
        service_history: booking.service_history,
        start_date: booking.start_date,
        telephone: customer.telephone,
        test: quote.quote.test,
        title: customer.title,
        token: quote.token,
        town: customer.town,
        transmission: quote.vehicle.transmission,
        vehicle_origin: quote.vehicle.vehicle_origin,
        vin_number: booking.vin_number,
      },
      cv2,
      token: getPaymentCardApi.data.token?.token,
    };
    const result = await postPaymentApi.request(payload);
    console.log(result);
    if (result.data.hasOwnProperty("auth")) {
      const res = await postAcsurlApi.request(result.data.auth.ACSURL, {
        MD: result.data.auth.MD,
        PaReq: result.data.auth.PAReq,
        TermUrl: result.data.auth.TermUrl,
      });
      console.log(res);
      setSage(result.data.auth);
      setSageModalVisible(true);
    }
    if (!result.ok) return setError(result.data.message);
    navigation.popToTop();
    navigation.navigate(routes.MY_SALE_DETAIL, result.data.id);
  };

  return (
    <>
      <Background />
      <ActivityIndicator
        visible={
          pdfApi.loading || getPaymentCardApi.loading || postPaymentApi.loading
        }
      />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        keyboardVerticalOffset={Platform.OS == "ios" ? 50 : 0}
        style={styles.keyboardAvoidingView}
      >
        <ProgressBar route={route} />
        <View style={styles.sectionTitleContainer}>
          <AppText style={styles.sectionTitle}>Payment Detail</AppText>
          <AppButton
            title="View Quote"
            backgroundColor={colors.primary}
            border={null}
            onPress={() => setDocumentModalVisible(true)}
          />
          <ViewDocument
            visible={documentModalVisible}
            setVisible={setDocumentModalVisible}
            uri={`${settings.apiUrl}api/car/warranty/quote/document/${quote.token}`}
          />
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => getPaymentCardApi.request()}
            />
          }
        >
          <Screen style={styles.screen}>
            <View style={[styles.card, { marginBottom: tabBarHeight }]}>
              <AppText style={styles.title}>Payment Summary</AppText>
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
              {user.account.payment_type === "0" ? (
                <View style={{ marginBottom: 20 }}>
                  <AppText style={{ fontWeight: "bold", marginBottom: 20 }}>
                    Card Payment
                  </AppText>
                  <PaymentCard
                    last_4={getPaymentCardApi.data.token?.last_4}
                    holder={getPaymentCardApi.data.token?.holder}
                    expiry={getPaymentCardApi.data.token?.expiry}
                    type={getPaymentCardApi.data.token?.type}
                  />
                  <View style={styles.updatePaymentCardContainer}>
                    <AppText>Update or change your payment card </AppText>
                    <AppText
                      style={styles.here}
                      onPress={() =>
                        navigation.navigate(routes.ACCOUNT, {
                          screen: routes.PAYMENT_CARDS,
                          initial: false,
                        })
                      }
                    >
                      here
                    </AppText>
                  </View>

                  {!getPaymentCardApi.data.repeat_allowed && (
                    <View>
                      <AppText style={styles.title}>Confirm Card CV2</AppText>
                      <AppTextInput
                        onChangeText={(value) => setCV2(value)}
                        placeholder="Enter Card CV2"
                      />
                    </View>
                  )}
                </View>
              ) : (
                <AppText style={{ fontWeight: "bold", marginBottom: 20 }}>
                  Invoiced
                </AppText>
              )}
              <AppErrorMessage visible={error} error={error} />
              <AppButton title="Accept & Purchase" onPress={handlePurchase} />
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

      <Modal
        visible={sageModalVisible}
        onRequestClose={() => setSageModalVisible(false)}
      >
        <ActivityIndicator visible={!sage.ACSURL} />
        {sage.ACSURL && (
          <WebView
            javaScriptEnabled={true}
            source={{
              uri: sage.ACSURL,
              method: "POST",
              body: { MD: sage.MD, PaReq: sage.PAReq, TermUrl: sage.TermUrl },
            }}
            style={{ flex: 1, marginVertical: 50 }}
          />
        )}
        <AppButton onPress={() => setSageModalVisible(false)} />
      </Modal>
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
  updatePaymentCardContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  here: {
    color: colors.primary,
  },
});

export default CarWarrantyPaymentDetailScreen;
