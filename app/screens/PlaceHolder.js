import React from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../components/AppButton";

import useAuth from "../auth/useAuth";

function PlaceHolder(props) {
  const { authToken, logOut } = useAuth();
  return (
    <View style={styles.container}>
      <AppButton
        title="Log Out"
        onPress={() => {
          logOut();
          console.log("logout");
        }}
      ></AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default PlaceHolder;
