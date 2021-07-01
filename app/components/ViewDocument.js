import React, { useEffect, useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import WebView from "react-native-webview";

import AppButton from "./AppButton";

import colors from "../config/colors";
import authStorage from "../auth/storage";
import ActivityIndicator from "./ActivityIndicator";

function ViewDocument({ visible, setVisible, uri }) {
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(false);

  const getAuthToken = async () => {
    const authToken = await authStorage.getToken();
    setToken(authToken);
  };

  useEffect(() => {
    getAuthToken();
  }, []);

  return (
    <Modal visible={visible} onRequestClose={() => setVisible(false)}>
      <View style={styles.modalContainer}>
        <ActivityIndicator visible={loading} />
        {token && (
          <WebView
            javaScriptEnabled={true}
            source={{
              uri: uri,
              headers: {
                Authorization: "Bearer " + token,
              },
            }}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            style={styles.webView}
          />
        )}
      </View>
      <AppButton
        icon="close"
        backgroundColor={null}
        border={null}
        color={colors.primary}
        size={30}
        onPress={() => setVisible(false)}
        style={styles.closeButton}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginVertical: 50,
  },
  webView: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 50,
  },
});

export default ViewDocument;
