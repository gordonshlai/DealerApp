import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  RefreshControl,
  Modal,
  Dimensions,
  Linking,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
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
import Background from "../components/Background";
import ActivityIndicator from "../components/ActivityIndicator";
import Registration from "../components/Registration";
import Info from "../components/Info";
import SpecificationItem from "../components/SpecificationItem";
import { ListItemSeparator } from "../components/lists";
import Slider from "../components/Slider";
import Disclaimer from "../components/Disclaimer";

import client from "../api/client";
import useApi from "../hooks/useApi";

import colors from "../config/colors";
import defaultStyles from "../config/styles";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import AuthContext from "../auth/context";

const offerValidationSchema = Yup.object().shape({
  price: Yup.number().required().min(0).label("Price"),
});

const enquireValidationSchema = Yup.object().shape({
  message: Yup.string().min(0).label("Message"),
});

function TradeDetailScreen({ route, navigation }) {
  const vehicle = route.params;

  const { loadMessagesFlag, setLoadMessagesFlag } = useContext(AuthContext);

  const tabBarHeight = useBottomTabBarHeight();
  const [error, setError] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [makeOfferModalVisible, setMakeOfferModalVisible] = useState(false);
  const [enquireModalVisible, setEnquireModalVisible] = useState(false);
  const [disclaimerVisible, setDisclaimerVisible] = useState(false);
  const [message, setMessage] = useState("");

  const getVehicleApi = useApi(() =>
    client.get("api/trade/" + vehicle.type + "/inventory/" + vehicle.id)
  );
  const enquiryApi = useApi((payload) =>
    client.post("api/trade/" + vehicle.type + "/enquiry/" + vehicle.id, payload)
  );

  useEffect(() => {
    getVehicleApi.request();
  }, []);

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

  const handleOfferSubmit = ({ price }) => {
    setMakeOfferModalVisible(false);
    setDisclaimerVisible(true);
    setMessage(
      "I am interested in the " +
        getVehicleApi.data.year +
        " " +
        getVehicleApi.data.make +
        " " +
        getVehicleApi.data.model +
        " (" +
        formatingRegistration(getVehicleApi.data.registration) +
        "), would you accept £" +
        price
    );
  };

  const handleEnquireSubmit = ({ message }) => {
    setEnquireModalVisible(false);
    setDisclaimerVisible(true);
    setMessage(message);
  };

  const onAcceptPress = async () => {
    setDisclaimerVisible(false);
    const result = await enquiryApi.request({
      message: message,
    });
    if (!result.ok) {
      setDisclaimerVisible(false);
      setError(result.data.message);
    }
    navigation.navigate(routes.MESSAGES, {
      screen: routes.MESSAGE_DETAIL,
      inital: false,
      params: {
        messageId: result.data.id,
        title: getVehicleApi.data.seller.name,
      },
    });
    setLoadMessagesFlag(!loadMessagesFlag);
  };

  return (
    <>
      <Background />
      <ActivityIndicator
        visible={getVehicleApi.loading || enquiryApi.loading}
      />

      {getVehicleApi.error ? (
        <View style={{ padding: 20 }}>
          <AppText style={styles.errorMessage}>
            Couldn't retrieve the vehicle.
          </AppText>
          <AppErrorMessage error={error} visible={error} />
          <AppButton title="RETRY" onPress={() => getVehicleApi.request()} />
        </View>
      ) : (
        <>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => getVehicleApi.request()}
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
                          getVehicleApi.data.images.length > 1 ? 300 : 240,
                      },
                    ]}
                  >
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
                  <AppText style={styles.offerBadge}>
                    {`${getVehicleApi.data.offers_count} offer${
                      getVehicleApi.data.offers_count > 1 ? "s" : ""
                    }`}
                  </AppText>
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
                        {getVehicleApi.data.fuel}
                      </AppText>
                    )}
                    {getVehicleApi.data.transmission && (
                      <AppText style={styles.detail}>
                        {getVehicleApi.data.transmission}
                      </AppText>
                    )}
                  </View>

                  <View style={styles.detailRow}>
                    {getVehicleApi.data.price_cap && (
                      <View style={styles.detailField}>
                        <AppText style={styles.detailTitle}>
                          Guide Price
                        </AppText>
                        <AppText
                          style={[
                            styles.detailValue,
                            { color: colors.success },
                          ]}
                        >
                          {getVehicleApi.data.price_cap === "0.00"
                            ? "N/A"
                            : "£" +
                              numberWithCommas(getVehicleApi.data.price_cap)}
                        </AppText>
                      </View>
                    )}
                    {getVehicleApi.data.listed_at && (
                      <View style={styles.detailField}>
                        <AppText style={[styles.detailTitle]}>
                          Listed On
                        </AppText>
                        <AppText style={styles.detailValue}>
                          {dayjs(getVehicleApi.data.listed_at).format(
                            "DD/MM/YYYY"
                          )}
                        </AppText>
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
                            { color: colors.primary },
                          ]}
                        >
                          {getVehicleApi.data.price_asking === "0.00"
                            ? "POA"
                            : "£" +
                              numberWithCommas(getVehicleApi.data.price_asking)}
                        </AppText>
                      </View>
                    )}
                    {getVehicleApi.data.registration && (
                      <View style={styles.detailField}>
                        <AppText style={styles.detailTitle}>
                          Registration
                        </AppText>
                        <Registration
                          registration={getVehicleApi.data.registration}
                          style={{ fontSize: 22, alignSelf: "flex-start" }}
                        />
                      </View>
                    )}
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
                {getVehicleApi.data.seller && (
                  <>
                    <AppText style={styles.detailTitle}>Seller</AppText>
                    <AppText
                      style={[
                        styles.detailValue,
                        { color: colors.secondary, marginVertical: 5 },
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
                      color={colors.mediumGrey}
                      textStyle={{ fontStyle: "italic" }}
                    />
                    <AppButton
                      title="Show on map   >"
                      backgroundColor={null}
                      color={colors.success}
                      border={false}
                      onPress={() =>
                        Linking.openURL(
                          "https://www.google.com/maps/place/" +
                            getVehicleApi.data.seller.postcode
                        )
                      }
                      style={{ alignSelf: "flex-start" }}
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
            </Screen>
          </ScrollView>
          <View>
            <View style={styles.bottomButtonsContainer}>
              <AppButton
                title="Enquire"
                backgroundColor={null}
                color={colors.success}
                style={{ width: "45%" }}
                onPress={() => setEnquireModalVisible(true)}
              />
              <AppButton
                title="Make Offer"
                style={{ width: "45%" }}
                onPress={() => setMakeOfferModalVisible(true)}
              />
            </View>
          </View>
        </>
      )}

      <Modal
        visible={makeOfferModalVisible}
        transparent
        onRequestClose={() => setMakeOfferModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <Screen>
            <View style={styles.modalContainer}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                centerContent
                contentContainerStyle={styles.scrollView}
              >
                <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : ""}
                  keyboardVerticalOffset={Platform.OS == "ios" ? 150 : 0}
                >
                  {getVehicleApi.data.images && (
                    <View
                      style={[
                        styles.imageContainer,
                        {
                          height:
                            getVehicleApi.data.images.length > 1 ? 300 : 240,
                        },
                      ]}
                    >
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
                    <AppText style={{ fontWeight: "bold", fontSize: 18 }}>
                      You are making an offer on...
                    </AppText>
                    <AppText style={styles.title}>
                      {getVehicleApi.data.title}
                    </AppText>
                    <AppForm
                      initialValues={{
                        price:
                          getVehicleApi.data.price_asking &&
                          getVehicleApi.data.price_asking != "0.00"
                            ? getVehicleApi.data.price_asking
                            : "",
                      }}
                      onSubmit={handleOfferSubmit}
                      validationSchema={offerValidationSchema}
                    >
                      <AppFormField
                        icon="currency-gbp"
                        name="price"
                        placeholder="Type a price"
                        keyboardType="numeric"
                        color={colors.primary}
                        size={24}
                      />
                      <View style={styles.modalButtonsContainer}>
                        <AppButton
                          title="Cancel"
                          backgroundColor={null}
                          color={colors.success}
                          style={{ width: "45%" }}
                          onPress={() => setMakeOfferModalVisible(false)}
                        />
                        <SubmitButton title="Submit" style={{ width: "45%" }} />
                      </View>
                    </AppForm>
                  </View>
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
          </Screen>
        </View>
      </Modal>

      <Modal
        visible={enquireModalVisible}
        transparent
        onRequestClose={() => setEnquireModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <Screen>
            <View style={styles.modalContainer}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                centerContent
                contentContainerStyle={styles.scrollView}
              >
                <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : ""}
                  keyboardVerticalOffset={Platform.OS == "ios" ? 150 : 0}
                >
                  {getVehicleApi.data.images && (
                    <View
                      style={[
                        styles.imageContainer,
                        {
                          height:
                            getVehicleApi.data.images.length > 1 ? 300 : 240,
                        },
                      ]}
                    >
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
                    <AppText style={{ fontWeight: "bold", fontSize: 18 }}>
                      You are enquiring about...
                    </AppText>
                    <AppText style={styles.title}>
                      {getVehicleApi.data.title}
                    </AppText>
                    <AppForm
                      initialValues={{
                        message:
                          getVehicleApi.data.year &&
                          getVehicleApi.data.make &&
                          getVehicleApi.data.model &&
                          getVehicleApi.data.registration
                            ? "I am interested in the " +
                              getVehicleApi.data.year +
                              " " +
                              getVehicleApi.data.make +
                              " " +
                              getVehicleApi.data.model +
                              " (" +
                              formatingRegistration(
                                getVehicleApi.data.registration
                              ) +
                              "), is this still available?"
                            : "",
                      }}
                      onSubmit={handleEnquireSubmit}
                      validationSchema={enquireValidationSchema}
                    >
                      <View style={{ marginTop: 50 }}>
                        <AppText style={{ fontWeight: "bold", fontSize: 18 }}>
                          Message
                        </AppText>
                        <AppFormField
                          name="message"
                          placeholder="Type a message"
                          keyboardType="default"
                          multiline
                          size={18}
                        />
                        <View style={styles.modalButtonsContainer}>
                          <AppButton
                            title="Cancel"
                            backgroundColor={null}
                            color={colors.success}
                            style={{ width: "45%" }}
                            onPress={() => setEnquireModalVisible(false)}
                          />
                          <SubmitButton
                            title="Submit"
                            style={{ width: "45%" }}
                          />
                        </View>
                      </View>
                    </AppForm>
                  </View>
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
          </Screen>
        </View>
      </Modal>

      <Disclaimer
        visible={disclaimerVisible}
        setVisible={setDisclaimerVisible}
        onAcceptPress={onAcceptPress}
        onCancelPress={() => setDisclaimerVisible(false)}
      />
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
  offerBadge: {
    backgroundColor: colors.primary,
    color: "white",
    padding: 5,
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginBottom: 5,
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
    margin: 5,
    width: "50%",
  },
  detailTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.secondary,
  },
  detailValue: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
  },
  detail: {
    color: colors.mediumGrey,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 20,
  },
  address: {
    fontStyle: "italic",
    color: colors.mediumGrey,
    textAlign: "center",
  },
  enquireButton: {
    position: "absolute",
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    paddingBottom: Platform.OS === "ios" ? 30 : 10,
    backgroundColor: "white",
    ...defaultStyles.shadow,
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
  scrollView: {
    flexGrow: 1,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default TradeDetailScreen;
