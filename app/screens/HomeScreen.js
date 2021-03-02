import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../components/AppText";

function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <AppText>Home</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
