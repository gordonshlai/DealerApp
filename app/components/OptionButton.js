import React, { useState } from "react";
import { Modal, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

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
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setModalVisible(false)}
      >
        <Screen style={styles.screen}>
          <AppButton
            backgroundColor={null}
            color={colors.success}
            icon="close"
            title="CLOSE"
            style={{ alignSelf: "flex-end" }}
            onPress={() => setModalVisible(false)}
          />
          <FlatList
            data={displayArray}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ListItemSeparator}
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
                  <AppText style={isActive && styles.activeText}>
                    {item.toUpperCase()}
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
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
  },
  listItem: {
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
});

export default OptionButton;
