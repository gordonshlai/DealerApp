import React, { useContext, useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import WebView from "react-native-webview";

import AppButton from "./AppButton";
import ActivityIndicator from "./ActivityIndicator";

import colors from "../config/colors";
import AuthContext from "../auth/context";

/**
 * A component used to show a PDF on the screen.
 *
 * @param {boolean} visible The visibility of the modal
 * @param {function} setVisible The function to be called for setting the visibility of the modal
 * @param {string} uri The uri to retrieve the PDF file.
 */
function ViewDocument({ visible, setVisible, uri }) {
  const { authToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  return (
    <Modal visible={visible} onRequestClose={() => setVisible(false)}>
      <View style={styles.modalContainer}>
        <ActivityIndicator visible={loading} />
        <WebView
          javaScriptEnabled={true}
          source={{
            uri: uri,
            headers: {
              Authorization: "Bearer " + authToken,
            },
          }}
          onLoadEnd={() => setLoading(false)}
          style={styles.webView}
        />
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
