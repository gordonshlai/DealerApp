import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Pressable } from "react-native";

import AppText from "./AppText";
import defaultStyles from "../config/styles";
import colors from "../config/colors";

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
          style={{ marginLeft: 10 }}
        />
      </Pressable>
      {toolTipVisible && <AppText style={styles.toolTip}>{message}</AppText>}
    </>
  );
}

const styles = StyleSheet.create({
  toolTip: {
    position: "absolute",
    right: 10,
    padding: 10,
    backgroundColor: "white",
    fontWeight: "bold",
    width: "50%",
    ...defaultStyles.shadow,
  },
});

export default ToolTip;
