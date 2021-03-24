import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppButton from "./AppButton";
import AppText from "./AppText";
import Screen from "./Screen";
import { ListItemSeparator } from "../components/lists";

import defaultStyles from "../config/styles";
import colors from "../config/colors";

function MultiplePicker({
  icon,
  items,
  onConfirm,
  selectedItems,
  placeholder,
  width = "100%",
  disabled = false,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [temp, setTemp] = useState(selectedItems);

  const displaySelectedItems = () => {
    let displayString = "";
    selectedItems.forEach((item, index) => {
      if (index < selectedItems.length - 1) {
        displayString += item + ", ";
      } else {
        displayString += item;
      }
    });
    return displayString;
  };

  const temporarySelection = (isActive, item) => {
    let array = [...temp];
    if (isActive) {
      setTemp(array.filter((element) => element !== item));
    } else {
      array.push(item);
      setTemp(array.sort());
    }
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => setModalVisible(true)}
        disabled={disabled}
      >
        <View
          style={[
            styles.container,
            {
              width,
              backgroundColor: disabled
                ? defaultStyles.colors.lightGrey
                : defaultStyles.colors.white,
            },
          ]}
        >
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={24}
              color={defaultStyles.colors.mediumGrey}
              style={styles.icon}
            />
          )}
          {selectedItems && selectedItems.length > 0 ? (
            <AppText style={styles.text}>{displaySelectedItems()}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={disabled ? "#bbb" : defaultStyles.colors.mediumGrey}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <AppButton
            icon="close"
            backgroundColor={null}
            color={colors.primary}
            border={null}
            size={24}
            style={{ alignSelf: "flex-end", marginRight: 20 }}
            onPress={() => {
              setModalVisible(false);
              setTemp(selectedItems);
            }}
          />
          <FlatList
            data={items}
            keyExtractor={(item) => item}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => {
              const isActive = temp && temp.includes(item);
              return (
                <TouchableOpacity
                  style={[styles.listItem, isActive && styles.activeItem]}
                  onPress={() => temporarySelection(isActive, item)}
                >
                  <AppText style={isActive && styles.activeText}>
                    {item}
                  </AppText>
                  {isActive ? (
                    <MaterialCommunityIcons
                      name="check"
                      color={defaultStyles.colors.primary}
                      size={24}
                    />
                  ) : null}
                </TouchableOpacity>
              );
            }}
          />
          <AppButton
            title="Confirm"
            onPress={() => {
              setModalVisible(false);
              onConfirm(temp);
            }}
            style={styles.button}
          />
          <AppButton
            title="Cancel"
            backgroundColor={null}
            color={colors.success}
            onPress={() => {
              setModalVisible(false);
              setTemp(selectedItems);
            }}
            style={styles.button}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    flexDirection: "row",
    padding: 12,
    marginVertical: 7,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
  placeholder: {
    color: "#bbb",
    flex: 1,
  },
  listItem: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activeItem: {
    backgroundColor: colors.primary + "11",
  },
  activeText: {
    fontWeight: "bold",
    color: colors.primary,
  },
  button: {
    marginHorizontal: 20,
  },
});

export default MultiplePicker;
