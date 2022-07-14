import React, { memo, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Modal,
  Platform,
  ScrollView,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Constants from "expo-constants";

import AppButton from "../../components/AppButton";
import Loading from "../../components/Loading";
import AppText from "../../components/AppText";
import Card from "../../components/Card";
import Screen from "../../components/Screen";
import NewCarButton from "../../navigation/NewCarButton";
import ButtonGroup from "../../components/ButtonGroup";
import ActivityIndicator from "../../components/ActivityIndicator";
import OptionButton from "../../components/OptionButton";
import AuthContext from "../../auth/context";
import { AppErrorMessage } from "../../components/forms";
import MultiplePicker from "../../components/MultiplePicker";

import colors from "../../config/colors";
import client from "../../api/client";
import useApi from "../../hooks/useApi";
import defaultStyle from "../../config/styles";
import routes from "../../navigation/routes";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import settings from "../../config/settings";

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

const body_styleArray = [
  "All",
  "Hatchback",
  "Coupe",
  "Sedan",
  "Convertible",
  "Estate",
  "SUV",
  "Crossover",
  "Minivan/Van",
  "Pickup",
];

const fuelArray = ["Diesel", "Electric", "Hybrid", "Petrol"];
const doorsArray = ["1", "2", "3", "4", "5", "6", "7"];
const seatsArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

function TradeScreen({ navigation }) {
  const { loadTradeFlag } = useContext(AuthContext);
  const tabBarHeight = useBottomTabBarHeight();

  const [error, setError] = useState();

  const [makesArray, setMakesArray] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [reload, setReload] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  const [pageCurrent, setPageCurrent] = useState(1);
  const [seller, setSeller] = useState("");
  const [sortBy, setSortBy] = useState("listed-desc");

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [bodyType, setBodyType] = useState([]);
  const [makes, setMakes] = useState([]);
  const [fuel, setFuel] = useState([]);
  const [doors, setDoors] = useState([]);
  const [seats, setSeats] = useState([]);

  const [tempMakes, setTempMakes] = useState([]);
  const [tempFuel, setTempFuel] = useState([]);
  const [tempDoors, setTempDoors] = useState([]);
  const [tempSeats, setTempSeats] = useState([]);

  let endpoint =
    "api/trade/all/vehicles?seller=" +
    seller +
    "&env=" +
    settings.tradeEnv +
    "&sortBy=" +
    sortBy +
    "&perPage=12" +
    "&page=" +
    pageCurrent;

  const getVehiclesApi = useApi(() =>
    client.get(endpoint, {
      body_types: bodyType,
      makes: makes,
      fuel_types: fuel,
      doors: doors,
      seats: seats,
    })
  );

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
    let makeEndpoint =
      "api/trade/all/makes?seller=" + seller + "&env=" + settings.tradeEnv;
    const result = await client.get(makeEndpoint);
    if (!result.ok) return setError(result.data.message);
    const makes = result.data;
    const makesArray = parseObjectToArray(makes);
    setMakesArray([...makesArray]);
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
    <>
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
            <NewCarButton
              onPress={() => navigation.navigate(routes.NEW_CAR_ROOT)}
            />
            <ButtonGroup
              buttons={body_styleArray}
              selectedIndex={
                bodyType.length === 0 ? 0 : body_styleArray.indexOf(...bodyType)
              }
              onPress={(index) => {
                index === 0
                  ? setBodyType([])
                  : setBodyType([body_styleArray[index]]);
                handleRefresh();
              }}
            />
            <View style={styles.optionBar}>
              <AppButton
                icon="filter-variant"
                title="Filters"
                backgroundColor={null}
                color={colors.primary}
                border={null}
                size={16}
                onPress={() => setFilterModalVisible(true)}
              />
              <OptionButton
                title="Sort"
                backgroundColor={null}
                color={colors.primary}
                border={false}
                icon="sort-variant"
                size={16}
                modalTitle="Sort By"
                initialValue="listed-desc"
                value={sortBy}
                queryArray={sortByQueryArray}
                displayArray={sortByDisplayArray}
                onSelect={(query) => {
                  setSortBy(query);
                  handleRefresh();
                }}
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
                    imageUrl={item.thumb ? item.thumb.url : ""}
                    onPress={() =>
                      navigation.navigate(routes.TRADE_DETAIL, item)
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
          </>
        )}
      </Screen>
      <Modal
        visible={filterModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.filterModalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTopBarContainer}>
              <AppText style={styles.modalTitle}>Filters</AppText>
              <AppButton
                backgroundColor={null}
                border={false}
                size={30}
                icon="close"
                onPress={() => {
                  setFilterModalVisible(false);
                  setTempMakes(makes);
                  setTempFuel(fuel);
                  setTempDoors(doors);
                  setTempSeats(seats);
                }}
                style={styles.modalCloseButton}
              />
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <AppText style={styles.modalSubtitle}>Makes</AppText>
              <MultiplePicker
                items={makesArray}
                selectedItems={tempMakes.length > 0 ? tempMakes : []}
                placeholder="Select Makes"
                onConfirm={(items) => {
                  setTempMakes(items);
                }}
              />
              <AppText style={styles.modalSubtitle}>Fuel Type</AppText>
              <MultiplePicker
                items={fuelArray}
                selectedItems={tempFuel.length > 0 ? tempFuel : []}
                placeholder="Select Fuel Type"
                onConfirm={(items) => {
                  setTempFuel(items);
                }}
              />
              <AppText style={styles.modalSubtitle}>Doors</AppText>
              <MultiplePicker
                items={doorsArray}
                selectedItems={tempDoors.length > 0 ? tempDoors : []}
                placeholder="Select Number of Doors"
                onConfirm={(items) => {
                  setTempDoors(items);
                }}
              />
              <AppText style={styles.modalSubtitle}>Seats</AppText>
              <MultiplePicker
                items={seatsArray}
                selectedItems={tempSeats.length > 0 ? tempSeats : []}
                placeholder="Select Number of Seats"
                onConfirm={(items) => {
                  setTempSeats(items);
                }}
              />
              <AppButton
                title="Clear Filters"
                backgroundColor={null}
                color={colors.success}
                border={null}
                style={{ alignSelf: "flex-end" }}
                onPress={() => {
                  setTempMakes([]);
                  setTempFuel([]);
                  setTempDoors([]);
                  setTempSeats([]);
                }}
              />
              <AppButton
                title="Show Results"
                onPress={() => {
                  setFilterModalVisible(false);
                  setMakes(tempMakes);
                  setFuel(tempFuel);
                  setDoors(tempDoors);
                  setSeats(tempSeats);
                  handleRefresh();
                }}
              />
            </ScrollView>
            <AppButton
              backgroundColor={null}
              color={colors.danger}
              border={false}
              size={30}
              icon="close"
              onPress={() => {
                setFilterModalVisible(false);
                setTempMakes(makes);
                setTempFuel(fuel);
                setTempDoors(doors);
                setTempSeats(seats);
              }}
              style={styles.modalBottomCloseButton}
            />
          </View>
        </View>
      </Modal>
    </>
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
  optionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  modalTitle: {
    alignSelf: "center",
    color: colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  columnWrapper: {
    paddingHorizontal: 20,
    justifyContent: Platform.isPad ? "space-around" : "space-between",
  },
  filterModalBackground: {
    flex: 1,
    backgroundColor: colors.white + "aa",
  },
  modalContainer: {
    backgroundColor: "white",
    marginRight: 50,
    flex: 1,
    ...defaultStyle.shadow,
  },
  modalTopBarContainer: {
    flexDirection: "row",
    height: 80 + (Platform.OS === "ios" ? Constants.statusBarHeight : 0),
    backgroundColor: colors.secondary,
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    marginLeft: 20,
    marginTop: Platform.OS === "ios" ? Constants.statusBarHeight : 0,
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 24,
  },
  modalCloseButton: {
    marginRight: 20,
    marginTop: Platform.OS === "ios" ? Constants.statusBarHeight : 0,
  },
  modalSubtitle: {
    fontWeight: "bold",
    marginTop: 10,
    color: colors.secondary,
  },
  modalBottomCloseButton: {
    marginRight: 20,
    marginBottom: Platform.OS === "ios" ? 40 : 20,
    alignSelf: "flex-end",
  },
});

export default memo(TradeScreen, arePropsEqual);
