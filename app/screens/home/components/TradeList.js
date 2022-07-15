import { Dimensions, FlatList, Platform, StyleSheet, View } from "react-native";
import React from "react";

import AppText from "../../../components/AppText";
import Card from "../../../components/Card";

import colors from "../../../config/colors";
import routes from "../../../navigation/routes";

/**
 * The horizontal trade list on the HomeScreen
 *
 * @param {object} navigation The navigation object provided by react-navigation
 * @param {object} data The vehicles data returned from the api
 */
const TradeList = ({ navigation, data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <AppText style={styles.flatListTitle}>Just Added</AppText>
        <AppText
          style={styles.seeAll}
          onPress={() => navigation.navigate(routes.TRADE_ROOT)}
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
              imageUrl={item?.thumb?.url || ""}
              onPress={() =>
                navigation.navigate(routes.TRADE_ROOT, {
                  screen: routes.TRADE_DETAIL,
                  initial: false,
                  params: item,
                })
              }
            />
          </View>
        )}
        ListEmptyComponent={
          <AppText style={styles.noVehicles}>No Vehicles</AppText>
        }
      />
    </View>
  );
};

export default TradeList;

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
});
