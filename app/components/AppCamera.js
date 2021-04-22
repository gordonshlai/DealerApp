import React, { useRef, useState } from "react";
import { View, Modal, Dimensions, Platform, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import Constants from "expo-constants";

import AppButton from "./AppButton";
import AppText from "./AppText";
import ActivityIndicator from "./ActivityIndicator";

import colors from "../config/colors";

function AppCamera({ visible, setVisible, onAccept }) {
  const [picture, setPicture] = useState();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const camera = useRef();

  const takePicture = async () => {
    try {
      setLoading(true);
      const preview = await camera.current.takePictureAsync();
      setPicture(preview);
      console.log(preview);
      setLoading(false);
      camera.current.pausePreview();
      setPaused(true);
    } catch (error) {
      console.log("Error taking picture", error);
    }
  };

  const handleAccept = () => {
    onAccept(picture);
    setPaused(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setPaused(false);
    camera.current.resumePreview();
  };

  const flipcamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
        setPaused(false);
      }}
    >
      <View style={styles.background}>
        <View
          style={Platform.OS === "android" ? styles.androidCameraContainer : {}}
        >
          <ActivityIndicator visible={loading} />
          <Camera
            ref={camera}
            type={type}
            ratio="16:9"
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <AppButton
              icon="close"
              backgroundColor={null}
              color={colors.primary}
              border={null}
              size={30}
              onPress={() => {
                setVisible(false);
                setPaused(false);
              }}
              style={styles.cameraCloseButton}
            />
            <AppButton
              icon={paused ? "check" : "camera"}
              backgroundColor={paused ? colors.success : colors.mediumGrey}
              size={50}
              onPress={paused ? handleAccept : takePicture}
              style={styles.cameraButton}
            />
            <AppButton
              icon={paused ? "close" : "swap-horizontal"}
              size={30}
              backgroundColor={paused ? colors.danger : colors.darkGrey}
              onPress={paused ? handleCancel : flipcamera}
              style={styles.flipButton}
            />
            {Platform.OS === "ios" && !paused && (
              <AppText style={styles.portraitOrientation}>
                Please turn on 'Portrait Orientation Lock'
              </AppText>
            )}
            {!paused && (
              <AppText style={styles.thisWayUp}>
                {"^   This Way Up.   ^"}
              </AppText>
            )}
          </Camera>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "black",
  },
  androidCameraContainer: {
    width: Dimensions.get("window").width,
    height: (Dimensions.get("window").width * 16) / 9,
  },
  cameraCloseButton: {
    position: "absolute",
    right: 20,
    top: Platform.OS === "ios" ? Constants.statusBarHeight : 0,
  },
  cameraButton: {
    position: "absolute",
    borderColor: "white",
    alignSelf: "center",
    bottom: 30,
    opacity: 0.5,
  },
  flipButton: {
    position: "absolute",
    right: 40,
    bottom: 40,
    borderColor: "white",
    opacity: 0.5,
  },
  portraitOrientation: {
    position: "absolute",
    bottom: 120,
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
  },
  thisWayUp: {
    position: "absolute",
    right: -40,
    top: Dimensions.get("window").height / 2,
    color: colors.primary,
    fontWeight: "bold",
    transform: [{ rotate: "90deg" }],
  },
});

export default AppCamera;
