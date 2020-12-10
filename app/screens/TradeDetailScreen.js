import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  RefreshControl,
  Modal,
  Dimensions,
} from "react-native";
import dayjs from "dayjs";
import * as Yup from "yup";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  AppErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";

import client from "../api/client";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";

import defaultStyles from "../config/styles";
import Screen from "../components/Screen";
import Registration from "../components/Registration";
import Info from "../components/Info";
import SpecificationItem from "../components/SpecificationItem";
import { ListItemSeparator } from "../components/lists";
import Slider from "../components/Slider";
import Disclaimer from "../components/Disclaimer";

const validationSchema = Yup.object().shape({
  price: Yup.number().required().min(0).label("Price"),
});

function TradeDetailScreen({ route, navigation }) {
  const vehicle = route.params;

  const endpoint = "api/trade/" + vehicle.type + "/inventory/" + vehicle.id;
  const getVehicleApi = useApi(() => client.get(endpoint));

  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [disclaimerVisible, setDisclaimerVisible] = useState(false);

  useEffect(() => {
    getVehicleApi.request();
  }, []);

  const handleRefresh = () => {
    getVehicleApi.request();
  };

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

  const handleSubmit = async ({ price }) => {
    setModalVisible(!modalVisible);
    setDisclaimerVisible(!disclaimerVisible);
    console.log(price);
  };

  return (
    <>
      <ActivityIndicator visible={getVehicleApi.loading} />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => getVehicleApi.request()}
            />
          }
        >
          {getVehicleApi.error ? (
            <View style={{ padding: 20 }}>
              <AppText style={styles.errorMessage}>
                Couldn't retrieve the vehicle.
              </AppText>
              <AppButton title="Retry" onPress={handleRefresh} />
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
                    {getVehicleApi.data.title}
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
                    {getVehicleApi.data.price_asking && (
                      <View style={styles.detailField}>
                        <AppText style={styles.detailTitle}>
                          Asking Price
                        </AppText>
                        <AppText
                          style={[
                            styles.detailValue,
                            { color: defaultStyles.colors.success },
                          ]}
                        >
                          {getVehicleApi.data.price_asking === "0.00"
                            ? " POA"
                            : "£" +
                              numberWithCommas(getVehicleApi.data.price_asking)}
                        </AppText>
                      </View>
                    )}
                    {getVehicleApi.data.price_cap && (
                      <View style={styles.detailField}>
                        <AppText style={styles.detailTitle}>
                          Guide Price
                        </AppText>
                        <AppText
                          style={[
                            styles.detailValue,
                            { color: defaultStyles.colors.secondary },
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

                  <View style={[styles.detailRow, { marginBottom: 10 }]}>
                    {getVehicleApi.data.listed_at && (
                      <View style={styles.detailField}>
                        <AppText style={[styles.detailTitle]}>
                          Listed On
                        </AppText>
                        <AppText
                          style={[
                            styles.detailValue,
                            { color: defaultStyles.colors.secondary },
                          ]}
                        >
                          {dayjs(getVehicleApi.data.listed_at).format(
                            "DD/MM/YYYY"
                          )}
                        </AppText>
                      </View>
                    )}
                    {getVehicleApi.data.offers_count && (
                      <View style={styles.detailField}>
                        <AppText style={styles.detailTitle}>Offers</AppText>
                        <AppText
                          style={[
                            styles.detailValue,
                            { color: defaultStyles.colors.black },
                          ]}
                        >
                          {getVehicleApi.data.offers_count}
                        </AppText>
                      </View>
                    )}
                  </View>
                  <AppButton
                    title="interested?"
                    onPress={() => setModalVisible(true)}
                  />
                </View>
              </View>

              <View style={styles.informationContainer}>
                {getVehicleApi.data.seller && (
                  <>
                    <AppText style={styles.detailTitle}>Seller</AppText>
                    <AppText
                      style={[
                        styles.detailValue,
                        { color: defaultStyles.colors.secondary },
                      ]}
                    >
                      {getVehicleApi.data.seller.name}
                    </AppText>
                    <Info
                      name="map-marker"
                      text={
                        getVehicleApi.data.seller.city +
                        ", " +
                        getVehicleApi.data.seller.postcode
                      }
                      textStyle={{ fontStyle: "italic" }}
                    />
                  </>
                )}
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

              <View style={styles.informationContainer}>
                <AppText style={[styles.detailTitle, { marginBottom: 15 }]}>
                  Description
                </AppText>
                <AppText style={{ fontSize: 22, fontWeight: "bold" }}>
                  {getVehicleApi.data.description
                    ? getVehicleApi.data.description
                    : "Not provided"}
                </AppText>
              </View>
            </>
          )}
        </ScrollView>

        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modal}>
            <ScrollView>
              <View style={styles.modalCard}>
                <AppText style={styles.modalTitle}>Enquire</AppText>
                <AppButton
                  icon="message-processing"
                  title="Make Enquiry"
                  color={defaultStyles.colors.secondary}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setDisclaimerVisible(!disclaimerVisible);
                  }}
                />
              </View>
              <View style={styles.modalCard}>
                <AppText style={styles.modalTitle}>Make An Offer</AppText>
                <AppForm
                  initialValues={{ price: "" }}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  <AppFormField
                    icon="currency-gbp"
                    name="price"
                    placeholder="Price"
                    keyboardType="numeric"
                  />
                  <SubmitButton
                    color={defaultStyles.colors.success}
                    icon="check"
                    title="Submit Offer"
                  />
                </AppForm>
              </View>
              <AppButton
                icon="close"
                color={null}
                title="close"
                onPress={() => setModalVisible(false)}
              />
            </ScrollView>
          </View>
        </Modal>
        <Modal visible={disclaimerVisible} animationType="fade">
          <View style={styles.modal}>
            <ScrollView>
              <View style={styles.modalCard}>
                <Disclaimer
                  onAcceptPress={() => {
                    setDisclaimerVisible(!disclaimerVisible);
                  }}
                  onCancelPress={() => {
                    setDisclaimerVisible(!disclaimerVisible);
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </Modal>
      </KeyboardAvoidingView>
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
  imageContainer: {
    height: 300,
    width: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  overviewContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 5,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tagline: {
    fontStyle: "italic",
    marginBottom: 20,
  },
  informationContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 20,
    overflow: "hidden",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  detailField: {
    alignItems: "center",
    margin: 5,
    width: "50%",
  },
  detailTitle: {
    fontWeight: "bold",
    color: defaultStyles.colors.darkGrey,
    textAlign: "center",
  },
  detailValue: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  address: {
    fontStyle: "italic",
    color: defaultStyles.colors.mediumGrey,
    textAlign: "center",
  },
  enquireButton: {
    position: "absolute",
  },
  modal: {
    padding: 20,
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
});

export default TradeDetailScreen;
