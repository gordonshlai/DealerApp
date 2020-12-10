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

import defaultStyles from "../config/styles";

function AppDateTimePicker({
  icon,
  selectedDate,
  onSelectDate,
  placeholder,
  width = "100%",
  disabled = false,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(selectedDate ? selectedDate : new Date());
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
            color={disabled ? "#bbb" : defaultStyles.colors.mediumGrey}
          />
        </View>
      </TouchableWithoutFeedback>
      {Platform.OS === "ios" ? (
        <Modal visible={modalVisible} animationType="fade">
          <View style={styles.modal}>
            <DateTimePicker
              value={value}
              mode="date"
              onChange={(event, date) => {
                setValue(date);
              }}
            />
            <AppButton
              title="ok"
              onPress={() => {
                setModalVisible(false);
                onSelectDate(value);
              }}
            />
            <AppButton
              icon="cancel"
              color={null}
              title="cancel"
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
    padding: 15,
    marginVertical: 10,
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
    backgroundColor: defaultStyles.colors.lightGrey,
    flex: 1,
    justifyContent: "center",
  },
});

export default AppDateTimePicker;
