import React from "react";
import { View, StyleSheet, ScrollView, Modal, Platform } from "react-native";
import AppText from "./AppText";
import Info from "./Info";

import colors from "../config/colors";
import defaultStyles from "../config/styles";
import AppButton from "./AppButton";
import Screen from "./Screen";

function TermsAndConditions({
  visible,
  setVisible,
  onAcceptPress,
  onCancelPress,
  ...otherprops
}) {
  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={() => setVisible(false)}
      {...otherprops}
    >
      <View style={styles.background}>
        <Screen style={styles.container}>
          <ScrollView>
            <AppText style={styles.title}>Terms and Conditions</AppText>
            <AppText style={styles.text}>
              The Warrantywise dealer warranty platform and Wise Dealer App has
              an optional function for those that wish to engage in ‘dealer to
              dealer’ trade sales. The platform can introduce dealers to each
              other who wish to transact their own separate trade sales. Any
              such sales are a direct transaction between the dealers involved.
              It is the responsibility of each dealer to undertake all relevant
              due diligence and checks in respect of any counter-party, product,
              vehicle, interaction or transaction that it enters into via the
              dealer warranty platform or otherwise. Warrantywise make no
              recommendations including without limitation in respect of any
              dealer, product or vehicle and accept no liability or
              responsibility for the dealers, product, vehicle, transfer of
              ownership, price, payment, transactions, or completion of a sale
              in any way. Nothing in this disclaimer will operate to exclude or
              restrict the liability of Warrantywise in respect of death or
              personal injury resulting from its negligence or anything for
              which it is unlawful to exclude liability.
            </AppText>
            <View style={styles.buttonsContainer}>
              <AppButton
                title="Cancel"
                backgroundColor={null}
                color={colors.success}
                onPress={onCancelPress}
                style={{ width: "35%" }}
              />
              <AppButton
                title="Accept and Continue"
                onPress={onAcceptPress}
                style={{ width: "55%" }}
              />
            </View>
          </ScrollView>
        </Screen>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.white + "aa",
    justifyContent: "center",
    flex: 1,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    margin: 10,
    flex: 1,
    ...defaultStyles.shadow,
  },
  title: {
    fontWeight: "bold",
    fontSize: Platform.isPad ? 50 : 28,
    color: colors.secondary,
  },
  text: {
    marginVertical: 30,
    marginHorizontal: 10,
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: Platform.isPad ? 22 : 14,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default TermsAndConditions;
