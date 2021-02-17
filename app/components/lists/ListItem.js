import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import AppText from "../AppText";
import colors from "../../config/colors";

function ListItem({
  image,
  IconComponent,
  title,
  time,
  subTitle,
  unread,
  onPress,
  renderRightActions,
  renderLeftActions,
}) {
  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
    >
      <TouchableHighlight underlayColor={colors.mediumGrey} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            <View style={styles.row}>
              <AppText style={styles.title} numberOfLines={1}>
                {title}
              </AppText>
              <AppText
                style={[
                  styles.time,
                  unread
                    ? { color: colors.primary, fontWeight: "bold" }
                    : { color: colors.mediumGrey },
                ]}
              >
                {time}
              </AppText>
            </View>
            <View style={styles.row}>
              {subTitle && (
                <AppText style={styles.subTitle} numberOfLines={1}>
                  {subTitle}
                </AppText>
              )}
              {unread && (
                <View style={styles.unreadBadge}>
                  <AppText style={styles.unreadText}>{unread}</AppText>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    resizeMode: "contain",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  time: {
    fontSize: 12,
  },
  subTitle: {
    color: colors.mediumGrey,
    flex: 1,
  },
  unreadBadge: {
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: colors.primary,
    paddingVertical: 2,
    paddingHorizontal: 7,
    marginLeft: 10,
    justifyContent: "center",
  },
  unreadText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ListItem;
