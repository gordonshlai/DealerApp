import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Modal } from "react-native";
import { ButtonGroup } from "react-native-elements";
import AppButton from "../components/AppButton";
import LoadingVehicles from "../components/LoadingVehicles";

import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Card from "../components/Card";
import Screen from "../components/Screen";
import Picker from "../components/Picker";

import client from "../api/client";
import useApi from "../hooks/useApi";

import defaultStyles from "../config/styles";
import IconButton from "../components/IconButton";

const statusArray = ["stock", "listed", "sold"];

function InventoryScreen({ navigation }) {
  const [makesArray, setMakesArray] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  const [make, setMake] = useState("all");
  const [status, setStatus] = useState(statusArray[0]);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [search, setSearch] = useState("");

  const [serachBarVisible, setSearchBarVisible] = useState(false);

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filter, setFilter] = useState({
    status: status,
    make: make,
  });

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
  }, [refresh, pageCurrent, search, status, make]);

  const getData = async () => {
    const result = await getVehiclesApi.request();
    console.log(endpoint);
    if (!result.ok) return;
    const newVehicles = result.data.data;
    const newVehiclesArray = parseObjectToArray(newVehicles);
    setVehicles([...vehicles, ...newVehiclesArray]);
  };

  const getMakes = async () => {
    const result = await client.get("api/inventory/makes");
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

  let searchCheck;
  const handleSearch = (text) => {
    searchCheck = text;
    setTimeout(async () => {
      if (searchCheck == text) {
        setVehicles([]);
        setPageCurrent(1);
        setSearch(text);
      }
    }, 500);
  };

  const applyFilter = () => {
    setFilterModalVisible(false);
    if (filter.status === status && filter.make === make) return;
    setVehicles([]);
    setPageCurrent(1);
    setStatus(filter.status);
    setMake(filter.make);
  };

  return (
    <>
      <Screen style={styles.screen}>
        {getVehiclesApi.error ? (
          <>
            <AppText style={styles.errorMessage}>
              Couldn't retrieve the vehicles.
            </AppText>
            <AppButton
              style={styles.retryButton}
              title="Retry"
              onPress={handleRefresh}
            />
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
              <View style={styles.searchButtonContainer}>
                <IconButton
                  name={serachBarVisible ? "magnify-close" : "magnify"}
                  onPress={() => setSearchBarVisible(!serachBarVisible)}
                />
              </View>
            </View>
            <View
              style={
                serachBarVisible ? { opacity: 1 } : { height: 0, opacity: 0 }
              }
            >
              <AppTextInput
                icon="magnify"
                placeholder="(Registration)"
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
                  onPress={() => console.log(item)}
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
        <Screen style={styles.modal}>
          <AppText style={styles.modalTitle}>Filter</AppText>
          <AppText>Status</AppText>
          <ButtonGroup
            buttonStyle={{ paddingHorizontal: 10 }}
            buttonContainerStyle={{}}
            buttons={["In stock", "Trade Listed", "Sold"]}
            containerStyle={{ height: 50, marginBottom: 30 }}
            onPress={(statusIndex) =>
              setFilter({
                status: statusArray[statusIndex],
                make: filter.make,
              })
            }
            selectedButtonStyle={{
              backgroundColor: defaultStyles.colors.secondary,
            }}
            selectedIndex={statusArray.indexOf(filter.status)}
            textStyle={{
              fontSize: 16,
              color: defaultStyles.colors.secondary,
              textAlign: "center",
            }}
          />
          <AppText>Vehicle Make</AppText>
          <Picker
            icon="car-side"
            items={makesArray}
            onSelectItem={(make) => {
              setFilter({
                status: filter.status,
                make: make.toLowerCase(),
              });
            }}
            selectedItem={filter.make.toUpperCase()}
          />
          <AppButton title="Apply filter" onPress={applyFilter} />
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
    width: "25%",
  },
  searchButtonContainer: {
    justifyContent: "center",
  },
  searchBarContainer: {
    marginBottom: 10,
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
  retryButton: {
    justifyContent: "flex-end",
  },
  modal: {
    padding: 20,
    backgroundColor: defaultStyles.colors.white,
  },
  modalTitle: {
    alignSelf: "center",
    color: defaultStyles.colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default InventoryScreen;
