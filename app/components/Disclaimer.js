import React from "react";
import { View, StyleSheet, ScrollView, Modal } from "react-native";
import AppText from "./AppText";
import Info from "./Info";

import colors from "../config/colors";
import defaultStyles from "../config/styles";
import AppButton from "./AppButton";
import Screen from "./Screen";

function Disclaimer({
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
            <Info
              name="alert-circle-outline"
              size={50}
              color={colors.warning}
              text="Disclaimer"
            />
            <View style={styles.textContainer}>
              <AppText style={styles.text}>
                Trade-to-trade sales on the Warrantywise Dealer Portal represent
                a direct transaction between the car dealers (parties) involved.
              </AppText>
              <AppText style={styles.text}>
                Warrantywise make no recommendations and accepts no liability or
                responsibility for the parties, goods, transfer of ownership,
                price, transactions, or completion of sale in any way.
              </AppText>
              <AppText style={styles.text}>
                This platform is free to use and all cars are purchased at your
                own risk.
              </AppText>
            </View>
            <AppButton
              icon="check"
              title="ACCEPT AND CONTINUE"
              onPress={onAcceptPress}
            />
            <AppButton
              icon="cancel"
              title="CANCEL"
              backgroundColor={null}
              color={colors.success}
              onPress={onCancelPress}
            />
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
  textContainer: {
    marginVertical: 30,
  },
  text: {
    marginBottom: 15,
    fontWeight: "bold",
  },
});

export default Disclaimer;
