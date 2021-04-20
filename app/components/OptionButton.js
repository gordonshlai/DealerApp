import React, { useState } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

import colors from "../config/colors";
import defaultStyle from "../config/styles";

import AppButton from "./AppButton";
import AppText from "./AppText";
import { ListItemSeparator } from "./lists";
import Screen from "./Screen";

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
        <View style={styles.background}>
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
        </View>
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
