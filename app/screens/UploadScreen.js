import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";

import defaultStyles from "../config/styles";

/**
 * The screen to show during the uploading progress.
 *
 * @param {function} onDone Function to be called when the done animation is finished
 * @param {number} progress The upload progress. (default = 0)
 * @param {boolean} visible The visibility of the screen. (default = false)
 * @returns
 */
function UploadScreen({ onDone, progress = 0, visible = false }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {progress < 1 ? (
          <>
            <View style={styles.uploadContainer}>
              <LottieView
                autoPlay
                loop
                source={require("../assets/animations/uploading.json")}
                style={styles.upload}
              />
            </View>
            <Progress.Bar
              color={defaultStyles.colors.primary}
              progress={progress}
              width={200}
            />
          </>
        ) : (
          <LottieView
            autoPlay
            loop={false}
            onAnimationFinish={onDone}
            source={require("../assets/animations/done.json")}
            style={styles.done}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  done: {
    width: 150,
  },
  uploadContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  upload: {
    width: 100,
  },
});

export default UploadScreen;
