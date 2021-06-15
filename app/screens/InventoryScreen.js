import React, { memo, useContext, useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Platform } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import AppButton from "../components/AppButton";
import Loading from "../components/Loading";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Card from "../components/Card";
import Screen from "../components/Screen";
import NewCarButton from "../navigation/NewCarButton";
import OptionButton from "../components/OptionButton";
import ButtonGroup from "../components/ButtonGroup";
import ActivityIndicator from "../components/ActivityIndicator";
import { AppErrorMessage } from "../components/forms";

import client from "../api/client";
import useApi from "../hooks/useApi";
import colors from "../config/colors";
import defaultStyles from "../config/styles";
import routes from "../navigation/routes";
import AuthContext from "../auth/context";
import useDidMountEffect from "../hooks/useDidMountEffect";

const statusArray = ["", "stock", "listed", "sold"];
const statusDisplayArray = ["All", "In Stock", "Trade Listed", "Sold"];

function InventoryScreen({ navigation }) {
  const { loadInventoryFlag } = useContext(AuthContext);
  const tabBarHeight = useBottomTabBarHeight();

  const [error, setError] = useState();

  const [makesArray, setMakesArray] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [reload, setReload] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  const [make, setMake] = useState("all");
  const [status, setStatus] = useState(statusArray[0]);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [search, setSearch] = useState("");

  const [serachBarVisible, setSearchBarVisible] = useState(false);

  let endpoint =
    "api/inventory/vehicles?make=" +
    make +
    "&status=" +
    status +
    "&page=" +
    pageCurrent +
    "&search=" +
    search;
  const getVehiclesApi = useApi(() => client.get(endpoint));

  useEffect(() => {
    getData();
    getMakes();
  }, [reload]);

  useDidMountEffect(() => {
    handleRefresh();
  }, [loadInventoryFlag]);

  const getData = async () => {
    const result = await getVehiclesApi.request();
    console.log(endpoint);
    if (!result.ok) return setError(result.data.message);
    const newVehicles = result.data.data;
    const newVehiclesArray = parseObjectToArray(newVehicles);
    setVehicles([...vehicles, ...newVehiclesArray]);
  };

  const getMakes = async () => {
    const result = await client.get("api/inventory/makes");
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

  let searchCheck;
  const handleSearch = (text) => {
    searchCheck = text;
    setTimeout(() => {
      if (searchCheck == text) {
        setSearch(text);
        handleRefresh();
      }
    }, 500);
  };

  const handleLazyLoading = () => {
    if (!getVehiclesApi.loading && getVehiclesApi.data.next_page_url) {
      setPageCurrent(pageCurrent + 1);
      setReload(!reload);
    }
  };

  return (
    <Screen>
      {getVehiclesApi.error ? (
        <>
          <ActivityIndicator visible={getVehiclesApi.loading} />
          <View style={styles.errorContainer}>
            <AppText style={styles.errorMessage}>
              Couldn't retrieve the vehicles.
            </AppText>
            <AppErrorMessage visible={error} error={error} />
            <AppButton title="RETRY" onPress={handleRefresh} />
          </View>
        </>
      ) : (
        <>
          <ButtonGroup
            buttons={statusDisplayArray}
            selectedIndex={statusArray.indexOf(status)}
            onPress={(index) => {
              setStatus(statusArray[index]);
              handleRefresh();
            }}
          />
          <Screen>
            <NewCarButton onPress={() => navigation.navigate(routes.NEW_CAR)} />

            <View style={styles.optionBar}>
              <OptionButton
                title={make.toUpperCase()}
                backgroundColor={null}
                color={colors.primary}
                border={false}
                icon="car"
                size={16}
                modalTitle="Filter"
                initialValue="all"
                value={make}
                queryArray={makesArray}
                displayArray={makesArray}
                onSelect={(query) => {
                  setMake(query);
                  handleRefresh();
                }}
              />
              <AppButton
                icon={serachBarVisible ? "magnify-close" : "magnify"}
                backgroundColor={null}
                color={colors.primary}
                border={false}
                size={20}
                badge={search !== ""}
                onPress={() => setSearchBarVisible(!serachBarVisible)}
              />
            </View>
            <View
              style={
                serachBarVisible
                  ? styles.searchBarVisible
                  : styles.searchBarInvisible
              }
            >
              <AppTextInput
                icon="magnify"
                placeholder="Enter Your Registration"
                style={styles.searchBar}
                onChangeText={handleSearch}
              />
            </View>
            {vehicles.length === 0 && !getVehiclesApi.loading && (
              <AppText style={styles.noMatchingVehicles}>
                No matching vehicles
              </AppText>
            )}
            <FlatList
              data={vehicles}
              keyExtractor={(vehicle, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={{ width: Platform.isPad ? "23%" : "48%" }}>
                  <Card
                    title={item.title}
                    make={item.make}
                    model={item.model}
                    year={item.year}
                    mileage={item.mileage}
                    engineCapacity={item.engine_capacity}
                    priceAsking={item.price_asking}
                    registration={item.registration}
                    sales_status={item.sales_status}
                    imageUrl={item.thumb ? item.thumb.url : ""}
                    onPress={() =>
                      navigation.navigate(routes.INVENTORY_DETAIL, item)
                    }
                  />
                </View>
              )}
              numColumns={Platform.isPad ? 4 : 2}
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
          </Screen>
        </>
      )}
    </Screen>
  );
}

const arePropsEqual = (prevProps, nextProps) => {
  return prevProps.label === nextProps.label;
};

const styles = StyleSheet.create({
  errorContainer: {
    padding: 20,
  },
  errorMessage: {
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  optionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  searchBar: {
    backgroundColor: "white",
    borderRadius: 10,
    ...defaultStyles.shadow,
  },
  searchBarVisible: {
    opacity: 1,
    marginHorizontal: 20,
  },
  searchBarInvisible: {
    height: 0,
    opacity: 0,
  },
  noMatchingVehicles: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    color: colors.primary,
    paddingTop: 20,
  },
  columnWrapper: {
    paddingHorizontal: 20,
    justifyContent: Platform.isPad ? "space-around" : "space-between",
  },
});

export default memo(InventoryScreen, arePropsEqual);
