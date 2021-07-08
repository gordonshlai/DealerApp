import React, { useEffect, useState } from "react";
import { StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Slider } from "react-native-elements";

import ActivityIndicator from "../../components/ActivityIndicator";
import AppText from "../../components/AppText";
import AppButton from "../../components/AppButton";
import { AppErrorMessage } from "../../components/forms";
import Message from "./components/Message";

import useApi from "../../hooks/useApi";
import userApi from "../../api/users";
import colors from "../../config/colors";
import Screen from "../../components/Screen";
import settingsApi from "../../api/settings";

function MarginScreen({ navigation }) {
  const [margin, setMargin] = useState();
  const [error, setError] = useState();
  const [message, setMessage] = useState(null);

  const tabBarHeight = useBottomTabBarHeight();

  const getMarginApi = useApi(settingsApi.getMargin);
  const patchMarginApi = useApi((userId) =>
    settingsApi.patchMargin(userId, { margin })
  );
  const getUserApi = useApi(userApi.getUser);

  useEffect(() => {
    requestMargin();
  }, []);

  /**
   * Send a GET request to the server, getting the current margin.
   */
  const requestMargin = async () => {
    const margin = await getMarginApi.request();
    if (!margin.ok) return setError(margin.data.message);
    setMargin(margin.data.margin);
  };

  /**
   * Calculate the cost for the customer.
   * @returns The cost for the customer in 2 decimal places
   */
  const customerCost = () => (327 * (1 + margin / 100)).toFixed(2);

  /**
   * Calculate the profit made from the margin.
   * @returns The profit made from the margin in 2 decimal places
   */
  const profit = () => ((327 * margin) / 100).toFixed(2);

  /**
   * Handles the update margin event.
   */
  const handleUpdate = async () => {
    const user = await getUserApi.request();
    if (!user.ok) return setError(user.data.message);
    const result = await patchMarginApi.request(user.data.user.id);
    if (!result.ok) return setError(result.data.message);
    setMessage(result.data.message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <>
      <LinearGradient
        colors={["#143C4B", "#0E262F"]}
        style={styles.background}
      />
      <ActivityIndicator
        visible={
          getMarginApi.loading || patchMarginApi.loading || getUserApi.loading
        }
      />
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
            <AppText style={[styles.text, styles.title]}>
              With your margin set to
            </AppText>
            <AppText style={[styles.text, styles.value]}>{margin}%</AppText>
            {margin && (
              <Slider
                animateTransitions
                animationType="timing"
                maximumTrackTintColor={colors.lightGrey + "77"}
                maximumValue={200}
                minimumTrackTintColor={colors.primary + "aa"}
                minimumValue={0}
                onValueChange={(value) => setMargin(value)}
                orientation="horizontal"
                step={1}
                style={styles.slider}
                thumbStyle={styles.sliderThumb}
                trackStyle={styles.sliderTrack}
                value={margin}
              />
            )}

            <AppText style={[styles.text, styles.title]}>
              A warranty with a trade price
            </AppText>
            <AppText style={[styles.text, styles.value]}>£327.00</AppText>

            <AppText style={[styles.text, styles.title]}>
              Would cost your customer
            </AppText>
            <AppText style={[styles.text, styles.value]}>
              £{customerCost()}
            </AppText>

            <AppText style={[styles.text, styles.title]}>
              Your profit would be
            </AppText>
            <AppText style={[styles.text, styles.value]}>£{profit()}</AppText>

            <AppErrorMessage visible={error} error={error} />
            <AppButton title="Update" onPress={handleUpdate} />
            <AppButton
              backgroundColor={null}
              title="Back"
              onPress={() => navigation.goBack()}
              style={{ marginBottom: tabBarHeight }}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </Screen>
      <Message message={message} />
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
    justifyContent: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
  },
  value: {
    fontSize: 28,
  },
  slider: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
  sliderThumb: {
    backgroundColor: colors.primary,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderTrack: {
    height: 10,
    borderRadius: 20,
  },
});

export default MarginScreen;
