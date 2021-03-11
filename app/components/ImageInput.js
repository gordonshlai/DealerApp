import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";

function ImageInput({ image, onChangeImage }) {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };

  const handlePress = () => {
    if (!image) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) {
        result.url = result.uri;
        onChangeImage(result);
        console.log(result);
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  return (
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
              style={styles.close}
            />
            <Image source={{ uri: image.url }} style={styles.image} />
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
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
  close: {
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
});

export default ImageInput;
