import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import client from "../api/client";
import ActivityIndicator from "../components/ActivityIndicator";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Info from "../components/Info";
import Registration from "../components/Registration";
import Slider from "../components/Slider";
import colors from "../config/colors";
import useApi from "../hooks/useApi";
import SpecificationItem from "../components/SpecificationItem";
import { ListItemSeparator } from "../components/lists";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import { AppErrorMessage } from "../components/forms";
import Disclaimer from "../components/Disclaimer";
import Picker from "../components/Picker";
import useDidMountEffect from "../hooks/useDidMountEffect";
import AuthContext from "../auth/context";

dayjs.extend(customParseFormat);

const actions = [
  "In Stock",
  "Sold",
  "List On Trade To Trade",
  "Sold on Trade to Trade",
  "delete",
];

function InventoryDetailScreen({ navigation, route }) {
  const vehicle = route.params;

  const {
    loadInventoryDetailFlag,
    loadInventoryFlag,
    setLoadInventoryFlag,
    loadTradeFlag,
    setLoadTradeFlag,
  } = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [disclaimerVisible, setDisclaimerVisible] = useState(false);
  const [unlistVehicleModalVisible, setUnlistVehicleVisible] = useState(false);
  const [action, setAction] = useState();
  const [unlistVehicleReason, setUnlistVehicleReason] = useState(
    "Sold on Trade to Trade"
  );
  const [areYouSureModalVisible, setAreYouSureModalVisible] = useState(false);
  const [handlePatchFlag, setHandlePatchFlag] = useState(false);

  const getVehicleApi = useApi(() =>
    client.get("api/inventory/vehicles/" + vehicle.id)
  );
  const patchVehicleApi = useApi((payload) =>
    client.patch("api/inventory/vehicles/" + vehicle.id, payload)
  );
  const getMotHistoryApi = useApi(() =>
    client.get("api/inventory/dvsa/" + vehicle.id)
  );

  const deleteVehicleApi = useApi(() =>
    client.delete("api/inventory/vehicles/" + vehicle.id)
  );

  useEffect(() => {
    getVehicleApi.request();
    getMotHistoryApi.request();
  }, [loadInventoryDetailFlag]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AppButton
          icon="dots-vertical"
          color={null}
          size={24}
          badge={false}
          style={{ marginRight: 10 }}
          onPress={() => {
            setOptionModalVisible(true);
          }}
        />
      ),
    });
  }, [navigation]);

  useDidMountEffect(() => {
    handlePatch();
  }, [handlePatchFlag]);

  const numberWithCommas = (x) => {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const formatingRegistration = (registration) => {
    let firstPart = registration.substr(0, 4);
    let secondPart = registration.substr(4);
    return firstPart + " " + secondPart;
  };

  const handlePatch = async () => {
    getVehicleApi.data.sales_status = action;
    const result = await patchVehicleApi.request(getVehicleApi.data);
    if (!result.ok) {
      setError(result.data.message);
      setErrorModalVisible(true);
      return;
    }
    console.log(result);
  };

  return (
    <>
      <ActivityIndicator
        visible={
          getVehicleApi.loading ||
          getMotHistoryApi.loading ||
          patchVehicleApi.loading
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              getVehicleApi.request();
              getMotHistoryApi.request();
            }}
          />
        }
      >
        {getVehicleApi.error ? (
          <View style={{ padding: 20 }}>
            <AppText style={styles.errorMessage}>
              Couldn't retrieve the vehicle.
            </AppText>
            <AppButton
              title="RETRY"
              onPress={() => {
                getVehicleApi.request();
                getMotHistoryApi.request();
              }}
            />
          </View>
        ) : (
          <>
            <View style={[styles.informationContainer, { padding: 0 }]}>
              {getVehicleApi.data.images && (
                <View style={styles.imageContainer}>
                  {getVehicleApi.data.images.length !== 0 ? (
                    <Slider
                      images={getVehicleApi.data.images}
                      height={300}
                      width={Dimensions.get("window").width - 20}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="car"
                      size={200}
                      color="white"
                    />
                  )}
                </View>
              )}
              <View style={{ padding: 20 }}>
                <AppText style={styles.title} numberOfLines={2}>
                  {getVehicleApi.data.title ||
                    getVehicleApi.data.make +
                      " " +
                      getVehicleApi.data.model +
                      " (" +
                      getVehicleApi.data.year +
                      ")"}
                </AppText>
                <AppText style={styles.tagline} numberOfLines={2}>
                  {getVehicleApi.data.tagline}
                </AppText>
                <View style={[styles.detailRow, { marginBottom: 15 }]}>
                  {getVehicleApi.data.registration && (
                    <View style={styles.detailField}>
                      <Registration
                        registration={getVehicleApi.data.registration}
                        style={{ fontSize: 24 }}
                      />
                    </View>
                  )}
                  {getVehicleApi.data.mileage && (
                    <View style={styles.detailField}>
                      <Info
                        name="speedometer"
                        text={
                          numberWithCommas(getVehicleApi.data.mileage) + " mi"
                        }
                        textStyle={{ fontWeight: "bold" }}
                        size={24}
                      />
                    </View>
                  )}
                </View>

                <View style={styles.detailRow}>
                  {getVehicleApi.data.retail_price && (
                    <View style={styles.detailField}>
                      <AppText style={styles.detailTitle}>
                        Retail Sale Price
                      </AppText>
                      <AppText
                        style={[styles.detailValue, { color: colors.success }]}
                      >
                        {getVehicleApi.data.retail_price === "0.00"
                          ? " POA"
                          : "£" +
                            numberWithCommas(getVehicleApi.data.retail_price)}
                      </AppText>
                    </View>
                  )}
                  {getVehicleApi.data.price_asking && (
                    <View style={styles.detailField}>
                      <AppText style={styles.detailTitle}>
                        Trade Sale Price
                      </AppText>
                      <AppText
                        style={[styles.detailValue, { color: colors.success }]}
                      >
                        {getVehicleApi.data.price_asking === "0.00"
                          ? " POA"
                          : "£" +
                            numberWithCommas(getVehicleApi.data.price_asking)}
                      </AppText>
                    </View>
                  )}
                </View>

                <View style={[styles.detailRow, { marginBottom: 10 }]}>
                  {getVehicleApi.data.price_civ && (
                    <View style={styles.detailField}>
                      <AppText style={styles.detailTitle}>
                        Stand In Value
                      </AppText>
                      <AppText
                        style={[
                          styles.detailValue,
                          { color: colors.secondary },
                        ]}
                      >
                        {getVehicleApi.data.price_civ === "0.00"
                          ? "N/A"
                          : "£" +
                            numberWithCommas(getVehicleApi.data.price_civ)}
                      </AppText>
                    </View>
                  )}
                  {getVehicleApi.data.price_cap && (
                    <View style={styles.detailField}>
                      <AppText style={styles.detailTitle}>
                        Guide Sale Price
                      </AppText>
                      <AppText
                        style={[
                          styles.detailValue,
                          { color: colors.secondary },
                        ]}
                      >
                        {getVehicleApi.data.price_cap === "0.00"
                          ? "N/A"
                          : "£" +
                            numberWithCommas(getVehicleApi.data.price_cap)}
                      </AppText>
                    </View>
                  )}
                </View>
                <AppButton
                  icon={
                    getVehicleApi.data.sales_status == 2
                      ? "playlist-remove"
                      : "playlist-check"
                  }
                  title={
                    getVehicleApi.data.sales_status == 2
                      ? "Unlist from Trade to Trade"
                      : "List on Trade to Trade"
                  }
                  color={
                    getVehicleApi.data.sales_status == 2
                      ? colors.primary
                      : colors.success
                  }
                  onPress={() => {
                    if (getVehicleApi.data.sales_status != 2) {
                      setDisclaimerVisible(true);
                      setAction(actions.indexOf("List On Trade To Trade"));
                    } else {
                      setUnlistVehicleVisible(true);
                    }
                  }}
                />
              </View>
            </View>

            <View style={styles.informationContainer}>
              <AppText style={[styles.detailTitle, { marginBottom: 15 }]}>
                Specifications
              </AppText>
              {getVehicleApi.data.make && (
                <>
                  <SpecificationItem
                    icon="car-side"
                    text="Make"
                    value={getVehicleApi.data.make}
                  />
                  <ListItemSeparator />
                </>
              )}
              {getVehicleApi.data.model && (
                <>
                  <SpecificationItem
                    icon="alpha-m"
                    text="Model"
                    value={getVehicleApi.data.model}
                  />
                  <ListItemSeparator />
                </>
              )}
              {getVehicleApi.data.registration && (
                <>
                  <SpecificationItem
                    icon="card-text"
                    text="Registration"
                    value={formatingRegistration(
                      getVehicleApi.data.registration
                    )}
                  />
                  <ListItemSeparator />
                </>
              )}
              {getVehicleApi.data.mileage && (
                <>
                  <SpecificationItem
                    icon="speedometer"
                    text="Mileage"
                    value={numberWithCommas(getVehicleApi.data.mileage)}
                  />
                  <ListItemSeparator />
                </>
              )}
              {getVehicleApi.data.colour && (
                <>
                  <SpecificationItem
                    icon="format-color-fill"
                    text="Color"
                    value={getVehicleApi.data.colour}
                  />
                  <ListItemSeparator />
                </>
              )}
              {getVehicleApi.data.fuel && (
                <>
                  <SpecificationItem
                    icon="fuel"
                    text="Fuel"
                    value={getVehicleApi.data.fuel}
                  />
                  <ListItemSeparator />
                </>
              )}
              {getVehicleApi.data.engine_capacity && (
                <>
                  <SpecificationItem
                    icon="engine"
                    text="Engine Capacity"
                    value={getVehicleApi.data.engine_capacity}
                  />
                  <ListItemSeparator />
                </>
              )}
              {getVehicleApi.data.year && (
                <>
                  <SpecificationItem
                    icon="calendar"
                    text="Year"
                    value={getVehicleApi.data.year}
                  />
                  <ListItemSeparator />
                </>
              )}
              {getVehicleApi.data.registration_date && (
                <>
                  <SpecificationItem
                    icon="calendar-check"
                    text="Registration Date"
                    value={dayjs(getVehicleApi.data.registration_date).format(
                      "DD/MM/YYYY"
                    )}
                  />
                  <ListItemSeparator />
                </>
              )}
              {getVehicleApi.data.mot_expiry && (
                <>
                  <SpecificationItem
                    icon="alert-outline"
                    text="MOT Expiry"
                    value={dayjs(getVehicleApi.data.mot_expiry).format(
                      "DD/MM/YYYY"
                    )}
                  />
                  <ListItemSeparator />
                </>
              )}
              {getVehicleApi.data.transmission && (
                <>
                  <SpecificationItem
                    icon="settings"
                    text="Transmission"
                    value={getVehicleApi.data.transmission}
                  />
                  <ListItemSeparator />
                </>
              )}
              {getVehicleApi.data.seats && (
                <>
                  <SpecificationItem
                    icon="car-seat"
                    text="Seats"
                    value={getVehicleApi.data.seats}
                  />
                  <ListItemSeparator />
                </>
              )}
              {getVehicleApi.data.doors && (
                <>
                  <SpecificationItem
                    icon="car-door"
                    text="Doors"
                    value={getVehicleApi.data.doors}
                  />
                  <ListItemSeparator />
                </>
              )}
              {getVehicleApi.data.body_style && (
                <>
                  <SpecificationItem
                    icon="train-car"
                    text="Body Style"
                    value={getVehicleApi.data.body_style}
                  />
                </>
              )}
            </View>

            {getMotHistoryApi.data.tests && (
              <View style={styles.informationContainer}>
                <AppText style={[styles.detailTitle, { marginBottom: 15 }]}>
                  MOT Histroy
                </AppText>
                {getMotHistoryApi.data.tests.map((item, index) => (
                  <View style={styles.motEntryContainer} key={index}>
                    <View style={styles.detailRow}>
                      <View style={styles.detailField}>
                        <AppText style={styles.detailTitle}>Date</AppText>
                        <AppText>
                          {dayjs(
                            item.completedDate,
                            "YYYY.MM.DD HH:mm:ss"
                          ).format("DD/MM/YYYY")}
                        </AppText>
                      </View>
                      <View style={styles.detailField}>
                        <AppText style={styles.detailTitle}>Result</AppText>
                        <AppText
                          style={{
                            color:
                              item.testResult === "PASSED"
                                ? colors.success
                                : "red",
                          }}
                        >
                          {item.testResult}
                        </AppText>
                      </View>
                    </View>

                    <View style={styles.detailRow}>
                      <View style={styles.detailField}>
                        <AppText style={styles.detailTitle}>Expiry</AppText>
                        <AppText>
                          {item.expiryDate
                            ? dayjs(item.expiryDate, "YYYY.MM.DD").format(
                                "DD/MM/YYYY"
                              )
                            : "N/A"}
                        </AppText>
                      </View>
                      <View style={styles.detailField}>
                        <AppText style={styles.detailTitle}>Odometer</AppText>
                        <AppText>
                          {item.odometerValue + " " + item.odometerUnit}
                        </AppText>
                      </View>
                    </View>

                    {item.rfrAndComments.length > 0 && (
                      <View style={styles.motComments}>
                        <AppText style={styles.detailTitle}>Comments</AppText>
                        {item.rfrAndComments.map((comment, index) => (
                          <View key={index}>
                            <AppText>{comment.type}</AppText>
                            <AppText style={{ marginBottom: 10 }}>
                              {comment.text}
                            </AppText>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>

      <Modal
        visible={optionModalVisible}
        statusBarTranslucent
        onRequestClose={() => setOptionModalVisible(false)}
        transparent
      >
        <View style={{ backgroundColor: colors.mediumGrey + "aa", flex: 1 }}>
          <Screen
            style={{
              marginHorizontal: 20,
              padding: 20,
              backgroundColor: "white",
              borderRadius: 20,
            }}
          >
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                  setOptionModalVisible(false);
                  navigation.navigate(
                    routes.VEHICLE_DETAIL,
                    getVehicleApi.data
                  );
                }}
              >
                <AppText style={styles.options}>Edit Vehicle</AppText>
              </TouchableOpacity>
              <ListItemSeparator />
              {getVehicleApi.data.sales_status != 0 && (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => {
                    setOptionModalVisible(false);
                    setAction(actions.indexOf("In Stock"));
                    setHandlePatchFlag(!handlePatchFlag);
                  }}
                >
                  <AppText style={styles.options}>Mark as IN STOCK</AppText>
                </TouchableOpacity>
              )}
              {getVehicleApi.data.sales_status != 1 && (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => {
                    setOptionModalVisible(false);
                    setAction(actions.indexOf("Sold"));
                    setHandlePatchFlag(!handlePatchFlag);
                  }}
                >
                  <AppText style={styles.options}>Mark as SOLD</AppText>
                </TouchableOpacity>
              )}
              {getVehicleApi.data.sales_status != 2 && (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => {
                    setOptionModalVisible(false);
                    setAction(actions.indexOf("List On Trade To Trade"));
                    setDisclaimerVisible(true);
                  }}
                >
                  <AppText style={styles.options}>
                    List on Trade to Trade
                  </AppText>
                </TouchableOpacity>
              )}
              <ListItemSeparator />
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                  setOptionModalVisible(false);
                  setAreYouSureModalVisible(true);
                }}
              >
                <AppText style={[styles.options, { color: "red" }]}>
                  Delete Vehicle
                </AppText>
              </TouchableOpacity>
            </View>
            <AppButton
              icon="close"
              title="CLOSE"
              color={null}
              onPress={() => setOptionModalVisible(false)}
            />
          </Screen>
        </View>
      </Modal>

      <Disclaimer
        visible={disclaimerVisible}
        setVisible={setDisclaimerVisible}
        onAcceptPress={() => {
          setDisclaimerVisible(false);
          setHandlePatchFlag(!handlePatchFlag);
        }}
        onCancelPress={() => setDisclaimerVisible(false)}
      />

      <Modal
        visible={unlistVehicleModalVisible}
        transparent
        onRequestClose={() => setUnlistVehicleVisible(false)}
      >
        <View
          style={{
            paddingVertical: 50,
            paddingHorizontal: 20,
            backgroundColor: colors.mediumGrey + "aa",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: colors.lightGrey,
              borderRadius: 10,
              padding: 20,
              marginVertical: 10,
            }}
          >
            <Info
              name="alert-circle-outline"
              size={30}
              color={colors.primary}
              text="Unlist Vehicle"
            />
            <View style={{ marginVertical: 30 }}>
              <AppText style={{ fontWeight: "bold" }}>
                Please select a reason for unlisting your vehicle
              </AppText>
              <Picker
                items={[
                  "Sold on Trade to Trade",
                  "Sold to a customer",
                  "I changed my mind",
                ]}
                onSelectItem={(item) => {
                  setUnlistVehicleReason(item);
                  item === "Sold on Trade to Trade"
                    ? setAction(actions.indexOf("Sold on Trade to Trade"))
                    : item === "Sold to a customer"
                    ? setAction(actions.indexOf("Sold"))
                    : setAction(actions.indexOf("In Stock"));
                }}
                selectedItem={unlistVehicleReason}
                placeholder="Please select"
              />
            </View>
            <AppButton
              icon="playlist-remove"
              title={"Submit & Unlist"}
              color={colors.primary}
              onPress={() => {
                setUnlistVehicleVisible(false);
                setHandlePatchFlag(!handlePatchFlag);
              }}
            />
            <AppButton
              icon="cancel"
              title="Cancel"
              color={colors.secondary}
              onPress={() => setUnlistVehicleVisible(false)}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={errorModalVisible}
        transparent
        statusBarTranslucent
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 20,
            backgroundColor: colors.mediumGrey + "aa",
          }}
        >
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <AppErrorMessage error={error} visible={error} />
            <AppButton
              title="OK"
              onPress={() => setErrorModalVisible(false)}
              style={{ marginTop: 10 }}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={areYouSureModalVisible}
        transparent
        statusBarTranslucent
        onRequestClose={() => setAreYouSureModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 20,
            backgroundColor: colors.mediumGrey + "aa",
          }}
        >
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <Info
              name="alert-circle-outline"
              size={24}
              color={colors.danger}
              text="Are you sure?"
            />
            <AppText style={{ marginVertical: 20, textAlign: "center" }}>
              This action cannot be undone.
            </AppText>
            <AppButton
              icon="trash-can"
              title="Delete"
              color={colors.danger}
              onPress={async () => {
                setAreYouSureModalVisible(false);
                const result = await deleteVehicleApi.request();
                console.log(result);
                if (!result.ok) {
                  {
                    setError(result.data.message);
                    setErrorModalVisible(true);
                    return;
                  }
                }
                setLoadInventoryFlag(!loadInventoryFlag);
                setLoadTradeFlag(!loadTradeFlag);
                navigation.popToTop();
              }}
            />
            <AppButton
              icon="cancel"
              title="Cancel"
              color={colors.secondary}
              onPress={() => setAreYouSureModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginVertical: 20,
  },
  informationContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 20,
    overflow: "hidden",
  },
  imageContainer: {
    height: 300,
    width: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  tagline: {
    fontStyle: "italic",
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  detailField: {
    alignItems: "center",
    margin: 5,
    width: "50%",
  },
  detailTitle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  detailValue: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  motEntryContainer: {
    borderColor: colors.lightGrey,
    borderWidth: 2,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: 10,
    padding: 20,
    shadowRadius: 5,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowOffset: { height: 5, width: 5 },
  },
  motComments: {
    borderTopWidth: 2,
    borderTopColor: colors.lightGrey,
    marginTop: 10,
    paddingTop: 10,
  },
  listItem: {
    padding: 15,
  },
  options: {
    fontSize: 20,
  },
});

export default InventoryDetailScreen;
