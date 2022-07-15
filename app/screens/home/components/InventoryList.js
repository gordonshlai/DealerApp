import { Dimensions, FlatList, Platform, StyleSheet, View } from "react-native";
import React from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import AppText from "../../../components/AppText";
import Card from "../../../components/Card";
import AppButton from "../../../components/AppButton";

import defaultStyles from "../../../config/styles";
import colors from "../../../config/colors";
import routes from "../../../navigation/routes";

/**
 * The horizontal inventory list on the HomeScreen
 *
 * @param {object} navigation The navigation object provided by react-navigation
 * @param {object} data The vehicles data returned from the api
 */
const InventoryList = ({ navigation, data }) => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={[styles.container, { marginBottom: tabBarHeight }]}>
      <View style={styles.flatListContainer}>
        <AppText style={styles.flatListTitle}>My Inventory</AppText>
        <AppText
          style={styles.seeAll}
          onPress={() => navigation.navigate(routes.INVENTORY)}
        >
          See All
        </AppText>
      </View>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(vehicle, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Card
              title={item?.title}
              make={item?.make}
              model={item?.model}
              year={item?.year}
              mileage={item?.mileage}
              engineCapacity={item?.engine_capacity}
              priceAsking={item?.price_asking}
              registration={item?.registration}
              sales_status={item?.sales_status}
              imageUrl={item?.thumb?.url || ""}
              onPress={() =>
                navigation.navigate(routes.INVENTORY_ROOT, {
                  screen: routes.INVENTORY_DETAIL,
                  initial: false,
                  params: item,
                })
              }
            />
          </View>
        )}
        ListEmptyComponent={
          <>
            <AppText style={styles.noVehicles}>No Vehicles</AppText>
            <AppButton
              title="Add a New Car?"
              onPress={() =>
                navigation.navigate(routes.INVENTORY_ROOT, {
                  screen: routes.NEW_CAR,
                  initial: false,
                })
              }
              style={styles.newCarButton}
            />
          </>
        }
      />
    </View>
  );
};

export default InventoryList;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  flatListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  flatListTitle: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: Platform.isPad ? 24 : 16,
  },
  seeAll: {
    fontWeight: "bold",
    color: colors.success,
    fontSize: Platform.isPad ? 20 : 14,
  },
  cardContainer: {
    marginBottom: 10,
    marginLeft: 20,
    width: Platform.isPad
      ? Dimensions.get("window").width * 0.22
      : Dimensions.get("window").width * 0.4,
  },
  noVehicles: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: Platform.isPad ? 30 : 18,
    margin: 30,
  },
  newCarButton: {
    marginVertical: 20,
    ...defaultStyles.shadow,
  },
});
