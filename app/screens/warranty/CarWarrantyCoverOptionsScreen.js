import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Background from "../../components/Background";
import CoverOption from "./components/CoverOption";
import { AppErrorMessage } from "../../components/forms";
import ProgressBar from "./components/ProgressBar";
import Screen from "../../components/Screen";

import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import useApi from "../../hooks/useApi";
import client from "../../api/client";
import ActivityIndicator from "../../components/ActivityIndicator";
import routes from "../../navigation/routes";
import AppSwitch from "../../components/AppSwitch";
import WarrantyContext from "../../warranty/context";
import dayjs from "dayjs";

function CarWarrantyCoverOptionsScreen({ navigation, route }) {
  const { vehicle, user, comparison, setQuote } = useContext(WarrantyContext);
  const tabBarHeight = useBottomTabBarHeight();
  const coverLevels = Object.keys(comparison);

  const [error, setError] = useState();
  const [margin, setMargin] = useState(true);
  const [cover, setCover] = useState();

  const quoteApi = useApi((payload) =>
    client.post("api/car/warranty/quote", payload)
  );

  const handleSubmit = async () => {
    const payload = {
      cover: cover.toUpperCase(),
      dealer_id: user.dealer_id,
      ...vehicle,
    };
    const quote = await quoteApi.request(payload);
    if (!quote.ok) return setError(quote.data.message);
    setQuote(quote.data);

    navigation.navigate(routes.CAR_WARRANTY_CUSTOMISE_COVER);
  };

  useEffect(() => {
    for (const [key, value] of Object.entries(comparison)) {
      if (value.available) {
        return setCover(key);
      }
    }
  }, []);

  const VehiclesAge = () => {
    const manufactureDate = dayjs(vehicle.manufacture_date);
    const now = dayjs();
    return now.diff(manufactureDate, "year", true);
  };

  return (
    <>
      <Background />
      <ActivityIndicator visible={quoteApi.loading} />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        keyboardVerticalOffset={Platform.OS == "ios" ? 50 : 0}
        style={styles.keyboardAvoidingView}
      >
        <ProgressBar route={route} />
        <AppText style={styles.sectionTitle}>Cover Options</AppText>
        <ScrollView>
          <Screen style={styles.screen}>
            <View style={[styles.card, { marginBottom: tabBarHeight }]}>
              {vehicle.mileage > 200000 || VehiclesAge() > 18 ? (
                <AppText style={styles.notQualify}>
                  The age or mileage of the vehicle you've selected does not
                  qualify for our standard levels of cover as it needs to be
                  under 200,000 miles or 18 years old. If you would like a quote
                  on our Classics Car Warranty (for vehicles over 20 years of
                  age) or believe this is an error, please contact your account
                  manager or call 01254 355104.
                </AppText>
              ) : (
                <>
                  <AppSwitch
                    value={margin}
                    text="Toggle Margin"
                    onValueChange={() => setMargin(!margin)}
                  />
                  {coverLevels.map((key) => {
                    if (comparison[key].available) {
                      return (
                        <CoverOption
                          data={comparison[key]}
                          title={key}
                          margin={margin}
                          vat={user.account.vat}
                          selected={cover == key}
                          onSelect={(item) => setCover(item)}
                          key={key}
                        />
                      );
                    }
                  })}
                  <AppErrorMessage error={error} visible={error} />
                  <AppButton title="Next" onPress={handleSubmit} />
                  <AppButton
                    backgroundColor={null}
                    color={colors.success}
                    title="Back"
                    onPress={() => navigation.goBack()}
                  />
                </>
              )}
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
  notQualify: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CarWarrantyCoverOptionsScreen;
