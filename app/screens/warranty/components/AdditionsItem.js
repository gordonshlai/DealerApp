import React, { useState } from "react";
import { StyleSheet, Pressable, Image } from "react-native";

import AppText from "../../../components/AppText";
import Icon from "../../../components/Icon";

import colors from "../../../config/colors";
import defaultStyles from "../../../config/styles";

function AdditionsItem({ image, text, selected, disabled, tooltip, onPress }) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [pressing, setPressing] = useState(false);
  return (
    <>
      <Pressable
        style={[
          styles.container,
          selected && styles.selected,
          disabled && styles.disabled,
          !pressing && styles.shadow,
          pressing && !disabled && styles.pressing,
        ]}
        onPress={onPress}
        onPressIn={() => setPressing(true)}
        onLongPress={() => setTooltipVisible(true)}
        onPressOut={() => {
          setTooltipVisible(false);
          setPressing(false);
        }}
      >
        <Image source={image} style={styles.image} />
        <AppText style={styles.text}>{text}</AppText>
        {selected && (
          <Icon
            name="check"
            size={25}
            backgroundColor={colors.primary}
            style={styles.icon}
          />
        )}
      </Pressable>
      {tooltipVisible && <AppText style={styles.tooltip}>{tooltip}</AppText>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  selected: {
    opacity: 1,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  pressing: {
    backgroundColor: colors.lightGrey,
  },
  shadow: {
    ...defaultStyles.shadow,
  },
  image: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  text: {
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    right: -7,
    top: -7,
  },
  tooltip: {
    position: "absolute",
    top: 0,
    left: 10,
    padding: 10,
    backgroundColor: "white",
    fontWeight: "bold",
    width: "70%",
    zIndex: 1,
    ...defaultStyles.shadow,
  },
});

export default AdditionsItem;
