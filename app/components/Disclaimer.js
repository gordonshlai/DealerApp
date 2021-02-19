import React from "react";
import { View, StyleSheet, ScrollView, Modal } from "react-native";
import AppText from "./AppText";
import Info from "./Info";

import colors from "../config/colors";
import AppButton from "./AppButton";

function Disclaimer({ visible, setVisible, onAcceptPress, onCancelPress }) {
  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={() => setVisible(false)}
    >
      <View
        style={{
          paddingVertical: 50,
          paddingHorizontal: 20,
          backgroundColor: colors.mediumGrey + "aa",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <ScrollView>
          <View
            style={{
              backgroundColor: colors.lightGrey,
              borderRadius: 10,
              padding: 20,
              marginVertical: 10,
            }}
          >
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
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.lightGrey,
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
