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

function Picker({
  icon,
  items,
  onSelectItem,
  selectedItem,
  placeholder,
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
              backgroundColor: disabled ? defaultStyles.colors.white : "white",
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
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem}</AppText>
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
          <FlatList
            data={items}
            keyExtractor={(item) => item}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              >
                <AppText>{item}</AppText>
                {selectedItem.toUpperCase() === item.toUpperCase() ? (
                  <MaterialCommunityIcons
                    name="check"
                    color={defaultStyles.colors.primary}
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
});

export default Picker;
