import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Platform,
} from "react-native";
import Constants from "expo-constants";

import AppButton from "./AppButton";
import Screen from "./Screen";
import { ListItemSeparator } from "./lists";

import routes from "../navigation/routes";
import colors from "../config/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppText from "./AppText";

const list = [
  routes.HOME,
  routes.TRADE,
  routes.INVENTORY,
  routes.MESSAGES,
  routes.ACCOUNT,
];

function Menu() {
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <AppButton
        backgroundColor={null}
        border={false}
        color={colors.primary}
        icon="menu"
        size={24}
        onPress={() => setModalVisible(true)}
        style={styles.menuButton}
      />
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.background}>
          <View style={styles.container}>
            <View style={styles.topBarContainer}>
              <AppButton
                backgroundColor={null}
                border={false}
                size={30}
                icon="close"
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              />
            </View>

            <FlatList
              data={list}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableHighlight
                  underlayColor={colors.mediumGrey}
                  onPress={() => {
                    navigation.navigate(item);
                    setModalVisible(false);
                  }}
                >
                  <AppText
                    style={[
                      styles.listItem,
                      route.name == item ? styles.active : {},
                    ]}
                  >
                    {item.toUpperCase()}
                  </AppText>
                </TouchableHighlight>
              )}
              ItemSeparatorComponent={ListItemSeparator}
            />

            <View style={styles.contactContainer}>
              <AppText style={styles.contactText}>
                Contact Your Account Manager
              </AppText>
              <AppButton title="Message" />
              <AppButton
                backgroundColor={null}
                color={colors.success}
                title="Call Now"
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    marginRight: 10,
  },
  background: {
    flex: 1,
    backgroundColor: colors.white + "dd",
  },
  container: {
    backgroundColor: "white",
    marginRight: 50,
    flex: 1,
    shadowColor: colors.black,
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: { height: 5 },
    elevation: 10,
  },
  topBarContainer: {
    height: 80 + (Platform.OS === "ios" ? Constants.statusBarHeight : 0),
    backgroundColor: colors.secondary,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  closeButton: {
    marginRight: 20,
    marginTop: Platform.OS === "ios" ? Constants.statusBarHeight : 0,
    alignSelf: "flex-end",
  },
  listItem: {
    fontWeight: "bold",
    padding: 15,
  },
  active: {
    color: colors.primary,
    backgroundColor: colors.primary + "11",
  },
  contactContainer: {
    padding: 20,
    marginBottom: 30,
    backgroundColor: "white",
    shadowColor: colors.black,
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: { height: 5 },
    elevation: 10,
  },
  contactText: {
    fontWeight: "bold",
  },
});

export default Menu;
