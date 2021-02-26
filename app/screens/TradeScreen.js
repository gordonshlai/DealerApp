import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import AppButton from "../components/AppButton";
import Loading from "../components/Loading";

import AppText from "../components/AppText";
import Card from "../components/Card";
import Screen from "../components/Screen";

import client from "../api/client";
import useApi from "../hooks/useApi";

import routes from "../navigation/routes";
import OptionButton from "../components/OptionButton";
import AuthContext from "../auth/context";
import useDidMountEffect from "../hooks/useDidMountEffect";
import { AppErrorMessage } from "../components/forms";
import colors from "../config/colors";

const sortByQueryArray = [
  "listed-desc",
  "price-asc",
  "price-desc",
  "age-asc",
  "age-desc",
  "mileage-asc",
  "mileage-desc",
  "make-asc",
  "make-desc",
  "model-asc",
  "model-desc",
];
const sortByDisplayArray = [
  "Most Recent",
  "Price (Lowest)",
  "Price (Highest)",
  "Age (Newest)",
  "Age (Oldest)",
  "Mileage (Lowest)",
  "Mileage (Highest)",
  "Make (A-Z)",
  "Make (Z-A)",
  "Model (A-Z)",
  "Model (Z-A)",
];

function HomeScreen({ navigation }) {
  const { loadTradeFlag } = useContext(AuthContext);
  const tabBarHeight = useBottomTabBarHeight();

  const [error, setError] = useState();

  const [makesArray, setMakesArray] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [reload, setReload] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  const [pageCurrent, setPageCurrent] = useState(1);
  const [make, setMake] = useState("all");
  const [seller, setSeller] = useState("");
  const [env, setEnv] = useState("1");
  const [sortBy, setSortBy] = useState("listed-desc");

  let endpoint =
    "api/trade/all/inventory?make=" +
    make +
    "&seller=" +
    seller +
    "&env=" +
    env +
    "&sortBy=" +
    sortBy +
    "&perPage=12" +
    "&page=" +
    pageCurrent;

  const getVehiclesApi = useApi(() => client.get(endpoint));

  useEffect(() => {
    getData();
    getMakes();
  }, [reload]);

  useDidMountEffect(() => {
    handleRefresh();
  }, [loadTradeFlag]);

  const getData = async () => {
    const result = await getVehiclesApi.request();
    console.log(endpoint);
    if (!result.ok) return setError(result.data.message);
    const newVehicles = result.data.data;
    const newVehiclesArray = parseObjectToArray(newVehicles);
    setVehicles([...vehicles, ...newVehiclesArray]);
  };

  const getMakes = async () => {
    let makeEndpoint = "api/trade/all/makes?seller=" + seller + "&env=" + env;
    const result = await client.get(makeEndpoint);
    if (!result.ok) return setError(result.data.message);
    const makes = result.data;
    const makesArray = parseObjectToArray(makes);
    setMakesArray(["all", ...makesArray]);
  };

  const handleRefresh = () => {
    setVehicles([]);
    setPageCurrent(1);
    setReload(!reload);
  };

  const parseObjectToArray = (obj) => {
    let arr = [];
    for (let x in obj) {
      arr.push(obj[x]);
    }
    return arr;
  };

  const handleLazyLoading = async () => {
    if (!getVehiclesApi.loading && getVehiclesApi.data.next_page_url) {
      setPageCurrent(pageCurrent + 1);
      setReload(!reload);
    }
  };

  return (
    <Screen>
      {getVehiclesApi.error ? (
        <>
          <AppText style={styles.errorMessage}>
            Couldn't retrieve the vehicles.
          </AppText>
          <AppErrorMessage visible={error} visible={error} />
          <AppButton title="RETRY" onPress={handleRefresh} />
        </>
      ) : (
        <>
          <View style={styles.optionBar}>
            <OptionButton
              title={make.toUpperCase()}
              backgroundColor={null}
              color={colors.primary}
              border={false}
              icon="car"
              size={16}
              initialValue="all"
              value={make}
              queryArray={makesArray}
              displayArray={makesArray}
              setValue={setMake}
              handleRefresh={handleRefresh}
            />
            <OptionButton
              title="Sort"
              backgroundColor={null}
              color={colors.primary}
              border={false}
              icon="sort-variant"
              size={16}
              initialValue="listed-desc"
              value={sortBy}
              queryArray={sortByQueryArray}
              displayArray={sortByDisplayArray}
              setValue={setSortBy}
              handleRefresh={handleRefresh}
            />
          </View>
          {vehicles.length === 0 && !getVehiclesApi.loading && (
            <AppText style={styles.noMatchingVehicles}>
              No matching vehicles
            </AppText>
          )}
          <FlatList
            data={vehicles}
            keyExtractor={(vehicle) => vehicle.id.toString()}
            renderItem={({ item }) => (
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
                onPress={() => navigation.navigate(routes.TRADE_DETAIL, item)}
              />
            )}
            numColumns={2}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReached={handleLazyLoading}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              <View style={{ paddingBottom: tabBarHeight }}>
                <Loading visible={getVehiclesApi.loading} />
              </View>
            }
            columnWrapperStyle={styles.columnWrapper}
          />
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  noMatchingVehicles: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    color: colors.primary,
    paddingTop: 20,
  },
  optionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  modal: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: colors.lightGrey,
    flex: 1,
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  modalTitle: {
    alignSelf: "center",
    color: colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  listItem: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  columnWrapper: {
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
});

export default HomeScreen;
