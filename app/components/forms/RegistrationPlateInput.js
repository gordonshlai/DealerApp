import React from "react";
import { useFormikContext } from "formik";
import { View, StyleSheet, Image, TextInput } from "react-native";

import defaultStyles from "../../config/styles";
import AppErrorMessage from "./AppErrorMessage";

function RegistrationPlateInput({ name, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../../assets/euIdentifier.png")}
          style={{
            height: 90,
            width: 67,
            resizeMode: "contain",
            flex: 0,
            backgroundColor: "black",
          }}
        />
        <TextInput
          onBlur={() => setFieldTouched(name)}
          onChangeText={(text) => setFieldValue(name, text)}
          value={values[name]}
          autoCapitalize="characters"
          autoCorrect={false}
          placeholder="XX00 XXX"
          textAlign="center"
          style={styles.textInput}
          {...otherProps}
        />
      </View>
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 10,
    borderColor: defaultStyles.colors.mediumGrey,
    borderWidth: 5,
    overflow: "hidden",
    height: 100,
    marginVertical: 7,
  },
  textInput: {
    width: "100%",
    fontSize: 45,
    textAlign: "center",
    backgroundColor: "white",
    flex: 1,
  },
});

export default RegistrationPlateInput;
