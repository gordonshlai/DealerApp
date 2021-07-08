import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Pressable } from "react-native";

import AppText from "./AppText";

import defaultStyles from "../config/styles";
import colors from "../config/colors";

/**
 * A pressable component that shows a tooltip.
 *
 * @param {string} message The message to display
 */
function ToolTip({ message }) {
  const [toolTipVisible, setToolTipVisible] = useState(false);
  return (
    <>
      <Pressable
        onPressIn={() => setToolTipVisible(true)}
        onPressOut={() => setToolTipVisible(false)}
      >
        <MaterialCommunityIcons
          name="comment-question"
          color={colors.mediumGrey}
          size={18}
          style={styles.icon}
        />
      </Pressable>
      {toolTipVisible && <AppText style={styles.toolTip}>{message}</AppText>}
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
  },
  toolTip: {
    position: "absolute",
    right: 10,
    bottom: 70,
    padding: 10,
    backgroundColor: "white",
    fontWeight: "bold",
    width: "70%",
    zIndex: 1,
    ...defaultStyles.shadow,
  },
});

export default ToolTip;
