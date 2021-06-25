import React, { useRef, useState } from "react";
import { View, Modal, Dimensions, Platform, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import Constants from "expo-constants";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { Slider } from "react-native-elements";

import AppButton from "./AppButton";
import AppText from "./AppText";
import ActivityIndicator from "./ActivityIndicator";

import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

/**
 *
 * A modal shows the preview of the camera. It only returns a picture in landscape orientation.
 *
 * @param {boolean} visible - the visiblilty of the camera
 * @param {function} setVisible - the function to set the visibility of the camera
 * @param {function} onAccept - the function to be called when the picture taken is accepted by the user
 * @returns
 */
function AppCamera({ visible, setVisible, onAccept }) {
  let { portrait } = useDeviceOrientation();

  const [picture, setPicture] = useState();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [paused, setPaused] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [flash, setFlash] = useState("auto");
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

  const handleFlash = () => {
    if (flash === "auto") {
      setFlash("on");
    } else if (flash === "on") {
      setFlash("off");
    } else {
      setFlash("auto");
    }
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
            zoom={zoom}
            flashMode={flash}
            style={styles.camera}
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
            {!paused && (
              <AppButton
                icon={
                  flash === "auto"
                    ? "flash-auto"
                    : flash === "off"
                    ? "flash-off"
                    : "flash"
                }
                backgroundColor={
                  flash === "off" ? colors.darkGrey : colors.mediumGrey
                }
                size={30}
                onPress={handleFlash}
                style={styles.flashButton}
              />
            )}
            <AppButton
              icon={paused ? "check" : "camera"}
              backgroundColor={paused ? colors.success : colors.mediumGrey}
              size={50}
              onPress={paused ? handleAccept : takePicture}
              style={styles.cameraButton}
            />
            <AppButton
              icon={paused ? "close" : "swap-horizontal"}
              backgroundColor={paused ? colors.danger : colors.darkGrey}
              size={30}
              onPress={paused ? handleCancel : flipcamera}
              style={styles.flipButton}
            />
            {!paused && (
              <Slider
                animateTransitions
                animationType="timing"
                maximumTrackTintColor={colors.lightGrey + "77"}
                maximumValue={1}
                minimumTrackTintColor={colors.primary + "aa"}
                minimumValue={0}
                onValueChange={(value) => setZoom(value)}
                orientation="horizontal"
                step={0.01}
                style={styles.slider}
                thumbStyle={styles.sliderThumb}
                thumbProps={{
                  children: (
                    <MaterialCommunityIcons
                      name="magnify"
                      color="white"
                      size={24}
                      style={{ transform: [{ rotate: "90deg" }] }}
                    />
                  ),
                }}
                trackStyle={styles.sliderTrack}
                value={zoom}
              />
            )}
            {!paused && !portrait && (
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
  camera: {
    height: "100%",
    width: "100%",
  },
  cameraCloseButton: {
    position: "absolute",
    right: 20,
    top: Platform.OS === "ios" ? Constants.statusBarHeight : 0,
  },
  flashButton: {
    position: "absolute",
    left: 40,
    bottom: 40,
    borderColor: "white",
    opacity: 0.5,
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
  slider: {
    position: "absolute",
    width: "80%",
    alignSelf: "center",
    bottom: 120,
    opacity: 0.5,
  },
  sliderThumb: {
    backgroundColor: colors.mediumGrey,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderTrack: {
    height: 10,
    borderRadius: 20,
  },
  portraitOrientation: {
    position: "absolute",
    alignSelf: "center",
    top: Dimensions.get("window").height / 2,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    transform: [{ rotate: "90deg" }],
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
