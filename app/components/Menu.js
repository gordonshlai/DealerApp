import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Pressable,
} from "react-native";
import Constants from "expo-constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppButton from "./AppButton";
import AppText from "./AppText";
import { ListItemSeparator } from "./lists";

import routes from "../navigation/routes";
import colors from "../config/colors";
import defaultStyles from "../config/styles";

/**
 * The list of routes to be rendered in the menu.
 */
const list = [
  routes.HOME,
  routes.TRADE,
  routes.INVENTORY,
  routes.WARRANTY,
  routes.MESSAGES,
  routes.ACCOUNT,
];

/**
 * The alternative top layer navigation of the bottom tab bar.
 * Appears on the top right hand corner of every screen.
 */
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
        <Pressable
          style={styles.background}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.container}>
            <View style={styles.topBarContainer}>
              <AppButton
                backgroundColor={null}
                border={false}
                color={colors.primary}
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
          </View>
        </Pressable>
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
    ...defaultStyles.shadow,
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
    ...defaultStyles.shadow,
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
