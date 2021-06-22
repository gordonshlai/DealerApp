import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";

import AppButton from "./AppButton";
import AppText from "./AppText";

import colors from "../config/colors";

/**
 *
 * The date time picker.
 *
 * @param {string} icon - the icon to be shown on the component
 * @param {datetime} selectedDate - the date that is selected and is shown on the component
 * @param {function} onSelectDate - the function to be called when a date is selected
 * @param {string} placeholder - the string to be shown when the selected date is empty
 * @param {number|string} width - the width of the component (default = "100%")
 * @param {boolean} disabled - disable the component (default = false)
 * @returns
 */
function AppDateTimePicker({
  icon,
  selectedDate,
  onSelectDate,
  placeholder,
  width = "100%",
  disabled = false,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(
    selectedDate ? new Date(dayjs(selectedDate)) : new Date()
  );
  const [show, setShow] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() =>
          Platform.OS === "ios" ? setModalVisible(true) : setShow(true)
        }
        disabled={disabled}
      >
        <View
          style={[
            styles.container,
            {
              width,
              backgroundColor: disabled ? colors.lightGrey : colors.white,
            },
          ]}
        >
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={24}
              color={colors.mediumGrey}
              style={styles.icon}
            />
          )}
          {selectedDate ? (
            <AppText style={styles.text}>
              {dayjs(selectedDate).format("DD/MM/YYYY")}
            </AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}
          <MaterialCommunityIcons
            name="calendar-edit"
            size={20}
            color={disabled ? "#bbb" : colors.mediumGrey}
          />
        </View>
      </TouchableWithoutFeedback>
      {Platform.OS === "ios" ? (
        <Modal visible={modalVisible} animationType="fade">
          <View style={styles.modal}>
            <DateTimePicker
              value={value}
              mode="date"
              display="spinner"
              onChange={(event, date) => {
                setValue(date);
              }}
            />
            <AppButton
              title="OK"
              onPress={() => {
                setModalVisible(false);
                onSelectDate(value);
              }}
            />
            <AppButton
              icon="cancel"
              backgroundColor={null}
              color={colors.success}
              title="CANCEL"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </Modal>
      ) : (
        show && (
          <DateTimePicker
            value={value}
            mode="date"
            onChange={(event, date) => {
              const currentDate = date || value;
              setShow(false);
              setValue(currentDate);
              onSelectDate(currentDate);
            }}
          />
        )
      )}
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
  modal: {
    padding: 20,
    backgroundColor: colors.lightGrey,
    flex: 1,
    justifyContent: "center",
  },
});

export default AppDateTimePicker;
