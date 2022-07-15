import React, { memo, useContext, useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Platform } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import Loading from "../../components/Loading";
import AppText from "../../components/AppText";
import Card from "../../components/Card";
import Screen from "../../components/Screen";
import NewCarButton from "../../navigation/NewCarButton";
import ButtonGroup from "../../components/ButtonGroup";
import ErrorScreen from "./components/ErrorScreen";
import OptionBar from "./components/OptionBar";

import useApi from "../../hooks/useApi";
import colors from "../../config/colors";
import routes from "../../navigation/routes";
import AuthContext from "../../auth/context";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import inventoryApi from "../../api/inventory";

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

  const getVehiclesApi = useApi(() =>
    inventoryApi.getInventory(make, status, pageCurrent, search)
  );

  useEffect(() => {
    getData();
    getMakes();
  }, [reload]);

  useDidMountEffect(() => {
    handleRefresh();
  }, [loadInventoryFlag]);

  const getData = async () => {
    const result = await getVehiclesApi.request();
    if (!result.ok) return setError(result.data.message);
    const newVehicles = result.data.data;
    const newVehiclesArray = parseObjectToArray(newVehicles);
    setVehicles([...vehicles, ...newVehiclesArray]);
  };

  const getMakes = async () => {
    const result = await inventoryApi.getMakes();
    if (!result.ok) return setError(result.data.message);
    const makes = result.data;
    const makesArray = parseObjectToArray(makes);
    setMakesArray(["all", ...makesArray]);
  };

  const parseObjectToArray = (obj) => {
    let arr = [];
    for (let x in obj) {
      arr.push(obj[x]);
    }
    return arr;
  };

  const handleRefresh = () => {
    setVehicles([]);
    setPageCurrent(1);
    setReload(!reload);
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
        <ErrorScreen
          loading={getVehiclesApi.loading}
          handleRefresh={handleRefresh}
          error={error}
        />
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
            <NewCarButton
              onPress={() => navigation.navigate(routes.NEW_CAR_ROOT)}
            />

            <OptionBar
              make={make}
              setMake={setMake}
              makesArray={makesArray}
              search={search}
              setSearch={setSearch}
              handleRefresh={handleRefresh}
            />

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
              ListEmptyComponent={
                <AppText style={styles.noMatchingVehicles}>
                  No matching vehicles
                </AppText>
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
