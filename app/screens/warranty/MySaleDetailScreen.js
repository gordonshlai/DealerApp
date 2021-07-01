import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  SectionList,
  Modal,
  Pressable,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import dayjs from "dayjs";

import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import ActivityIndicator from "../../components/ActivityIndicator";
import Background from "../../components/Background";
import Screen from "../../components/Screen";
import { AppErrorMessage } from "../../components/forms";
import { ListItem, ListItemSeparator } from "../../components/lists";
import ViewDocument from "../../components/ViewDocument";

import useApi from "../../hooks/useApi";
import client from "../../api/client";
import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import settings from "../../config/settings";

const serviceHistory = [
  "Unknown",
  "Full (all with main dealer)",
  "Full (some with main dealer)",
  "Full (none with main dealer)",
  "Last few services only",
  "Last service only",
];

function MySaleDetailScreen({ route }) {
  const id = route.params;
  const tabBarHeight = useBottomTabBarHeight();

  const [error, setError] = useState();
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [invoiceVisible, setInvoiceVisible] = useState(false);
  const [scheduleVisible, setScheduleVisible] = useState(false);

  const getMySaleApi = useApi(() => client.get(`api/car/warranty/sale/${id}`));
  const sendEmailApi = useApi(() =>
    client.get(`api/car/warranty/sale/customer/${id}`)
  );

  const sendEmail = async () => {
    const result = await sendEmailApi.request();
    if (!result.ok) setError(result.data.message);
    setMessageVisible(true);
    setTimeout(() => {
      setMessageVisible(false);
    }, 3000);
  };

  useEffect(() => {
    getMySaleApi.request();
  }, []);

  const DATA = [
    {
      title: "Plan",
      data: [
        {
          fieldName: "Plan Reference",
          value: getMySaleApi.data.id,
        },
        {
          fieldName: "Cover Level",
          value: getMySaleApi.data.cover_type,
        },
        {
          fieldName: "Cover Length",
          value: `${getMySaleApi.data.cover_length} months`,
        },
        {
          fieldName: "Purchase Date",
          value: dayjs(getMySaleApi.data.purchase_date).format("DD/MM/YYYY"),
        },
        {
          fieldName: "Cost (Excl. VAT)",
          value: `£ ${getMySaleApi.data.cost_net}`,
        },
        {
          fieldName: "VAT",
          value: `£ ${(
            getMySaleApi.data.cost_total - getMySaleApi.data.cost_net
          ).toFixed(2)}`,
        },
        {
          fieldName: "Cost (Incl. VAT)",
          value: `£ ${getMySaleApi.data.cost_total}`,
        },
        {
          fieldName: "Cost (Incl. VAT & Margin)",
          value: `£ ${getMySaleApi.data.cost_margin}`,
        },
        {
          fieldName: "Issue Date",
          value: dayjs(getMySaleApi.data.issue_date).format("DD/MM/YYYY"),
        },
        {
          fieldName: "Start Date",
          value: dayjs(getMySaleApi.data.start_date).format("DD/MM/YYYY"),
        },
        {
          fieldName: "Labour Rate",
          value: `£ ${getMySaleApi.data.labour} per hour`,
        },
        {
          fieldName: "Single Claim Limit",
          value: `£ ${getMySaleApi.data.claims}`,
        },
      ],
    },
    {
      title: "Additions",
      data: [
        {
          fieldName: "Airbags",
          value: getMySaleApi.data.airbags ? "Yes" : "No",
        },
        {
          fieldName: "Air Con",
          value: getMySaleApi.data.aircon ? "Yes" : "No",
        },
        {
          fieldName: "Assist",
          value: getMySaleApi.data.assist ? "Yes" : "No",
        },
        {
          fieldName: "Emissions",
          value: getMySaleApi.data.emissions ? "Yes" : "No",
        },
        {
          fieldName: "MOT",
          value: getMySaleApi.data.mot ? "Yes" : "No",
        },
        {
          fieldName: "Multimedia",
          value: getMySaleApi.data.multimedia ? "Yes" : "No",
        },
        getMySaleApi.data.fuel_type === "ELECTRIC" && {
          fieldName: "EV",
          value: getMySaleApi.data.ev ? "Yes" : "No",
        },
      ],
    },
    {
      title: "Vehicle",
      data: [
        {
          fieldName: "Make",
          value: getMySaleApi.data.make,
        },
        {
          fieldName: "Model",
          value: getMySaleApi.data.model,
        },
        {
          fieldName: "Registration",
          value: getMySaleApi.data.registration,
        },
        {
          fieldName: "VIN Number",
          value: getMySaleApi.data.vin_number || "Not Provided",
        },
        {
          fieldName: "Engine (cc)",
          value: getMySaleApi.data.engine_cc,
        },
        {
          fieldName: "Fuel Type",
          value: getMySaleApi.data.fuel_type,
        },
        {
          fieldName: "Mileage",
          value: getMySaleApi.data.mileage,
        },
        {
          fieldName: "Manufacture Date",
          value: dayjs(getMySaleApi.data.manufacture_date).format("DD/MM/YYYY"),
        },
        {
          fieldName: "MOT Date",
          value: dayjs(getMySaleApi.data.mot_date).format("DD/MM/YYYY"),
        },
        {
          fieldName: "Service History",
          value: serviceHistory[getMySaleApi.data.service_history],
        },
      ],
    },
    {
      title: "Customer",
      data: [
        {
          fieldName: "Title",
          value: getMySaleApi.data.title,
        },
        {
          fieldName: "First Name",
          value: getMySaleApi.data.first_name,
        },
        {
          fieldName: "Last Name",
          value: getMySaleApi.data.last_name,
        },
        {
          fieldName: "Email",
          value: getMySaleApi.data.email,
        },
        {
          fieldName: "Telephone",
          value: getMySaleApi.data.telephone,
        },
        {
          fieldName: "Address Line 1",
          value: getMySaleApi.data.address_1,
        },
        {
          fieldName: "Address Line 2",
          value: getMySaleApi.data.address_2,
        },
        {
          fieldName: "City / Town",
          value: getMySaleApi.data.town,
        },
        {
          fieldName: "Postcode",
          value: getMySaleApi.data.postcode,
        },
      ],
    },
  ];

  const actions = [
    {
      title: "View Invoice",
      onPress: () => setInvoiceVisible(true),
    },
    {
      title: "View Schedule",
      onPress: () => setScheduleVisible(true),
    },
    {
      title: "Email Customer Confirmation",
      onPress: sendEmail,
    },
  ];

  return (
    <>
      <Background />
      <ActivityIndicator
        visible={getMySaleApi.loading || sendEmailApi.loading}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        keyboardVerticalOffset={Platform.OS == "ios" ? 50 : 0}
        style={styles.keyboardAvoidingView}
      >
        <Screen style={styles.screen}>
          <View style={styles.subheaderContainer}>
            <AppText style={styles.subheaderTitle}>My Sales</AppText>
            <AppButton
              title="Actions"
              backgroundColor={colors.primary}
              border={null}
              onPress={() => setActionModalVisible(true)}
            />
          </View>
          {getMySaleApi.error ? (
            <>
              <AppText style={styles.fieldName}>
                Error Retrieving The Sales.
              </AppText>
              <ActivityIndicator visible={getMySaleApi.loading} />
              <AppErrorMessage visible={error} error={error} />
              <AppButton title="RETRY" onPress={() => getMySaleApi.request()} />
            </>
          ) : (
            <View style={[styles.card, { marginBottom: tabBarHeight }]}>
              <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderSectionHeader={({ section: { title } }) => (
                  <View style={styles.sectionTitleContainer}>
                    <AppText style={styles.sectionTitle}>{title}</AppText>
                  </View>
                )}
                renderItem={({ item }) => (
                  <View style={styles.textContainer}>
                    <AppText>{item.fieldName}</AppText>
                    <AppText style={styles.bold}>{item.value}</AppText>
                  </View>
                )}
                ItemSeparatorComponent={ListItemSeparator}
                renderSectionFooter={() => <View style={{ height: 40 }}></View>}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}
          <Modal
            visible={actionModalVisible}
            animationType="slide"
            transparent
            onRequestClose={() => setActionModalVisible(false)}
          >
            <Pressable
              style={styles.modalBackground}
              onPress={() => setActionModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <AppButton
                  icon="close"
                  backgroundColor={null}
                  color={colors.danger}
                  border={null}
                  size={30}
                  onPress={() => setActionModalVisible(false)}
                  style={styles.closeButton}
                />
                <FlatList
                  data={actions}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <ListItem
                      title={item.title}
                      onPress={() => {
                        setActionModalVisible(false);
                        item.onPress();
                      }}
                    />
                  )}
                  ItemSeparatorComponent={ListItemSeparator}
                />
              </View>
            </Pressable>
          </Modal>
        </Screen>
        {messageVisible && (
          <View style={styles.messageContainer}>
            <AppText style={styles.message}>
              {sendEmailApi.data.message}
            </AppText>
          </View>
        )}
      </KeyboardAvoidingView>
      <ViewDocument
        visible={invoiceVisible}
        setVisible={setInvoiceVisible}
        uri={`${settings.apiUrl}api/car/warranty/sale/pdf/${getMySaleApi.data.id}`}
      />
      <ViewDocument
        visible={scheduleVisible}
        setVisible={setScheduleVisible}
        uri={`${settings.apiUrl}api/car/warranty/sale/plan-book/${getMySaleApi.data.id}`}
      />
    </>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  screen: {
    paddingHorizontal: 20,
  },
  subheaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subheaderTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    ...defaultStyles.shadow,
  },
  sectionTitleContainer: {
    backgroundColor: "white",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.secondary,
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
  },
  bold: {
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    height: "50%",
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...defaultStyles.shadow,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  messageContainer: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    backgroundColor: colors.success + "dd",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  message: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});

export default MySaleDetailScreen;
