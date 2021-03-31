import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import Constants from "expo-constants";

import AppButton from "./AppButton";
import { ListItemSeparator } from "./lists";

import routes from "../navigation/routes";
import colors from "../config/colors";
import defaultStyle from "../config/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
              renderItem={({ item }) => {
                const isActive = route.name == item;
                return (
                  <TouchableOpacity
                    style={[styles.listItem, isActive && styles.activeItem]}
                    onPress={() => {
                      navigation.navigate(item);
                      setModalVisible(false);
                    }}
                  >
                    <AppText style={styles.text}>{item.toUpperCase()}</AppText>
                    {isActive && (
                      <MaterialCommunityIcons
                        name="check"
                        color={colors.primary}
                        size={20}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
              ItemSeparatorComponent={ListItemSeparator}
              style={styles.flatList}
            />

            <View style={styles.contactContainer}>
              <AppText style={styles.contactText}>
                Contact Your Account Manager
              </AppText>
              <AppButton
                title="Go to Messages"
                onPress={() => {
                  navigation.navigate(routes.MESSAGES);
                  setModalVisible(false);
                }}
              />
            </View>

            <AppButton
              backgroundColor={null}
              color={colors.danger}
              border={false}
              size={30}
              icon="close"
              onPress={() => setModalVisible(false)}
              style={styles.bottomCloseButton}
            />
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
    backgroundColor: colors.white + "aa",
  },
  container: {
    backgroundColor: "white",
    marginRight: 50,
    flex: 1,
    ...defaultStyle.shadow,
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activeItem: {
    backgroundColor: colors.lightGrey + "77",
  },
  text: {
    color: colors.secondary,
  },
  contactContainer: {
    padding: 20,
    marginBottom: 30,
    backgroundColor: "white",
    ...defaultStyle.shadow,
  },
  contactText: {
    fontWeight: "bold",
  },
  flatList: {
    padding: 10,
  },
  bottomCloseButton: {
    marginRight: 20,
    marginBottom: Platform.OS === "ios" ? 40 : 20,
    alignSelf: "flex-end",
  },
});

export default Menu;
