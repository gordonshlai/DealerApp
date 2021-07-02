import React, { useState } from "react";
import { View, StyleSheet, Pressable, Modal, FlatList } from "react-native";

import AppButton from "../../../components/AppButton";
import AppText from "../../../components/AppText";
import { ListItem, ListItemSeparator } from "../../../components/lists";

import colors from "../../../config/colors";
import defaultStyles from "../../../config/styles";

const permissions = ["LOCKED", "ADMIN", "FULL"];

function User({ data, onSetAdminPress, onDeletePress }) {
  const [pressing, setPressing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const card = () => (
    <Pressable
      style={[styles.container, pressing && styles.pressing]}
      onPress={() => data.permissions !== "1" && setModalVisible(true)}
      onPressIn={() => setPressing(true)}
      onPressOut={() => setPressing(false)}
    >
      <View>
        <AppText style={styles.name}>{data.name}</AppText>
        <AppText style={styles.email}>{data.email}</AppText>
      </View>
      <AppText
        style={{
          fontWeight: "bold",
          color:
            data.permissions === "0"
              ? "crimson"
              : data.permissions === "1"
              ? colors.primary
              : colors.darkGrey,
        }}
      >
        {permissions[data.permissions]}
      </AppText>
    </Pressable>
  );

  const options = [
    {
      title: "Set as ADMIN",
      onPress: () => onSetAdminPress(data.id),
    },
    {
      title: "Remove User",
      onPress: () => onDeletePress(data.id),
    },
  ];

  return (
    <>
      {card()}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackground}
          onPress={() => setModalVisible(false)}
        >
          <View style={{ marginHorizontal: 10 }}>{card()}</View>
          <View style={styles.modalContainer}>
            <AppButton
              icon="close"
              backgroundColor={null}
              color={colors.danger}
              border={null}
              size={30}
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            />
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ListItem
                  title={item.title}
                  onPress={() => {
                    setModalVisible(false);
                    item.onPress();
                  }}
                />
              )}
              ItemSeparatorComponent={ListItemSeparator}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    ...defaultStyles.shadow,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pressing: {
    backgroundColor: colors.lightGrey,
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.secondary,
  },
  email: {
    fontStyle: "italic",
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.white + "aa",
  },
  modalContainer: {
    height: "60%",
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...defaultStyles.shadow,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
});

export default User;
