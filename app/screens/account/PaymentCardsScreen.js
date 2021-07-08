import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Modal, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import ActivityIndicator from "../../components/ActivityIndicator";
import AppText from "../../components/AppText";
import AppButton from "../../components/AppButton";
import PaymentCard from "../../components/PaymentCard";
import { ListItem, ListItemSeparator } from "../../components/lists";

import useApi from "../../hooks/useApi";
import settingsApi from "../../api/settings";
import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import routes from "../../navigation/routes";

function PaymentCardsScreen({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const getPaymentCardsApi = useApi(settingsApi.getPayment);
  const patchPaymentCardApi = useApi((id) => settingsApi.patchPayment(id));
  const deletePaymentCardApi = useApi((id) => settingsApi.deletePayment(id));

  useEffect(() => {
    getPaymentCardsApi.request();
  }, []);

  /**
   * The options to perform on a payment card.
   */
  const options = [
    {
      title: "Set as default",
      onPress: async (id) => {
        await patchPaymentCardApi.request(id);
        await getPaymentCardsApi.request();
      },
    },
    {
      title: "Remove",
      onPress: async (id) => {
        await deletePaymentCardApi.request(id);
        await getPaymentCardsApi.request();
      },
    },
  ];

  return (
    <>
      <LinearGradient
        colors={["#143C4B", "#0E262F"]}
        style={styles.background}
      />
      <ActivityIndicator
        visible={getPaymentCardsApi.loading || patchPaymentCardApi.loading}
      />
      <AppButton
        title="New Card"
        backgroundColor={null}
        style={styles.newCardButton}
        onPress={() => navigation.navigate(routes.NEW_CARD)}
      />
      <FlatList
        data={getPaymentCardsApi.data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <PaymentCard
              last_4={item.token.last_4}
              holder={item.token.holder}
              expiry={item.token.expiry}
              type={item.token.type}
              onPress={() => {
                setModalVisible(true);
                setSelectedCard(item);
              }}
            />
            {item.default === "1" && (
              <View style={styles.defaultCardContainer}>
                <AppText style={styles.defaultCard}>Default</AppText>
              </View>
            )}
          </View>
        )}
        refreshing={refreshing}
        onRefresh={() => getPaymentCardsApi.request()}
        contentContainerStyle={styles.flatlist}
        style={{ marginBottom: tabBarHeight }}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackground}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.selectedCardContainer}>
            <PaymentCard
              last_4={selectedCard?.token.last_4}
              holder={selectedCard?.token.holder}
              expiry={selectedCard?.token.expiry}
              type={selectedCard?.token.type}
            />
          </View>
          <View style={styles.modalContainer}>
            <AppButton
              icon="close"
              backgroundColor={null}
              color={colors.danger}
              border={null}
              size={30}
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            />
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ListItem
                  title={item.title}
                  onPress={() => {
                    setModalVisible(false);
                    item.onPress(selectedCard?.id);
                  }}
                />
              )}
              ItemSeparatorComponent={ListItemSeparator}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  newCardButton: {
    alignSelf: "flex-end",
    marginRight: 20,
  },
  cardContainer: {
    margin: 10,
  },
  defaultCardContainer: {
    position: "absolute",
    top: 10,
    right: -20,
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 10,
    ...defaultStyles.shadow,
  },
  defaultCard: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  flatlist: {
    alignItems: "center",
  },
  selectedCardContainer: {
    margin: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.white + "aa",
  },
  modalContainer: {
    height: "40%",
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
});

export default PaymentCardsScreen;
