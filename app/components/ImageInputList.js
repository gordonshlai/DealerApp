import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import ImageInput from "./ImageInput";

/**
 * A horizontal scrollable imageInput components.
 *
 * @param {array} images The array of images objects to be displayed.
 * @param {function} onRemoveImage Function to be called when the user removes an image from the images array.
 * @param {function} onAddImage Function to be called when the user adds an image to the images array.
 */
function ImageInputList({ images = [], onRemoveImage, onAddImage }) {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {images.map((image, index) => (
            <View key={index} style={styles.image}>
              <ImageInput
                image={image}
                onChangeImage={() => onRemoveImage(image)}
              />
            </View>
          ))}
          <ImageInput onChangeImage={(image) => onAddImage(image)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});

export default ImageInputList;
