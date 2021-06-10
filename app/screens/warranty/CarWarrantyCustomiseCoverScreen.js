import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { WebView } from "react-native-webview";
import { Buffer } from "buffer";
import * as FileSystem from "expo-file-system";
import * as Progress from "react-native-progress";
import * as MediaLibrary from "expo-media-library";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Background from "../../components/Background";
import {
  AppErrorMessage,
  AppFormPicker,
  SubmitButton,
} from "../../components/forms";
import Screen from "../../components/Screen";

import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import useApi from "../../hooks/useApi";
import client from "../../api/client";
import ActivityIndicator from "../../components/ActivityIndicator";
import routes from "../../navigation/routes";
import ProgressBar from "./components/ProgressBar";
import AdditionsItem from "./components/AdditionsItem";
import QuotePrice from "./components/QuotePrice";
import AppSwitch from "./components/AppSwitch";
import WarrantyContext from "../../warranty/context";
import authStorage from "../../auth/storage";
import settings from "../../config/settings";

const validationSchema = Yup.object().shape({
  claims: Yup.number().required().label("Repair Limit"),
  labour: Yup.number().required().label("Labour Rate"),
  airbags: Yup.boolean().required().label("Airbags"),
  aircon: Yup.boolean().required().label("Air Con"),
  assist: Yup.boolean().required().label("Driver Assist"),
  emissions: Yup.boolean().required().label("Emissions"),
  ev: Yup.boolean().required().label("EV"),
  mot: Yup.boolean().required().label("MOT"),
  multimedia: Yup.boolean().required().label("Multimedia"),
});

function CarWarrantyCustomiseCoverScreen({ route, navigation }) {
  const { user, quote, setQuote, setBooking } = useContext(WarrantyContext);
  const coverLevel = quote.quote.cover;
  const electricVehicle =
    quote.vehicle.fuel_type === "ELECTRIC" ||
    quote.vehicle.fuel_type === "HYBRID";

  const pricesKeys = Object.keys(quote.pricing.base);
  const coverLengthOptions = [3, 6, 12, 24, 36];

  const tabBarHeight = useBottomTabBarHeight();

  const [error, setError] = useState();
  const [margin, setMargin] = useState(true);
  const [coverLength, setCoverLength] = useState(12);

  const pdfApi = useApi(() =>
    client.get(`api/car/warranty/quote/document/${quote.token}`)
  );

  const PdfReader = ({ url: uri }) => (
    <WebView javaScriptEnabled={true} style={{ flex: 1 }} source={{ uri }} />
  );

  const repairLimit =
    user.account.id === 43900 // hippo vehicle solutions
      ? [1500, 5000]
      : coverLevel === "PLATINUM PLUS" || // everyone else
        coverLevel === "PLATINUM"
      ? [1000, 2000, 3000, 4000, 5000]
      : coverLevel === "GOLD"
      ? [1000, 2000, 3000]
      : coverLevel === "SILVER"
      ? [1000, 2000]
      : coverLevel === "BRONZE"
      ? [1000]
      : [];

  const labourRate =
    coverLevel === "PLATINUM PLUS"
      ? [200, 250]
      : coverLevel === "PLATINUM"
      ? [35, 50, 75, 100, 150, 200]
      : coverLevel === "GOLD"
      ? [35, 50, 75, 100, 150]
      : coverLevel === "SILVER"
      ? [35, 50, 75, 100]
      : coverLevel === "BRONZE"
      ? [35, 50, 75]
      : [];

  const additions = [
    {
      name: "airbags",
      image: require("./images/airbags.png"),
      text: "Airbags",
      disabled: coverLevel === "PLATINUM PLUS" || coverLevel === "BRONZE",
      tooltip:
        "This plan addition covers you against the cost of repairing or replacing the vehicle’s air bag system due to the failure of a part causing the activation of the air bag warning system where a part of the air bag system is found to be no longer serviceable using diagnostic equipment and/or diagnostic techniques recommended by the Vehicle manufacturer.",
    },
    {
      name: "aircon",
      image: require("./images/aircon.png"),
      text: "Air Con",
      disabled: !(coverLevel === "SILVER"),
      tooltip:
        "This plan addition covers you against the cost of repairing or replacing the vehicle’s air conditioning compressor along with the electromagnetic clutch, condenser evaporator and expansion valve.",
    },
    {
      name: "assist",
      image: require("./images/assist.png"),
      disabled: !(coverLevel === "GOLD" || coverLevel === "SILVER"),
      text: "Driver Assist",
      tooltip:
        "This plan addition is designed to provide the repair cost to the vehicles driver assistance due to the failure of a part or component which directly facilitates the function of the Active Parking Control, Braking Control, Cruise Control and front and rear cameras along with many more (see full list in the terms and conditions).",
    },
    {
      name: "emmission",
      image: require("./images/emissions.png"),
      text: "Emissions",
      disabled: coverLevel === "PLATINUM PLUS" || coverLevel === "BRONZE",
      tooltip:
        "This plan addition covers you against the cost of repairing or replacing the vehicle's catalytic converter, diesel particulate filter or exhaust gas re-circulation valve (CAT, DPF or EGR) following the exhaust gas failing to meet the relevant in-service manufacturer's emissions standards or MOT emissions test.",
    },
    {
      name: "ev",
      image: require("./images/ev.png"),
      text: "EV",
      disabled: false,
      tooltip:
        "This plan addition covers you against the cost of repairing or replacing the vehicles battery, drive motors, high voltage inverter, vehicle energy/power control module, reduction gearbox, regenerative braking system (excluding worn brake pads and shoes), power delivery module and charging unit.",
    },
    {
      name: "mot",
      image: require("./images/mot.png"),
      text: "MOT",
      disabled: !(coverLevel === "PLATINUM" || coverLevel === "GOLD"),
      tooltip:
        "This plan addition covers you against the repair cost of insured parts that have failed a VOSA annual MOT test, including Re-Test Fees. MOT Failure is not included with a 3 Month Plan and will be automatically removed.",
    },
    {
      name: "multimedia",
      image: require("./images/multimedia.png"),
      text: "Multimedia",
      disabled: coverLevel === "PLATINUM PLUS" || coverLevel === "BRONZE",
      tooltip:
        "This plan addition covers you against the repair costs due to the failure of the Radio or CD/DVD player or Satellite Navigation equipment provided that the items were fitted to your Vehicle by the vehicle manufacturer as original equipment.",
    },
  ];

  const patchQuoteApi = useApi((payload) =>
    client.patch(`api/car/warranty/quote/${quote.token}`, payload)
  );

  const handleSubmit = () => {
    const index = coverLengthOptions.indexOf(coverLength);
    inputBooking(pricesKeys[index]);
    navigation.navigate(routes.CAR_WARRANTY_DETAIL);
  };

  const inputBooking = (key) => {
    const totalPrice = quote.pricing.total[key];
    const basePrice = quote.pricing.base[key];
    const vat = user.account.vat === "1" ? 1.2 : 1;
    setBooking({
      cost_margin: totalPrice * vat,
      cost_net: basePrice,
      cost_total: basePrice * vat,
    });
    setQuote({ ...quote, coverLength });
  };

  const onClaimsSelect = async (selectedClaim, values, setFieldValue) => {
    if (selectedClaim !== values["claims"]) {
      const payload = {
        cover: coverLevel,
        ...values,
      };
      payload["claims"] = selectedClaim;
      const newQuote = await patchQuoteApi.request(payload);
      if (!newQuote.ok) {
        setFieldValue("claims", values["claims"]);
        return setError(newQuote.data.message);
      }
      setQuote(newQuote.data);
    }
  };

  const onLabourRateSelect = async (
    selectedLabourRate,
    values,
    setFieldValue
  ) => {
    if (selectedLabourRate !== values["labour"]) {
      const payload = {
        cover: coverLevel,
        ...values,
      };
      payload["labour"] = selectedLabourRate;
      const newQuote = await patchQuoteApi.request(payload);
      if (!newQuote.ok) {
        setFieldValue("labour", values["labour"]);
        return setError(newQuote.data.message);
      }
      setQuote(newQuote.data);
    }
  };

  const onAdditionsItemPress = async (item, values, setFieldValue) => {
    if (!item.disabled) {
      const payload = {
        cover: coverLevel,
        ...values,
      };
      payload[item.name] = !payload[item.name];
      const newQuote = await patchQuoteApi.request(payload);
      if (!newQuote.ok) return setError(newQuote.data.message);
      setQuote(newQuote.data);
      setFieldValue(item.name, !values[item.name]);
    }
  };

  const fun = async () => {
    const authToken = await authStorage.getToken();
    console.log(authToken);
    return authToken;
  };

  const genRanHex = (size) =>
    [...Array(size)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");

  return (
    <>
      <Background />
      <ActivityIndicator visible={patchQuoteApi.loading || pdfApi.loading} />
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
          <AppText style={styles.sectionTitle}>Customise Cover</AppText>
          <AppButton
            title="Download Quote"
            backgroundColor={colors.primary}
            border={null}
            onPress={async () => {
              // const uri = Linking.createURL(
              //   `${settings.apiUrl}api/car/warranty/quote/document/${quote.token}`,
              //   {
              //     headers: {
              //       Authorization:
              //         "Bearer " +
              //         "w7Gmp34ljlq1dPOxecbe9RGom7jtZTa1PaeRllL2VSCDVKKQR6tXuUIgvJWZ8nYt",
              //     },
              //   }
              // );
              // await Linking.openURL(uri);
              // const callback = (downloadProgress) => {
              //   const progress =
              //     downloadProgress.totalBytesWritten /
              //     downloadProgress.totalBytesExpectedToWrite;
              //   setProgress(progress);
              // };
              // const downloadResumable = FileSystem.createDownloadResumable(
              //   `${settings.apiUrl}api/car/warranty/quote/document/${quote.token}`,
              //   FileSystem.documentDirectory + genRanHex(12) + ".pdf",
              //   {
              //     headers: {
              //       Authorization:
              //         "Bearer " +
              //         "w7Gmp34ljlq1dPOxecbe9RGom7jtZTa1PaeRllL2VSCDVKKQR6tXuUIgvJWZ8nYt",
              //     },
              //   },
              //   callback
              // );
              // try {
              //   const { uri } = await downloadResumable.downloadAsync();
              //   // const contentUri = await FileSystem.getContentUriAsync(uri);
              //   // MediaLibrary.saveToLibraryAsync(contentUri);
              //   // console.log("contentUri: " + contentUri);
              //   console.log("Finished downloading to ", uri);
              //   // const result = await WebBrowser.openBrowserAsync(uri);
              //   // console.log(result);
              // } catch (e) {
              //   console.error(e);
              // }
              // try {
              //   await downloadResumable.pauseAsync();
              //   console.log(
              //     "Paused download operation, saving for future retrieval"
              //   );
              //   AsyncStorage.setItem(
              //     "pausedDownload",
              //     JSON.stringify(downloadResumable.savable())
              //   );
              // } catch (e) {
              //   console.error(e);
              // }
              // try {
              //   const { uri } = await downloadResumable.resumeAsync();
              //   console.log("Finished downloading to ", uri);
              // } catch (e) {
              //   console.error(e);
              // }
              //To resume a download across app restarts, assuming the the DownloadResumable.savable() object was stored:
              // const downloadSnapshotJson = await AsyncStorage.getItem(
              //   "pausedDownload"
              // );
              // const downloadSnapshot = JSON.parse(downloadSnapshotJson);
              // const downloadResumable = new FileSystem.DownloadResumable(
              //   downloadSnapshot.url,
              //   downloadSnapshot.fileUri,
              //   downloadSnapshot.options,
              //   callback,
              //   downloadSnapshot.resumeData
              // );
              // try {
              //   const { uri } = await downloadResumable.resumeAsync();
              //   console.log("Finished downloading to ", uri);
              // } catch (e) {
              //   console.error(e);
              // }
              // console.log(genRanHex(24));
            }}
          />
        </View>
        <ScrollView>
          <Screen style={styles.screen}>
            <View style={[styles.card, { marginBottom: tabBarHeight }]}>
              {/* <View
                style={{ flex: 1, height: 300, backgroundColor: "#ecf0f1" }}
              >
                <WebView
                  javaScriptEnabled={true}
                  style={{ flex: 1 }}
                  source={{
                    uri: `${settings.apiUrl}api/car/warranty/quote/document/${quote.token}`,
                    headers: {
                      Authorization:
                        "Bearer " +
                        "w7Gmp34ljlq1dPOxecbe9RGom7jtZTa1PaeRllL2VSCDVKKQR6tXuUIgvJWZ8nYt",
                    },
                  }}
                />
              </View> */}
              <Formik
                initialValues={{
                  claims: quote.quote.claims,
                  labour: quote.quote.labour,
                  airbags: quote.quote.airbags,
                  aircon: quote.quote.aircon,
                  assist: quote.quote.assist,
                  emissions: quote.quote.emissions,
                  ev: quote.quote.ev,
                  mot: quote.quote.mot,
                  multimedia: quote.quote.multimedia,
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {({ values, setFieldValue }) => (
                  <>
                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>
                        Single Repair Limit incl. VAT
                      </AppText>
                      <AppFormPicker
                        icon="currency-gbp"
                        name="claims"
                        items={repairLimit}
                        onSelectItem={(selectedClaim) => {
                          onClaimsSelect(selectedClaim, values, setFieldValue);
                        }}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>
                        Labour Rate incl. VAT
                      </AppText>
                      <AppFormPicker
                        icon="currency-gbp"
                        name="labour"
                        items={labourRate}
                        onSelectItem={(selectedLabourRate) => {
                          onLabourRateSelect(
                            selectedLabourRate,
                            values,
                            setFieldValue
                          );
                        }}
                      />
                    </View>

                    <View style={styles.fieldContainer}>
                      <AppText style={styles.fieldTitle}>Additions</AppText>
                      {additions.map((item, index) =>
                        item.name === "ev" && !electricVehicle ? null : (
                          <AdditionsItem
                            image={item.image}
                            text={item.text}
                            selected={values[item.name]}
                            disabled={item.disabled}
                            tooltip={item.tooltip}
                            onPress={() =>
                              onAdditionsItemPress(item, values, setFieldValue)
                            }
                            key={index}
                          />
                        )
                      )}
                    </View>

                    <View style={[styles.fieldContainer, { marginTop: 30 }]}>
                      <View style={styles.planTitleContainer}>
                        <AppText style={styles.fieldTitle}>Plan</AppText>
                        <AppSwitch
                          value={margin}
                          text="Toggle Margin"
                          onValueChange={() => setMargin(!margin)}
                        />
                      </View>
                      {pricesKeys.map((key, index) => (
                        <QuotePrice
                          coverLength={coverLengthOptions[index]}
                          data={
                            margin
                              ? quote.pricing.total[key]
                              : quote.pricing.base[key]
                          }
                          vat={user.account.vat}
                          selected={coverLength === coverLengthOptions[index]}
                          onPress={() =>
                            setCoverLength(coverLengthOptions[index])
                          }
                          key={key}
                        />
                      ))}
                    </View>
                    <AppErrorMessage error={error} visible={error} />
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
  planTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CarWarrantyCustomiseCoverScreen;
