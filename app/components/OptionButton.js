import React, { useState } from "react";
import { Modal, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

import AppButton from "./AppButton";
import AppSmallButton from "./AppSmallButton";
import AppText from "./AppText";
import { ListItemSeparator } from "./lists";
import Screen from "./Screen";

function OptionButton({
  title = "Sort By",
  color,
  icon = "sort",
  initialValue,
  value,
  queryArray,
  displayArray,
  setItems,
  setPageCurrent,
  setValue,
  handleRefresh,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <AppSmallButton
        title={title}
        color={color}
        icon={icon}
        badge={value !== initialValue}
        onPress={() => setModalVisible(true)}
      />
      <Modal visible={modalVisible} animationType="slide">
        <Screen style={{ padding: 20 }}>
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
          <AppButton
            icon="close"
            title="Close"
            color={null}
            onPress={() => setModalVisible(false)}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default OptionButton;
