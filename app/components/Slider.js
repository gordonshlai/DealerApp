import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import Constants from "expo-constants";

import colors from "../config/colors";
import AppText from "./AppText";
import AppButton from "./AppButton";

function Slider({ images, height, width }) {
  const [active, setActive] = useState(0);
  const [imageZoomVisible, setImageZoomVisible] = useState(false);

  const bigSlider = useRef();
  const thumbnail = useRef();
  const imageZoom = useRef();

  useEffect(() => {}, [active]);

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width - 0.5
    );
    if (slide != active) {
      setActive(slide);
      thumbnail.current.scrollTo({ x: (slide - 2) * (width / 5) });
    }
  };

  const handleLeftPress = () => {
    if (active > 0) {
      setActive(active - 1);
    }
  };

  const handleRightPress = () => {
    if (active < images.length - 1) {
      setActive(active + 1);
    }
  };

  return (
    <>
      <View style={{ height: height * 0.8, width }}>
        <ScrollView
          ref={bigSlider}
          pagingEnabled
          horizontal
          onScroll={change}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          style={{ height, width }}
        >
          {images.map((image, index) => (
            <TouchableWithoutFeedback
              onPress={() => setImageZoomVisible(true)}
              key={index}
            >
              <Image
                source={{ uri: image.url }}
                style={{ height: height * 0.8, width }}
              />
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
        <Text style={styles.pagination}>
          {active >= images.length
            ? images.length + " / " + images.length
            : active + 1 + " / " + images.length}
        </Text>
      </View>

      {images.length > 1 && (
        <View
          style={{
            height: height / 5,
            width,
          }}
        >
          <ScrollView
            ref={thumbnail}
            pagingEnabled
            horizontal
            centerContent
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            style={{
              height: height / 5,
              width,
            }}
          >
            {images.map((image, index) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  bigSlider.current.scrollTo({ x: index * width });
                }}
                key={index}
              >
                <Image
                  source={{ uri: image.url }}
                  style={{
                    height: "100%",
                    width: width / 5,
                  }}
                />
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        </View>
      )}
      <Modal
        visible={imageZoomVisible}
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setImageZoomVisible(false)}
      >
        {images && (
          <ImageZoom
            cropHeight={Dimensions.get("window").height}
            cropWidth={Dimensions.get("window").width}
            imageHeight={Dimensions.get("window").height}
            imageWidth={Dimensions.get("window").width}
            enableSwipeDown={true}
            onSwipeDown={() => setImageZoomVisible(false)}
            swipeDownThreshold={230}
          >
            <Image
              style={{
                height: Dimensions.get("window").height,
                width: Dimensions.get("window").width,
                resizeMode: "contain",
              }}
              source={{
                uri: images[active].url,
              }}
            />
          </ImageZoom>
        )}
        <AppText style={styles.imageZoomPagination}>
          {active >= images.length
            ? images.length + " / " + images.length
            : active + 1 + " / " + images.length}
        </AppText>
        <AppButton
          icon="chevron-left"
          backgroundColor={colors.mediumGrey}
          border={false}
          size={30}
          style={styles.leftButton}
          onPress={handleLeftPress}
        />
        <AppButton
          icon="chevron-right"
          backgroundColor={colors.mediumGrey}
          border={false}
          size={30}
          style={styles.rightButton}
          onPress={handleRightPress}
        />
        <AppButton
          icon="close"
          backgroundColor={null}
          color={colors.primary}
          border={false}
          size={30}
          onPress={() => setImageZoomVisible(false)}
          style={styles.closeButton}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  pagination: {
    backgroundColor: "#aaaaaaaa",
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    padding: 5,
    borderRadius: 5,
    overflow: "hidden",
    position: "absolute",
    bottom: 10,
    right: 10,
    alignSelf: "center",
  },
  leftButton: {
    position: "absolute",
    opacity: 0.5,
    paddingVertical: 10,
    bottom: 85,
  },
  rightButton: {
    position: "absolute",
    alignSelf: "flex-end",
    opacity: 0.5,
    paddingVertical: 10,
    bottom: 85,
  },
  imageZoomPagination: {
    backgroundColor: "#aaaaaa88",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    padding: 5,
    borderRadius: 5,
    bottom: 100,
    overflow: "hidden",
    position: "absolute",
    alignSelf: "center",
  },
  closeButton: {
    position: "absolute",
    top: Constants.statusBarHeight,
    right: 20,
    alignSelf: "center",
  },
});

export default Slider;
