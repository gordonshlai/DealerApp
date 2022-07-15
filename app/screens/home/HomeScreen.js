import React, { useEffect, useState } from "react";
import { StyleSheet, RefreshControl, ScrollView } from "react-native";

import Background from "../../components/Background";
import Screen from "../../components/Screen";
import ActivityIndicator from "../../components/ActivityIndicator";
import ErrorScreen from "./components/ErrorScreen";
import Heading from "./components/Heading";
import Banner from "./components/Banner";
import NavigationButtons from "./components/NavigationButtons";
import TradeList from "./components/TradeList";
import InventoryList from "./components/InventoryList";

import useApi from "../../hooks/useApi";
import userApi from "../../api/users";
import tradeApi from "../../api/trade";
import inventory from "../../api/inventory";

const make = "all";
const status = "";
const pageCurrent = "1";
const search = "";

function HomeScreen({ navigation }) {
  const [error, setError] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const getUserApi = useApi(userApi.getUser);
  const getTradeVehiclesApi = useApi(tradeApi.getTrade);
  const getInventoryVehiclesApi = useApi(() =>
    inventory.getInventory(make, status, pageCurrent, search)
  );

  const getUser = async () => {
    const result = await getUserApi.request();
    if (!result.ok) return setError(result?.data?.message);
  };

  const getTradeVehicles = async () => {
    const result = await getTradeVehiclesApi.request();
    if (!result.ok) return setError(result?.data?.message);
  };

  const getInventoryVehicles = async () => {
    const result = await getInventoryVehiclesApi.request();
    if (!result.ok) return setError(result?.data?.message);
  };

  const getData = () => {
    getUser();
    getTradeVehicles();
    getInventoryVehicles();
  };

  useEffect(() => {
    getData();
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
        <ErrorScreen error={error} getUser={getUser} />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getData} />
          }
        >
          <Heading user={getUserApi?.data?.user} />
          <Banner />
          <NavigationButtons />
          <TradeList
            navigation={navigation}
            data={getTradeVehiclesApi?.data?.data}
          />
          <InventoryList
            navigation={navigation}
            data={getInventoryVehiclesApi?.data?.data}
          />
        </ScrollView>
      )}
    </Screen>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});
