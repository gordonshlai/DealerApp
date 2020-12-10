import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppText from "./AppText";
import Info from "./Info";

import defaultStyles from "../config/styles";
import Screen from "./Screen";
import AppButton from "./AppButton";

function Disclaimer({ onAcceptPress, onCancelPress }) {
  return (
    // <ScrollView>
    //   <View style={styles.container}>
    <>
      <Info
        name="alert-circle-outline"
        size={50}
        color={defaultStyles.colors.warning}
        text="Disclaimer"
      />
      <View style={styles.textContainer}>
        <AppText style={styles.text}>
          Trade-to-trade sales on the Warrantywise Dealer Portal represent a
          direct transaction between the car dealers (parties) involved.
        </AppText>
        <AppText style={styles.text}>
          Warrantywise make no recommendations and accepts no liability or
          responsibility for the parties, goods, transfer of ownership, price,
          transactions, or completion of sale in any way.
        </AppText>
        <AppText style={styles.text}>
          This platform is free to use and all cars are purchased at your own
          risk.
        </AppText>
      </View>
      <AppButton
        icon="check"
        title="Accept and Continue"
        onPress={onAcceptPress}
      />
      <AppButton
        icon="cancel"
        title="Cancel"
        color={defaultStyles.colors.secondary}
        onPress={onCancelPress}
      />
    </>
    //   </View>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: defaultStyles.colors.lightGrey,
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
