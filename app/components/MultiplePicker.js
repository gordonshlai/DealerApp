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

/**
 * The picker component that can handle multiple selections.
 *
 * @param {string} icon The name of the icon, referring to https://icons.expo.fyi/
 * @param {array} items The array of options to pick from.
 * @param {function} onConfirm The function to be called when the confirm button is pressed.
 * @param {function} selectedItems The function to be called when an item is selected.
 * @param {string} placeholder The string to be rendered as the placeholder when no item is selected.
 * @param {number|string} width The width of the component. (default = '100%')
 * @param {boolean} disabled Option to disable the component.
 */
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

  /**
   * Concatenate the selected items into a string with commas between each item.
   * @returns The string to be displayed.
   */
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

  /**
   * Make the array of selected items before the confirm button is pressed.
   *
   * @param {boolean} isActive true when the item is selected. else false.
   * @param {string} item The item selected
   */
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
            style={styles.closeButton}
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
  closeButton: {
    alignSelf: "flex-end",
    marginRight: 20,
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
