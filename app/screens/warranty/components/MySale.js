import dayjs from "dayjs";
import React, { memo, useState } from "react";
import { View, StyleSheet, Pressable, Modal, FlatList } from "react-native";

import AppButton from "../../../components/AppButton";
import AppText from "../../../components/AppText";
import { ListItem, ListItemSeparator } from "../../../components/lists";
import Registration from "../../../components/Registration";
import ViewDocument from "../../../components/ViewDocument";

import colors from "../../../config/colors";
import defaultStyles from "../../../config/styles";
import settings from "../../../config/settings";

/**
 * Component showcasing the information of a sale.
 *
 * @param {object} data An object containing the information of the sale
 * @param {function} onOpenPress Function to be called when the "Open" button is pressed
 */
function MySale({ data, onOpenPress }) {
  const [pressing, setPressing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [invoiceVisible, setInvoiceVisible] = useState(false);
  const [scheduleVisible, setScheduleVisible] = useState(false);

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
        <AppText>Plan Ref</AppText>
        <AppText style={styles.bold}>{data.id}</AppText>
      </View>

      <View style={styles.textContainer}>
        <AppText>Cover:</AppText>
        <AppText style={styles.bold}>{data.cover_type}</AppText>
      </View>

      <View
        style={[
          styles.textContainer,
          { borderBottomWidth: 1, borderColor: colors.mediumGrey },
        ]}
      >
        <AppText>Booked On:</AppText>
        <AppText style={styles.bold}>
          {dayjs(data.created_at).format("DD/MM/YYYY")}
        </AppText>
      </View>

      <View style={[styles.textContainer, { marginTop: 5 }]}>
        <AppText style={styles.bold}>Cost</AppText>
        <AppText style={styles.price}>£{data.cost_total}</AppText>
      </View>
    </Pressable>
  );

  /**
   * The options to perform on this component.
   */
  const options = [
    {
      title: "Open",
      onPress: onOpenPress,
    },
    {
      title: "View Invoice",
      onPress: () => setInvoiceVisible(true),
    },
    {
      title: "View Schedule",
      onPress: () => setScheduleVisible(true),
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
          <View style={styles.cardContainer}>{card()}</View>
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
      <ViewDocument
        visible={invoiceVisible}
        setVisible={setInvoiceVisible}
        uri={`${settings.apiUrl}api/car/warranty/sale/pdf/${data.id}`}
      />
      <ViewDocument
        visible={scheduleVisible}
        setVisible={setScheduleVisible}
        uri={`${settings.apiUrl}api/car/warranty/sale/plan-book/${data.id}`}
      />
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
  cardContainer: {
    marginHorizontal: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
});

export default memo(MySale, arePropsEqual);
