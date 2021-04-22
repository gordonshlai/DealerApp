import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  RefreshControl,
  FlatList,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import AppText from "../components/AppText";
import Background from "../components/Background";
import Screen from "../components/Screen";
import { AppErrorMessage } from "../components/forms";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";
import TradeCarsIcon from "../components/icons/TradeCarsIcon";
import CarIcon from "../components/icons/CarIcon";
import MessagesIcon from "../components/icons/MessagesIcon";
import Card from "../components/Card";
import NavigationButton from "../components/NavigationButton";
import Slider from "../components/Slider";

import colors from "../config/colors";
import useApi from "../hooks/useApi";
import client from "../api/client";
import routes from "../navigation/routes";
import defaultStyles from "../config/styles";

function HomeScreen({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();

  const [error, setError] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const getUserApi = useApi(() => client.get("api/user"));
  const getTradeVehiclesApi = useApi(() =>
    client.get(
      "api/trade/all/inventory?make=all&seller=&env=1&sortBy=listed-desc&perPage=12&page=1"
    )
  );
  const getInventoryVehiclesApi = useApi(() =>
    client.get("api/inventory/vehicles?make=all&page=1")
  );

  const getUser = async () => {
    const result = await getUserApi.request();
    if (!result.ok) return setError(result.data.message);
  };

  const getTradeVehicles = async () => {
    const result = await getTradeVehiclesApi.request();
    if (!result.ok) return setError(result.data.message);
  };

  const getInventoryVehicles = async () => {
    const result = await getInventoryVehiclesApi.request();
    if (!result.ok) return setError(result.data.message);
  };

  useEffect(() => {
    getUser();
    getTradeVehicles();
    getInventoryVehicles();
  }, []);

  return (
    <Screen>
      <Background />
      <ActivityIndicator
        visible={
          getUserApi.loading ||
          getTradeVehiclesApi.loading ||
          getInventoryVehiclesApi.loading
        }
      />
      {getUserApi.error ? (
        <View style={styles.screen}>
          <AppText style={styles.errorMessage}>
            Couldn't retrieve user detail.
          </AppText>
          <AppErrorMessage visible={error} visible={error} />
          <AppButton title="RETRY" onPress={getUser} />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                getUser();
                getTradeVehicles();
                getInventoryVehicles();
              }}
            />
          }
        >
          <View style={styles.listHeaderComponent}>
            {getUserApi.data.user && (
              <AppText
                style={styles.text1}
              >{`HELLO, ${getUserApi.data.user.name.toUpperCase()}`}</AppText>
            )}
            <View style={styles.textRow}>
              <AppText style={styles.text2}>{"Welcome to the "}</AppText>
              <AppText style={styles.text3}>WiseDealer App</AppText>
            </View>
          </View>
          <View style={styles.bannerContainer}>
            <View style={styles.bannerInnerContainer}>
              <Slider
                images={[
                  require("../assets/banner.jpg"),
                  require("../assets/banner.jpg"),
                  require("../assets/banner.jpg"),
                ]}
                height={
                  Dimensions.get("window").height * (Platform.isPad ? 0.4 : 0.3)
                }
                width={Dimensions.get("window").width - 40}
                hasThumbnail={false}
              />
              {/* <Image
              source={require("../assets/banner.jpg")}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            <AppText style={styles.bannerText}>DEALERS OFFER!</AppText> */}
            </View>
          </View>
          <View style={styles.navigationContainer}>
            <NavigationButton
              onPress={() => navigation.navigate(routes.TRADE)}
              icon={
                <TradeCarsIcon color="white" size={Platform.isPad ? 40 : 30} />
              }
              title={routes.TRADE.toUpperCase()}
            />
            <NavigationButton
              onPress={() => navigation.navigate(routes.INVENTORY)}
              icon={<CarIcon color="white" size={Platform.isPad ? 40 : 30} />}
              title={routes.INVENTORY.toUpperCase()}
            />
            <NavigationButton
              onPress={() => navigation.navigate(routes.MESSAGES)}
              icon={
                <MessagesIcon color="white" size={Platform.isPad ? 40 : 30} />
              }
              title={routes.MESSAGES.toUpperCase()}
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
              }}
            >
              <AppText style={styles.flatlistTitle}>Just Added</AppText>
              <AppText
                style={styles.seeAll}
                onPress={() => navigation.navigate(routes.TRADE)}
              >
                See All
              </AppText>
            </View>
            <FlatList
              horizontal
              data={getTradeVehiclesApi.data.data}
              keyExtractor={(vehicle, index) => index.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginBottom: 10,
                    marginLeft: 20,
                    width: Platform.isPad
                      ? Dimensions.get("window").width * 0.22
                      : Dimensions.get("window").width * 0.4,
                  }}
                >
                  <Card
                    title={item.title}
                    make={item.make}
                    model={item.model}
                    year={item.year}
                    mileage={item.mileage}
                    engineCapacity={item.engine_capacity}
                    priceAsking={item.price_asking}
                    registration={item.registration}
                    imageUrl={item.thumb ? item.thumb.url : ""}
                    onPress={() =>
                      navigation.navigate(routes.TRADE, {
                        screen: routes.TRADE_DETAIL,
                        initial: false,
                        params: item,
                      })
                    }
                  />
                </View>
              )}
              ListEmptyComponent={
                <AppText style={[styles.text3, { margin: 30 }]}>
                  No Vehicles
                </AppText>
              }
            />
          </View>
          <View style={{ marginTop: 30, marginBottom: tabBarHeight }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
              }}
            >
              <AppText style={styles.flatlistTitle}>My Inventory</AppText>
              <AppText
                style={styles.seeAll}
                onPress={() => navigation.navigate(routes.INVENTORY)}
              >
                See All
              </AppText>
            </View>
            <FlatList
              horizontal
              data={getInventoryVehiclesApi.data.data}
              keyExtractor={(vehicle, index) => index.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginBottom: 10,
                    marginLeft: 20,
                    width: Platform.isPad
                      ? Dimensions.get("window").width * 0.22
                      : Dimensions.get("window").width * 0.4,
                  }}
                >
                  <Card
                    title={item.title}
                    make={item.make}
                    model={item.model}
                    year={item.year}
                    mileage={item.mileage}
                    engineCapacity={item.engine_capacity}
                    priceAsking={item.price_asking}
                    registration={item.registration}
                    imageUrl={item.thumb ? item.thumb.url : ""}
                    onPress={() =>
                      navigation.navigate(routes.INVENTORY, {
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
                  <AppText style={[styles.text3, { margin: 30 }]}>
                    No Vehicles
                  </AppText>
                  <AppButton
                    title="Add a New Car?"
                    onPress={() =>
                      navigation.navigate(routes.INVENTORY, {
                        screen: routes.NEW_CAR,
                        initial: false,
                      })
                    }
                    style={{
                      marginVertical: 20,
                      ...defaultStyles.shadow,
                    }}
                  />
                </>
              }
            />
          </View>
        </ScrollView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
  errorMessage: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  listHeaderComponent: {
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 30,
  },
  text1: {
    color: "white",
    fontWeight: "bold",
    fontSize: Platform.isPad ? 30 : 18,
  },
  textRow: {
    flexDirection: "row",
  },
  text2: {
    color: colors.primary,
    fontStyle: "italic",
    fontSize: Platform.isPad ? 30 : 18,
  },
  text3: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: Platform.isPad ? 30 : 18,
  },
  bannerContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    ...defaultStyles.shadow,
  },
  bannerInnerContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  // bannerImage: {
  //   width: "100%",
  //   height: 150,
  //   borderRadius: 10,
  // },
  // bannerText: {
  //   position: "absolute",
  //   color: colors.primary,
  //   fontWeight: "bold",
  //   fontSize: 20,
  //   paddingHorizontal: 20,
  //   ...defaultStyles.shadow,
  // },
  navigationContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  flatlistTitle: {
    fontWeight: "bold",
    fontSize: Platform.isPad ? 24 : 16,
  },
  seeAll: {
    fontWeight: "bold",
    color: colors.success,
    fontSize: Platform.isPad ? 20 : 14,
  },
});

export default HomeScreen;
