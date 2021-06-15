import dayjs from "dayjs";
import React, { memo, useState } from "react";
import { View, StyleSheet, Pressable, Modal, FlatList } from "react-native";

import AppButton from "../../../components/AppButton";
import AppText from "../../../components/AppText";
import { ListItem, ListItemSeparator } from "../../../components/lists";
import Registration from "../../../components/Registration";

import colors from "../../../config/colors";
import defaultStyles from "../../../config/styles";

function Quote({ data, onOpenQuotePress, onDeleteQuotePress }) {
  const [pressing, setPressing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const card = () => (
    <Pressable
      style={[styles.container, !pressing && styles.shadow]}
      onPress={() => setModalVisible(true)}
      onPressIn={() => setPressing(true)}
      onPressOut={() => setPressing(false)}
    >
      <View style={[styles.textContainer, { marginBottom: 10 }]}>
        <AppText style={styles.bold}>
          {data.make} {data.model}
        </AppText>
        {data.registration && <Registration registration={data.registration} />}
      </View>

      <View style={styles.textContainer}>
        <AppText>Cover:</AppText>
        <AppText style={styles.bold}>{data.cover}</AppText>
      </View>

      <View
        style={[
          styles.textContainer,
          { borderBottomWidth: 1, borderColor: colors.mediumGrey },
        ]}
      >
        <AppText>Quoted On:</AppText>
        <AppText style={styles.bold}>
          {dayjs(data.created_at).format("DD/MM/YYYY")}
        </AppText>
      </View>

      <View style={[styles.textContainer, { marginTop: 5 }]}>
        <AppText style={styles.bold}>Price (12 months)</AppText>
        <AppText style={styles.price}>£{data.price12}</AppText>
      </View>
    </Pressable>
  );

  const options = [
    {
      title: "Open Quote",
      onPress: onOpenQuotePress,
    },
    {
      title: "Quote Document",
      onPress: () => console.log("Quote Document"),
    },
    {
      title: "Delete Quote",
      onPress: onDeleteQuotePress,
    },
  ];

  return (
    <>
      {card()}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalBackground}>
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
        </View>
      </Modal>
    </>
  );
}
const arePropsEqual = (prevProps, nextProps) => {
  return prevProps.label === nextProps.label;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: 5,
    padding: 15,
  },
  shadow: {
    ...defaultStyles.shadow,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  price: {
    borderTopWidth: 1,
    borderColor: colors.mediumGrey,
    color: colors.primary,
    fontSize: 22,
    fontWeight: "bold",
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

export default memo(Quote, arePropsEqual);
