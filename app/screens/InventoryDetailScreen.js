import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
  Modal,
  TouchableOpacity,
  FlatList,
  Platform,
  Pressable,
} from "react-native";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import ActivityIndicator from "../components/ActivityIndicator";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Info from "../components/Info";
import Registration from "../components/Registration";
import Slider from "../components/Slider";
import SpecificationItem from "../components/SpecificationItem";
import { ListItemSeparator } from "../components/lists";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import { AppErrorMessage } from "../components/forms";
import TermsAndConditions from "../components/TermsAndConditions";
import AuthContext from "../auth/context";
import Background from "../components/Background";
import MotHistory from "../components/MotHistory";
import AppSwitch from "../components/AppSwitch";

import client from "../api/client";
import colors from "../config/colors";
import defaultStyles from "../config/styles";
import useApi from "../hooks/useApi";
import CoverOption from "./warranty/components/CoverOption";
import WarrantyContext from "../warranty/context";

dayjs.extend(customParseFormat);

const actions = [
  "Mark as IN STOCK",
  "Mark as SOLD",
  "List On Trade To Trade",
  "Sold to a customer",
  "Delete Vehicle",
];

const vehicleStatus = ["In Stock", "Sold", "Trade Listed", "Sold"];

function InventoryDetailScreen({ navigation, route }) {
  const vehicle = route.params;

  const {
    loadInventoryDetailFlag,
    setLoadInventoryDetailFlag,
    loadInventoryFlag,
    setLoadInventoryFlag,
    loadTradeFlag,
    setLoadTradeFlag,
  } = useContext(AuthContext);

  const { setVehicle, setUser, setQuote } = useContext(WarrantyContext);

  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [margin, setMargin] = useState(true);

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [termsAndConditionsVisible, setTermsAndConditionsVisible] =
    useState(false);
  const [areYouSureModalVisible, setAreYouSureModalVisible] = useState(false);

  const getVehicleApi = useApi(() =>
    client.get("api/inventory/vehicles/" + vehicle.id)
  );
  const getMotHistoryApi = useApi(() =>
    client.get("api/inventory/dvsa/" + vehicle.id)
  );
  const getWarrantyApi = useApi(() =>
    client.get("api/inventory/warranty/" + vehicle.id)
  );
  const userApi = useApi(() => client.get("api/user"));

  const quoteApi = useApi((payload) =>
    client.post("api/car/warranty/quote", payload)
  );
  const patchVehicleApi = useApi((payload) =>
    client.patch("api/inventory/vehicles/" + vehicle.id, payload)
  );
  const deleteVehicleApi = useApi(() =>
    client.delete("api/inventory/vehicles/" + vehicle.id)
  );

  useEffect(() => {
    getVehicleApi.request();
    getMotHistoryApi.request();
    getWarrantyApi.request();
    userApi.request();
  }, [loadInventoryDetailFlag]);

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

  const handlePatch = async (index) => {
    const payload = { ...getVehicleApi.data };
    payload.sales_status = index;
    const result = await patchVehicleApi.request(payload);
    if (!result.ok) {
      setError(result.data.message);
      setErrorModalVisible(true);
      return;
    }
    setLoadInventoryDetailFlag(!loadInventoryDetailFlag);
    setLoadInventoryFlag(!loadInventoryFlag);
    setLoadTradeFlag(!loadTradeFlag);
  };

  const secondRow = () => (
    <>
      {getVehicleApi.data.price_civ && (
        <View style={styles.detailField}>
          <AppText style={styles.detailTitle}>Stand In Value</AppText>
          <AppText style={styles.detailValue}>
            {getVehicleApi.data.price_civ === "0.00"
              ? "N/A"
              : "£" + numberWithCommas(getVehicleApi.data.price_civ)}
          </AppText>
        </View>
      )}
      {getVehicleApi.data.price_cap && (
        <View style={styles.detailField}>
          <AppText style={styles.detailTitle}>Guide Sale Price</AppText>
          <AppText style={styles.detailValue}>
            {getVehicleApi.data.price_cap === "0.00"
              ? "N/A"
              : "£" + numberWithCommas(getVehicleApi.data.price_cap)}
          </AppText>
        </View>
      )}
    </>
  );

  const thirdRow = () => (
    <>
      {getVehicleApi.data.registration && (
        <View style={styles.detailField}>
          <AppText style={styles.detailTitle}>Registration</AppText>
          <Registration
            registration={getVehicleApi.data.registration}
            style={{ fontSize: 24, alignSelf: "flex-start" }}
          />
        </View>
      )}
    </>
  );

  const coverOptions = () => {
    const [buyNowVisible, setBuyNowVisible] = useState(false);
    const [selected, setSelected] = useState("");

    const coverLevels = Object.keys(getWarrantyApi.data);

    const cover = (key) => (
      <CoverOption
        data={getWarrantyApi.data[key]}
        title={key}
        margin={margin}
        vat={userApi.data.user.account.vat}
        selected={true}
        onSelect={() => {
          setBuyNowVisible(true);
          setSelected(key);
        }}
      />
    );

    const handleBuyNow = async (key) => {
      const quoteVehicle = {
        registration: vehicle.registration,
        mileage: vehicle.mileage,
        make: vehicle.make,
        model: vehicle.model,
        manufacture_date: vehicle.registration_date,
        engine_cc: vehicle.engine_capacity,
        fuel_type: vehicle.fuel.toUpperCase(),
        retail_value: parseInt(vehicle.retail_price),
      };
      const payload = {
        cover: key.toUpperCase(),
        dealer_id: userApi.data.user.dealer_id,
        ...quoteVehicle,
      };
      const quote = await quoteApi.request(payload);
      console.log(quote);
      if (!quote.ok) return setError(quote.data.message);
      setVehicle(quote.data.vehicle);
      setUser(userApi.data.user);
      setQuote(quote.data);
      navigation.navigate(routes.WARRANTY, {
        screen: routes.CAR_WARRANTY_CUSTOMISE_COVER,
        initial: false,
      });
    };

    let renderItem = false;
    const coverOptions = coverLevels.map((key) => {
      if (getWarrantyApi.data[key].available) {
        renderItem = true;
        return (
          <View key={key}>
            {cover(key)}
            <Modal
              visible={buyNowVisible}
              animationType="slide"
              transparent
              onRequestClose={() => setBuyNowVisible(false)}
            >
              <Pressable
                style={[styles.modalBackground, { justifyContent: "flex-end" }]}
                onPress={() => setBuyNowVisible(false)}
              >
                <View style={{ marginHorizontal: 20 }}>{cover(selected)}</View>
                <View style={styles.buyNowContainer}>
                  <AppText style={[styles.title, { alignSelf: "center" }]}>
                    Buy Now?
                  </AppText>
                  <AppButton
                    title="Confirm"
                    onPress={() => {
                      setBuyNowVisible(false);
                      handleBuyNow(selected);
                    }}
                  />
                  <AppButton
                    title="Cancel"
                    backgroundColor={null}
                    color={colors.success}
                    onPress={() => setBuyNowVisible(false)}
                  />
                </View>
              </Pressable>
            </Modal>
          </View>
        );
      }
    });
    return (
      renderItem && (
        <View style={styles.informationContainer}>
          <AppText style={[styles.detailTitle, { marginBottom: 15 }]}>
            Cover Options
          </AppText>
          <AppSwitch
            value={margin}
            text="Toggle Margin"
            onValueChange={() => setMargin(!margin)}
          />
          {coverOptions}
        </View>
      )
    );
  };

  return (
    <>
      <Background />
      <ActivityIndicator
        visible={
          getVehicleApi.loading ||
          getMotHistoryApi.loading ||
          patchVehicleApi.loading ||
          getWarrantyApi.loading ||
          quoteApi.loading
        }
      />

      {getVehicleApi.error ? (
        <View style={{ padding: 20 }}>
          <AppText style={styles.errorMessage}>
            Couldn't retrieve the vehicle.
          </AppText>
          <AppErrorMessage error={error} visible={error} />
          <AppButton
            title="RETRY"
            onPress={() => {
              getVehicleApi.request();
              getMotHistoryApi.request();
              getWarrantyApi.request();
              userApi.request();
            }}
          />
        </View>
      ) : (
        <>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  getVehicleApi.request();
                  getMotHistoryApi.request();
                  getWarrantyApi.request();
                  userApi.request();
                }}
              />
            }
          >
            <Screen>
              <View style={[styles.informationContainer, { padding: 0 }]}>
                {getVehicleApi.data.images && (
                  <View
                    style={[
                      styles.imageContainer,
                      {
                        height:
                          getVehicleApi.data.images.length > 1
                            ? (Dimensions.get("window").width - 20) / 1.5
                            : ((Dimensions.get("window").width - 20) / 1.5) *
                              0.8,
                      },
                    ]}
                  >
                    {getVehicleApi.data.images.length !== 0 ? (
                      <Slider
                        images={getVehicleApi.data.images}
                        height={(Dimensions.get("window").width - 20) / 1.5}
                        width={Dimensions.get("window").width - 20}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="car"
                        size={200}
                        color="white"
                      />
                    )}
                    <AppText
                      style={{
                        position: "absolute",
                        backgroundColor:
                          getVehicleApi.data.sales_status == 0
                            ? "orange"
                            : getVehicleApi.data.sales_status == 2
                            ? "green"
                            : "crimson",
                        top: 10,
                        right: 10,
                        paddingHorizontal: 5,
                        paddingVertical: 3,
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: 10,
                        overflow: "hidden",
                      }}
                    >
                      {vehicleStatus[getVehicleApi.data.sales_status]}
                    </AppText>
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

                  <View style={[styles.detailRow, { marginBottom: 20 }]}>
                    {getVehicleApi.data.mileage && (
                      <AppText style={styles.detail}>
                        {numberWithCommas(getVehicleApi.data.mileage) + " mi"}
                      </AppText>
                    )}
                    {getVehicleApi.data.fuel && (
                      <AppText style={styles.detail}>
                        {`-  ${getVehicleApi.data.fuel}`}
                      </AppText>
                    )}
                    {getVehicleApi.data.transmission && (
                      <AppText style={styles.detail}>
                        {`-  ${getVehicleApi.data.transmission}`}
                      </AppText>
                    )}
                  </View>

                  <View style={styles.detailRow}>
                    {getVehicleApi.data.retail_price && (
                      <View style={styles.detailField}>
                        <AppText style={styles.detailTitle}>
                          Retail Sale Price
                        </AppText>
                        <AppText
                          style={[
                            styles.detailValue,
                            { color: colors.primary },
                          ]}
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
                          style={[
                            styles.detailValue,
                            { color: colors.success },
                          ]}
                        >
                          {getVehicleApi.data.price_asking === "0.00"
                            ? " POA"
                            : "£" +
                              numberWithCommas(getVehicleApi.data.price_asking)}
                        </AppText>
                      </View>
                    )}
                    {Platform.isPad && secondRow()}
                    {Platform.isPad && thirdRow()}
                  </View>

                  {!Platform.isPad && (
                    <View style={[styles.detailRow, { marginBottom: 10 }]}>
                      {secondRow()}
                    </View>
                  )}

                  <View style={styles.detailRow}>
                    {!Platform.isPad && thirdRow()}
                  </View>
                </View>
              </View>

              <View style={styles.informationContainer}>
                <AppText style={[styles.detailTitle, { marginBottom: 15 }]}>
                  Specifications
                </AppText>
                {getVehicleApi.data.make && (
                  <>
                    <SpecificationItem
                      title="Make"
                      value={getVehicleApi.data.make}
                    />
                    <ListItemSeparator />
                  </>
                )}
                {getVehicleApi.data.model && (
                  <>
                    <SpecificationItem
                      title="Model"
                      value={getVehicleApi.data.model}
                    />
                    <ListItemSeparator />
                  </>
                )}
                {getVehicleApi.data.registration && (
                  <>
                    <SpecificationItem
                      title="Registration"
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
                      title="Mileage"
                      value={numberWithCommas(getVehicleApi.data.mileage)}
                    />
                    <ListItemSeparator />
                  </>
                )}
                {getVehicleApi.data.colour && (
                  <>
                    <SpecificationItem
                      title="Color"
                      value={getVehicleApi.data.colour}
                    />
                    <ListItemSeparator />
                  </>
                )}
                {getVehicleApi.data.fuel && (
                  <>
                    <SpecificationItem
                      title="Fuel"
                      value={getVehicleApi.data.fuel}
                    />
                    <ListItemSeparator />
                  </>
                )}
                {getVehicleApi.data.engine_capacity && (
                  <>
                    <SpecificationItem
                      title="Engine Capacity"
                      value={getVehicleApi.data.engine_capacity}
                    />
                    <ListItemSeparator />
                  </>
                )}
                {getVehicleApi.data.year && (
                  <>
                    <SpecificationItem
                      title="Year"
                      value={getVehicleApi.data.year}
                    />
                    <ListItemSeparator />
                  </>
                )}
                {getVehicleApi.data.registration_date && (
                  <>
                    <SpecificationItem
                      title="Registration Date"
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
                      title="MOT Expiry"
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
                      title="Transmission"
                      value={getVehicleApi.data.transmission}
                    />
                    <ListItemSeparator />
                  </>
                )}
                {getVehicleApi.data.seats && (
                  <>
                    <SpecificationItem
                      title="Seats"
                      value={getVehicleApi.data.seats}
                    />
                    <ListItemSeparator />
                  </>
                )}
                {getVehicleApi.data.doors && (
                  <>
                    <SpecificationItem
                      title="Doors"
                      value={getVehicleApi.data.doors}
                    />
                    <ListItemSeparator />
                  </>
                )}
                {getVehicleApi.data.body_style && (
                  <>
                    <SpecificationItem
                      title="Body Style"
                      value={getVehicleApi.data.body_style}
                    />
                  </>
                )}
              </View>

              <View style={styles.informationContainer}>
                <AppText style={[styles.detailTitle, { marginBottom: 15 }]}>
                  Description
                </AppText>
                <AppText>
                  {getVehicleApi.data.description
                    ? getVehicleApi.data.description
                    : "Not provided"}
                </AppText>
              </View>

              {coverOptions()}

              {getMotHistoryApi.data.tests && (
                <View style={styles.informationContainer}>
                  <AppText style={[styles.detailTitle, { marginBottom: 15 }]}>
                    MOT Histroy
                  </AppText>
                  {getMotHistoryApi.data.tests.map((item, index) => (
                    <MotHistory item={item} key={index} />
                  ))}
                </View>
              )}
            </Screen>
          </ScrollView>
          <View>
            <View style={styles.bottomButtonsContainer}>
              <AppButton
                title="Edit Vehicle"
                backgroundColor={null}
                color={colors.success}
                style={{ width: "45%" }}
                onPress={() =>
                  navigation.navigate(routes.NEW_CAR, {
                    screen: routes.VEHICLE_DETAIL,
                    params: getVehicleApi.data,
                  })
                }
              />
              <AppButton
                title="Actions"
                style={{ width: "45%" }}
                onPress={() => setActionModalVisible(true)}
              />
            </View>
          </View>
        </>
      )}

      <Modal
        visible={actionModalVisible}
        transparent
        onRequestClose={() => setActionModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <Screen>
            <View style={styles.modalContainer}>
              <FlatList
                ListHeaderComponent={
                  <>
                    {getVehicleApi.data.images && (
                      <View
                        style={[
                          styles.imageContainer,
                          {
                            height:
                              getVehicleApi.data.images.length > 1
                                ? (Dimensions.get("window").width - 20) / 1.5
                                : (Dimensions.get("window").width - 20) / 1.5,
                          },
                        ]}
                      >
                        {getVehicleApi.data.images.length !== 0 ? (
                          <Slider
                            images={getVehicleApi.data.images}
                            height={(Dimensions.get("window").width - 20) / 1.5}
                            width={Dimensions.get("window").width - 20}
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name="car"
                            size={200}
                            color="white"
                          />
                        )}
                        <AppText
                          style={{
                            position: "absolute",
                            backgroundColor:
                              getVehicleApi.data.sales_status == 0
                                ? "orange"
                                : getVehicleApi.data.sales_status == 2
                                ? "green"
                                : "crimson",
                            top: 10,
                            right: 10,
                            padding: 5,
                            color: "white",
                            fontWeight: "bold",
                            borderRadius: 10,
                            overflow: "hidden",
                          }}
                        >
                          {vehicleStatus[getVehicleApi.data.sales_status]}
                        </AppText>
                      </View>
                    )}
                    <AppText style={[styles.title, { margin: 20 }]}>
                      {getVehicleApi.data.title ||
                        getVehicleApi.data.make +
                          " " +
                          getVehicleApi.data.model +
                          " (" +
                          getVehicleApi.data.year +
                          ")"}
                    </AppText>
                  </>
                }
                data={actions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  const status = getVehicleApi.data.sales_status;
                  const isActive = index == status;
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setActionModalVisible(false);
                        if (index === 0 || index === 1 || index === 3) {
                          return handlePatch(index);
                        } else if (index === 2) {
                          setTermsAndConditionsVisible(true);
                        } else {
                          setAreYouSureModalVisible(true);
                        }
                      }}
                      underlayColor={colors.lightGrey}
                      style={[styles.actionItem, isActive && styles.activeItem]}
                      key={index}
                    >
                      <AppText
                        style={[
                          isActive && styles.activeText,
                          index === 4 && { color: "red" },
                        ]}
                      >
                        {item}
                      </AppText>
                      {isActive && (
                        <MaterialCommunityIcons
                          name="check"
                          color={colors.primary}
                          size={24}
                        />
                      )}
                    </TouchableOpacity>
                  );
                }}
                ItemSeparatorComponent={ListItemSeparator}
                ListFooterComponent={
                  <AppButton
                    title="Back"
                    backgroundColor={null}
                    color={colors.success}
                    onPress={() => setActionModalVisible(false)}
                    style={{ margin: 20 }}
                  />
                }
              />
            </View>
          </Screen>
        </View>
      </Modal>

      <TermsAndConditions
        visible={termsAndConditionsVisible}
        setVisible={setTermsAndConditionsVisible}
        onAcceptPress={() => {
          setTermsAndConditionsVisible(false);
          handlePatch(actions.indexOf("List On Trade To Trade"));
        }}
        onCancelPress={() => setTermsAndConditionsVisible(false)}
      />

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
            <AppText
              style={{ marginVertical: 20, textAlign: "center", fontSize: 18 }}
            >
              This action cannot be undone.
            </AppText>
            <AppButton
              title="Delete"
              backgroundColor={colors.danger}
              border={false}
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
              title="Cancel"
              backgroundColor={null}
              color={colors.success}
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
    color: "white",
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
    ...defaultStyles.shadow,
  },
  imageContainer: {
    height: 300,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.secondary,
  },
  tagline: {
    color: colors.secondary,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
  },
  detailField: {
    marginVertical: 5,
    width: Platform.isPad ? "20%" : "50%",
  },
  detailTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.secondary,
  },
  detailValue: {
    fontSize: 22,
    fontWeight: "bold",
  },
  detail: {
    color: colors.mediumGrey,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: colors.white + "aa",
  },
  modalContainer: {
    backgroundColor: "white",
    margin: 10,
    flex: 1,
    borderRadius: 10,
    ...defaultStyles.shadow,
  },
  buyNowContainer: {
    height: "40%",
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...defaultStyles.shadow,
  },
  actionItem: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activeItem: {
    backgroundColor: colors.primary + "11",
  },
  activeText: {
    fontWeight: "bold",
    color: colors.primary,
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    paddingBottom: Platform.OS === "ios" ? 30 : 10,
    backgroundColor: "white",
    ...defaultStyles.shadow,
  },
});

export default InventoryDetailScreen;
