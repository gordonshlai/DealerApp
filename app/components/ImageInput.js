import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
  Modal,
  Platform,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";

import AppText from "./AppText";
import AppCamera from "./AppCamera";
import AppButton from "./AppButton";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

/**
 * This component controls the input of images into the app.
 *
 * @param {object} image The image object provided by the consumer of the component.
 * @param {function} onChangeImage The function to be called if an image is inputed or deleted.
 */
function ImageInput({ image, onChangeImage }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);

  useEffect(() => {
    requestLibraryPermission();
    requestCameraPermission();
  }, []);

  /**
   * Request for user's permissions to access the media library of the device.
   */
  const requestLibraryPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };

  /**
   * Request for user's permissions to access the camera of the device.
   */
  const requestCameraPermission = async () => {
    const { granted } = await Camera.requestPermissionsAsync();
    if (!granted) alert("You need to enable permission to use the camera.");
  };

  /**
   * Handle the event when the user press on the component.
   * If an image is imported, it will ask the user if they want to delete the selected image.
   * If no image is imported, it will allow the user to choose the way they want to import an image.
   */
  const handlePress = () => {
    if (!image) setModalVisible(true);
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  /**
   * Import the image that the user selected from their media library.
   *
   * It will automatically reduce the quality of the image by 50%.
   */
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) {
        importImage(result);
        setModalVisible(false);
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  /**
   * Import the image to the temporary memory in the app.
   * It will rotate the image to landscape orientation if the image's height is greater than its width.
   *
   * @param {object} image The image object that going to be imported.
   */
  const importImage = async (image) => {
    let tempImage = image;
    if (tempImage.height > tempImage.width) {
      tempImage = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ rotate: -90 }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
    }
    tempImage.url = tempImage.uri;
    const uriParts = tempImage.uri.split(".");
    const fileType = uriParts[uriParts.length - 1];
    tempImage.type = Platform.OS === "android" ? "image/" + fileType : "image";
    onChangeImage(tempImage);
    console.log(tempImage);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
          {!image && (
            <MaterialCommunityIcons
              color={colors.mediumGrey}
              name="camera"
              size={40}
            />
          )}
          {image && (
            <>
              <MaterialCommunityIcons
                color={colors.mediumGrey}
                name="close"
                size={24}
                style={styles.deleteImage}
              />
              <Image source={{ uri: image.url }} style={styles.image} />
            </>
          )}
        </View>
      </TouchableWithoutFeedback>

      <AppCamera
        visible={cameraVisible}
        setVisible={setCameraVisible}
        onAccept={importImage}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Pressable
          style={styles.modalBackground}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <AppButton
              icon="close"
              backgroundColor={null}
              color={colors.danger}
              border={null}
              size={30}
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <AppButton
                  icon="camera"
                  backgroundColor={null}
                  color={colors.mediumGrey}
                  size={60}
                  border={null}
                  onPress={() => {
                    setCameraVisible(true);
                    setModalVisible(false);
                  }}
                />
                <AppText>Take a Picture</AppText>
              </View>
              <View style={styles.buttonContainer}>
                <AppButton
                  icon="image"
                  backgroundColor={null}
                  color={colors.secondary}
                  size={60}
                  border={null}
                  onPress={() => {
                    selectImage();
                  }}
                />
                <AppText>Select From Gallery</AppText>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 15,
    height: 90,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
    width: 150,
  },
  deleteImage: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
    backgroundColor: colors.lightGrey + "aa",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    height: "40%",
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...defaultStyles.shadow,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonContainer: {
    width: "50%",
    alignItems: "center",
  },
});

export default ImageInput;
