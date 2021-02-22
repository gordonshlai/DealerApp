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
  setValue,
  handleRefresh,
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
            keyExtractor={(item) => item}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                  setModalVisible(false);
                  const query = queryArray[displayArray.indexOf(item)];
                  if (value === query) return;
                  setValue(query);
                  handleRefresh();
                }}
              >
                <AppText>{item.toUpperCase()}</AppText>
                {value === queryArray[displayArray.indexOf(item)] ? (
                  <MaterialCommunityIcons
                    name="check"
                    color={colors.primary}
                    size={24}
                  />
                ) : null}
              </TouchableOpacity>
            )}
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
  },
});

export default OptionButton;
