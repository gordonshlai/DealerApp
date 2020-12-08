import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AppButton from "../components/AppButton";
import LoadingVehicles from "../components/LoadingVehicles";

import AppText from "../components/AppText";
import Card from "../components/Card";
import Screen from "../components/Screen";
import Picker from "../components/Picker";

import client from "../api/client";
import useApi from "../hooks/useApi";

import defaultStyles from "../config/styles";
import { ListItemSeparator } from "../components/lists";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import routes from "../navigation/routes";

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
  const [makesArray, setMakesArray] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  const [pageCurrent, setPageCurrent] = useState(1);
  const [make, setMake] = useState("all");
  const [seller, setSeller] = useState("");
  const [env, setEnv] = useState("0");
  const [sortBy, setSortBy] = useState("listed-desc");

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortByModalVisible, setSortByModalVisible] = useState(false);
  const [filter, setFilter] = useState({
    make: make,
    seller: seller,
    env: env,
  });

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
  }, [refresh, pageCurrent, make, sortBy]);

  const getData = async () => {
    const result = await getVehiclesApi.request();
    console.log(endpoint);
    if (!result.ok) return;
    const newVehicles = result.data.data;
    const newVehiclesArray = parseObjectToArray(newVehicles);
    setVehicles([...vehicles, ...newVehiclesArray]);
  };

  const getMakes = async () => {
    let makeEndpoint = "api/trade/all/makes?seller=" + seller + "&env=" + env;
    const result = await client.get(makeEndpoint);
    if (!result.ok) return;
    const makes = result.data;
    const makesArray = parseObjectToArray(makes);
    setMakesArray(["ALL", ...makesArray]);
  };

  const handleRefresh = () => {
    setVehicles([]);
    setPageCurrent(1);
    setRefresh(!refresh);
  };

  const parseObjectToArray = (obj) => {
    let arr = [];
    for (let x in obj) {
      arr.push(obj[x]);
    }
    return arr;
  };

  const applyFilter = () => {
    setFilterModalVisible(false);
    if (filter.make != make) {
      setVehicles([]);
      setPageCurrent(1);
      setMake(filter.make);
    }
  };

  return (
    <>
      <Screen style={styles.screen}>
        {getVehiclesApi.error ? (
          <>
            <AppText style={styles.errorMessage}>
              Couldn't retrieve the vehicles.
            </AppText>
            <AppButton title="Retry" onPress={handleRefresh} />
          </>
        ) : (
          <>
            <View style={styles.optionBar}>
              <View style={styles.filterButtonContainer}>
                <AppButton
                  title="Filter"
                  color={null}
                  icon="filter-variant"
                  onPress={() => setFilterModalVisible(true)}
                />
              </View>
              <View style={styles.filterButtonContainer}>
                <AppButton
                  title="Sort By"
                  color={null}
                  icon="sort"
                  onPress={() => setSortByModalVisible(true)}
                />
              </View>
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
              refreshing={refreshing}
              onRefresh={handleRefresh}
              onEndReached={async () => {
                if (
                  !getVehiclesApi.loading &&
                  getVehiclesApi.data.next_page_url
                )
                  setPageCurrent(pageCurrent + 1);
              }}
              onEndReachedThreshold={0}
              ListFooterComponent={
                <LoadingVehicles visible={getVehiclesApi.loading} />
              }
            />
          </>
        )}
      </Screen>
      <Modal visible={filterModalVisible} animationType="slide">
        <View style={styles.modal}>
          <ScrollView>
            <View style={styles.modalCard}>
              <AppText style={styles.modalTitle}>Vehicle Make</AppText>
              <Picker
                icon="car-side"
                items={makesArray}
                onSelectItem={(make) => {
                  setFilter({
                    make: make.toLowerCase(),
                    seller: filter.seller,
                    env: filter.env,
                  });
                }}
                selectedItem={filter.make.toUpperCase()}
              />
              <AppButton title="Apply filter" onPress={applyFilter} />
            </View>
            <AppButton
              icon="close"
              color={null}
              title="close"
              onPress={() => setFilterModalVisible(false)}
            />
          </ScrollView>
        </View>
      </Modal>
      <Modal visible={sortByModalVisible} animationType="slide">
        <Screen style={{ padding: 20 }}>
          <FlatList
            data={sortByDisplayArray}
            keyExtractor={(item) => item}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                  setSortByModalVisible(false);
                  const query =
                    sortByQueryArray[sortByDisplayArray.indexOf(item)];
                  if (sortBy === query) return;
                  setVehicles([]);
                  setPageCurrent(1);
                  setSortBy(query);
                }}
              >
                <AppText>{item}</AppText>
                {sortBy ===
                sortByQueryArray[sortByDisplayArray.indexOf(item)] ? (
                  <MaterialCommunityIcons
                    name="check"
                    color={defaultStyles.colors.primary}
                    size={24}
                  />
                ) : null}
              </TouchableOpacity>
            )}
          />
          <AppButton
            icon="close"
            title="Close"
            color={null}
            onPress={() => setSortByModalVisible(false)}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  filterButtonContainer: {
    width: "35%",
  },
  noMatchingVehicles: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    color: defaultStyles.colors.primary,
    paddingTop: 20,
  },
  optionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  screen: {
    paddingHorizontal: 20,
  },
  modal: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: defaultStyles.colors.lightGrey,
    flex: 1,
  },
  modalCard: {
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  modalTitle: {
    alignSelf: "center",
    color: defaultStyles.colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  listItem: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default HomeScreen;
