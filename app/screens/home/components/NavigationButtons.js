import { Platform, StyleSheet, View } from "react-native";
import React from "react";
import NavigationButton from "./NavigationButton";
import routes from "../../../navigation/routes";
import TradeCarsIcon from "../../../components/icons/TradeCarsIcon";
import CarIcon from "../../../components/icons/CarIcon";
import MessagesIcon from "../../../components/icons/MessagesIcon";

/**
 * The navigation buttons group in the HomeScreen
 */
const NavigationButtons = () => {
  return (
    <View style={styles.container}>
      <NavigationButton
        onPress={() => navigation.navigate(routes.TRADE_ROOT)}
        icon={<TradeCarsIcon color="white" size={Platform.isPad ? 40 : 30} />}
        title={routes.TRADE.toUpperCase()}
      />
      <NavigationButton
        onPress={() => navigation.navigate(routes.INVENTORY_ROOT)}
        icon={<CarIcon color="white" size={Platform.isPad ? 40 : 30} />}
        title={routes.INVENTORY.toUpperCase()}
      />
      <NavigationButton
        onPress={() => navigation.navigate(routes.MESSAGES_ROOT)}
        icon={<MessagesIcon color="white" size={Platform.isPad ? 40 : 30} />}
        title={routes.MESSAGES.toUpperCase()}
      />
    </View>
  );
};

export default NavigationButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
});
