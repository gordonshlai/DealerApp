import React from "react";
import { useFormikContext } from "formik";
import { View, StyleSheet, Image, TextInput } from "react-native";

import defaultStyles from "../../config/styles";
import AppErrorMessage from "./AppErrorMessage";

function RegistrationPlateInput({ name, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../../assets/euIdentifier.png")}
          style={{
            height: 80,
            width: 60,
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
          placeholder="ENTER REGISTRATION"
          textAlign="center"
          style={[
            styles.textInput,
            { fontSize: values[name] !== "" ? 40 : 16 },
          ]}
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
    height: 90,
    marginVertical: 7,
  },
  textInput: {
    width: "100%",
    textAlign: "center",
    flex: 1,
  },
});

export default RegistrationPlateInput;
