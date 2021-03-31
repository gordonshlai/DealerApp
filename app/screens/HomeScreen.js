import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import AppText from "../components/AppText";
import Background from "../components/Background";
import Screen from "../components/Screen";
import { AppErrorMessage } from "../components/forms";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";

import colors from "../config/colors";
import defaultStyles from "../config/styles";
import useApi from "../hooks/useApi";
import client from "../api/client";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import TradeCarsIcon from "../components/icons/TradeCarsIcon";
import routes from "../navigation/routes";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CarIcon from "../components/icons/CarIcon";
import MessagesIcon from "../components/icons/MessagesIcon";
import Card from "../components/Card";

function HomeScreen({ navigation }) {
  const navigationButtons = [
    {
      title: routes.TRADE,
      icon: <TradeCarsIcon color="white" size={30} />,
      onPress: () => navigation.navigate(routes.TRADE),
    },
    {
      title: routes.INVENTORY,
      icon: <CarIcon color="white" size={30} />,
      onPress: () => navigation.navigate(routes.INVENTORY),
    },
    {
      title: routes.MESSAGES,
      icon: <MessagesIcon color="white" size={30} />,
      onPress: () => navigation.navigate(routes.MESSAGES),
    },
    {
      title: routes.TRADE,
      icon: <TradeCarsIcon color="white" size={30} />,
      onPress: () => navigation.navigate(routes.TRADE),
    },
    {
      title: routes.INVENTORY,
      icon: <CarIcon color="white" size={30} />,
      onPress: () => navigation.navigate(routes.INVENTORY),
    },
    {
      title: routes.MESSAGES,
      icon: <MessagesIcon color="white" size={30} />,
      onPress: () => navigation.navigate(routes.MESSAGES),
    },
  ];

  const tabBarHeight = useBottomTabBarHeight();

  const [error, setError] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const getUserApi = useApi(() => client.get("api/user"));
  const getVehiclesApi = useApi(() =>
    client.get(
      "api/trade/all/inventory?make=all&seller=&env=1&sortBy=listed-desc&perPage=12&page=1"
    )
  );

  const getUser = async () => {
    const result = await getUserApi.request();
    if (!result.ok) return setError(result.data.message);
  };

  const getVehicles = async () => {
    const result = await getVehiclesApi.request();
    if (!result.ok) return setError(result.data.message);
  };

  useEffect(() => {
    getUser();
    getVehicles();
  }, []);

  return (
    <Screen>
      <Background />
      <ActivityIndicator
        visible={getUserApi.loading || getVehiclesApi.loading}
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
        <FlatList
          ListHeaderComponent={
            <View style={styles.listHeaderComponent}>
              {getUserApi.data.user && (
                <AppText
                  style={styles.text1}
                >{`HELLO, ${getUserApi.data.user.name}`}</AppText>
              )}
              <View style={styles.textRow}>
                <AppText style={styles.text2}>{"Welcome to the "}</AppText>
                <AppText style={styles.text3}>WARRANTYWISE APP</AppText>
              </View>
            </View>
          }
          data={navigationButtons}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, defaultStyles.shadow]}
              onPress={item.onPress}
            >
              <LinearGradient
                colors={[colors.mediumGrey, "white"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.linearGradient}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.icon}
              </View>
              <AppText style={styles.cardTitle}>
                {item.title.toUpperCase()}
              </AppText>
            </TouchableOpacity>
          )}
          columnWrapperStyle={{
            marginHorizontal: 20,
            marginVertical: 10,
            justifyContent: "space-between",
          }}
          refreshing={refreshing}
          onRefresh={() => {
            getUser();
            getVehicles();
          }}
          ListFooterComponent={
            <View style={{ marginTop: 30, marginBottom: tabBarHeight }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                }}
              >
                <AppText style={{ fontWeight: "bold" }}>Just Added</AppText>
                <AppText
                  style={{
                    fontWeight: "bold",
                    color: colors.success,
                  }}
                  onPress={() => navigation.navigate(routes.TRADE)}
                >
                  See All
                </AppText>
              </View>
              <FlatList
                horizontal
                data={getVehiclesApi.data.data}
                keyExtractor={(vehicle, index) => index.toString()}
                renderItem={({ item }) => (
                  <View
                    style={{ marginBottom: 10, marginLeft: 20, width: 150 }}
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
          }
        />
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
    fontSize: 18,
  },
  textRow: {
    flexDirection: "row",
  },
  text2: {
    color: colors.primary,
    fontStyle: "italic",
    fontSize: 18,
  },
  text3: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
  card: {
    height: 130,
    width: Dimensions.get("screen").width * 0.27,
    alignItems: "center",
    zIndex: 1,
  },
  linearGradient: {
    height: "100%",
    width: "100%",
    position: "absolute",
    borderRadius: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 10,
    color: colors.primary,
    textAlign: "left",
  },
});

export default HomeScreen;
