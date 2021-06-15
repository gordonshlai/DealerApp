import React from "react";
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
import Screen from "../../components/Screen";

import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";

function CarWarrantyScreen({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <>
      <Background />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        keyboardVerticalOffset={Platform.OS == "ios" ? 50 : 0}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView>
          <Screen style={styles.screen}>
            <View style={styles.card}>
              <AppText style={styles.sectionTitle}>Get A New Quote</AppText>
              <AppButton
                title="Start"
                onPress={() =>
                  navigation.navigate(routes.CAR_WARRANTY_VEHICLE_DETAIL_1)
                }
              />
            </View>
            <View style={styles.card}>
              <AppText style={styles.sectionTitle}>Exsisting Quotes</AppText>
              <AppButton
                title="Saved Quotes"
                onPress={() => navigation.navigate(routes.SAVED_QUOTES)}
              />
              <AppButton
                title="My Sales"
                backgroundColor={null}
                color={colors.success}
              />
            </View>
            <View style={[styles.card, { marginBottom: tabBarHeight }]}>
              <AppButton
                title="Back"
                backgroundColor={null}
                color={colors.success}
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
    color: colors.secondary,
    marginBottom: 10,
  },
});

export default CarWarrantyScreen;
