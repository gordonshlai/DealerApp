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
 * A component for the user to pick from a list of options.
 *
 * @param {string} icon The name of the icon, referring to https://icons.expo.fyi/
 * @param {array} items The list of options
 * @param {function} onSelectItem The function to be called when an item is selected
 * @param {string} selectedItem The selected item (default = "")
 * @param {string} placeholder The string to be displayed as the placeholder when there is no item selected. (default = "Please Select")
 * @param {string|number} width The width of the component
 * @param {boolean} disabled Disabling the component. (default = false)
 */
function Picker({
  icon,
  items,
  onSelectItem,
  selectedItem = "",
  placeholder = "Please Select",
  width = "100%",
  disabled = false,
}) {
  const [modalVisible, setModalVisible] = useState(false);

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
              size={14}
              color={defaultStyles.colors.mediumGrey}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.toString()}</AppText>
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
            onPress={() => setModalVisible(false)}
          />
          <FlatList
            data={items}
            keyExtractor={(item) => item.toString()}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => {
              const isActive = item === selectedItem;
              return (
                <TouchableOpacity
                  style={[styles.listItem, isActive && styles.activeItem]}
                  onPress={() => {
                    setModalVisible(false);
                    onSelectItem(item);
                  }}
                >
                  <AppText style={isActive && styles.activeText}>
                    {item}
                  </AppText>
                  {selectedItem.toString().toUpperCase() ===
                  item.toString().toUpperCase() ? (
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
});

export default Picker;
