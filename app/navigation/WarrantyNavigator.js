import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Menu from "../components/Menu";
import CarWarrantyScreen from "../screens/warranty/CarWarrantyScreen";
import CarWarrantyVehicleDetailScreen1 from "../screens/warranty/CarWarrantyVehicleDetailScreen1";
import CarWarrantyVehicleDetailScreen2 from "../screens/warranty/CarWarrantyVehicleDetailScreen2";
import CarWarrantyCoverOptionsScreen from "../screens/warranty/CarWarrantyCoverOptionsScreen";
import CarWarrantyCustomiseCoverScreen from "../screens/warranty/CarWarrantyCustomiseCoverScreen";
import CarWarrantyDetailScreen from "../screens/warranty/CarWarrantyDetailScreen";
import CarWarrantyCustomerDetailScreen from "../screens/warranty/CarWarrantyCustomerDetailScreen";
import CarWarrantyPaymentDetailScreen from "../screens/warranty/CarWarrantyPaymentDetailScreen";

import routes from "./routes";
import colors from "../config/colors";

const Stack = createStackNavigator();

const WarrantyNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackTitle: "",
        headerTitle: "Car Warranty",
        headerTitleStyle: styles.headerTitleStyle,
        headerStyle: styles.headerStyle,
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerBackImage: () => (
          <MaterialCommunityIcons
            name="chevron-left"
            size={32}
            color={colors.primary}
            style={{ paddingHorizontal: 10 }}
          />
        ),
        headerRight: () => <Menu />,
      }}
    >
      <Stack.Screen name={routes.WARRANTY} component={CarWarrantyScreen} />
      <Stack.Screen
        name={routes.CAR_WARRANTY_VEHICLE_DETAIL_1}
        component={CarWarrantyVehicleDetailScreen1}
      />
      <Stack.Screen
        name={routes.CAR_WARRANTY_VEHICLE_DETAIL_2}
        component={CarWarrantyVehicleDetailScreen2}
      />
      <Stack.Screen
        name={routes.CAR_WARRANTY_COVER_OPTIONS}
        component={CarWarrantyCoverOptionsScreen}
      />
      <Stack.Screen
        name={routes.CAR_WARRANTY_CUSTOMISE_COVER}
        component={CarWarrantyCustomiseCoverScreen}
      />
      <Stack.Screen
        name={routes.CAR_WARRANTY_DETAIL}
        component={CarWarrantyDetailScreen}
      />
      <Stack.Screen
        name={routes.CAR_WARRANTY_CUSTOMER_DETAIL}
        component={CarWarrantyCustomerDetailScreen}
      />
      <Stack.Screen
        name={routes.CAR_WARRANTY_PAYMENT_DETAIL}
        component={CarWarrantyPaymentDetailScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitleStyle: {
    marginHorizontal: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  headerStyle: {
    backgroundColor: colors.secondary,
    shadowColor: "transparent",
    elevation: 0,
  },
});

export default WarrantyNavigator;
