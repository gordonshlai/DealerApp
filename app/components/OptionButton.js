import React, { useState } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

import AppButton from "./AppButton";
import AppText from "./AppText";
import { ListItemSeparator } from "./lists";

import colors from "../config/colors";
import defaultStyle from "../config/styles";

/**
 *
 * @param {string} title The title of the button. (default = "Sort By")
 * @param {string} backgroundColor The background color of the button
 * @param {string} color The text color of the button
 * @param {boolean} border True for displaying the border of the button, else false.
 * @param {boolean} icon The name of the icon, referring to https://icons.expo.fyi/ (default = "sort-variant")
 * @param {string} size The size of the icon, referring to https://icons.expo.fyi/ (default = "sort-variant")
 * @param {string} modalTitle The title of the modal.
 * @param {string} initialValue The initial value when nothing is selected. Used to determine whether to show the badge.
 * @param {string} value The value selected.
 * @param {array} queryArray The array containing the values to be send to the api.
 * @param {array} displayArray The array containing the values to be displayed in this component.
 * @param {function} onSelect The function to be called when an item is selected.
 */
function OptionButton({
  title = "Sort By",
  backgroundColor,
  color,
  border,
  icon = "sort-variant",
  size,
  modalTitle,
  initialValue,
  value,
  queryArray,
  displayArray,
  onSelect,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <AppButton
        title={title}
        backgroundColor={backgroundColor}
        color={color}
        border={border}
        icon={icon}
        size={size}
        badge={value !== initialValue}
        onPress={() => setModalVisible(true)}
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
              <AppText style={styles.title}>{modalTitle}</AppText>
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
              data={displayArray}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const query = queryArray[displayArray.indexOf(item)];
                const isActive = value === query;
                return (
                  <TouchableOpacity
                    style={[styles.listItem, isActive && styles.activeItem]}
                    onPress={() => {
                      setModalVisible(false);
                      if (isActive) return;
                      onSelect(query);
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
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
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
    flexDirection: "row",
    height: 80 + (Platform.OS === "ios" ? Constants.statusBarHeight : 0),
    backgroundColor: colors.secondary,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    marginLeft: 20,
    marginTop: Platform.OS === "ios" ? Constants.statusBarHeight : 0,
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 24,
  },
  closeButton: {
    marginRight: 20,
    marginTop: Platform.OS === "ios" ? Constants.statusBarHeight : 0,
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
  flatList: {
    padding: 10,
  },
  bottomCloseButton: {
    marginRight: 20,
    marginBottom: Platform.OS === "ios" ? 40 : 20,
    alignSelf: "flex-end",
  },
});

export default OptionButton;
