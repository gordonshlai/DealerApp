import React, { useState } from "react";
import { Modal, ScrollView, View, StyleSheet, Platform } from "react-native";
import { useFormikContext } from "formik";
import { CheckBox } from "react-native-elements";

import AppButton from "../AppButton";
import AppErrorMessage from "./AppErrorMessage";
import AppText from "../AppText";
import Screen from "../Screen";

import colors from "../../config/colors";
import defaultStyles from "../../config/styles";

/**
 * A field of a form, consist of an icon, check box and an error message.
 * @module components/forms/AppFormCheckBox
 * @param {string} name - the name of the field defined by the consumer of this component
 * @param {} otherProps - other properties to add to the check box component
 */
const AppFormCheckBox = ({ name, ...otherProps }) => {
  const { setFieldValue, errors, touched, values } = useFormikContext();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <CheckBox
          checked={values[name]}
          checkedColor="#0F0"
          containerStyle={styles.checkBoxContainer}
          onIconPress={() => setFieldValue(name, !values[name])}
          onPress={() => setModalVisible(true)}
          size={30}
          textStyle={{ color: colors.lightGrey }}
          title="I accept the TERMS AND CONDITIONS"
          uncheckedColor={colors.lightGrey}
          {...otherProps}
        />
        <AppErrorMessage error={errors[name]} visible={touched[name]} />
      </View>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <Screen style={styles.modalContainer}>
            <ScrollView>
              <AppText style={styles.modalTitle}>Terms and Conditions</AppText>
              <AppText style={styles.modalContent}>
                The Warrantywise dealer warranty platform and Wise Dealer App
                has an optional function for those that wish to engage in
                ‘dealer to dealer’ trade sales. The platform can introduce
                dealers to each other who wish to transact their own separate
                trade sales. Any such sales are a direct transaction between the
                dealers involved. It is the responsibility of each dealer to
                undertake all relevant due diligence and checks in respect of
                any counter-party, product, vehicle, interaction or transaction
                that it enters into via the dealer warranty platform or
                otherwise. Warrantywise make no recommendations including
                without limitation in respect of any dealer, product or vehicle
                and accept no liability or responsibility for the dealers,
                product, vehicle, transfer of ownership, price, payment,
                transactions, or completion of a sale in any way. Nothing in
                this disclaimer will operate to exclude or restrict the
                liability of Warrantywise in respect of death or personal injury
                resulting from its negligence or anything for which it is
                unlawful to exclude liability.
              </AppText>
              <View style={styles.buttonsContainer}>
                <AppButton
                  title="Close"
                  backgroundColor={null}
                  color={colors.success}
                  onPress={() => setModalVisible(false)}
                  style={styles.button}
                />
                <AppButton
                  backgroundColor={
                    values[name] ? colors.danger : colors.success
                  }
                  border={null}
                  title={values[name] ? "Decline" : "Accept"}
                  onPress={() => {
                    setFieldValue(name, !values[name]);
                    setModalVisible(false);
                  }}
                  style={styles.button}
                />
              </View>
            </ScrollView>
          </Screen>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  checkBoxContainer: {
    backgroundColor: null,
    borderWidth: 0,
    margin: 0,
    padding: 0,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.white + "aa",
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    margin: 10,
    flex: 1,
    ...defaultStyles.shadow,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: Platform.isPad ? 50 : 28,
    color: colors.secondary,
  },
  modalContent: {
    marginVertical: 30,
    marginHorizontal: 10,
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: Platform.isPad ? 22 : 14,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "45%",
  },
});

export default AppFormCheckBox;
