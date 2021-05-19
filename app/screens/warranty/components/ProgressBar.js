import React from "react";
import { Dimensions } from "react-native";
import { View, StyleSheet } from "react-native";
import Icon from "../../../components/Icon";
import colors from "../../../config/colors";
import routes from "../../../navigation/routes";

const progress = [
  {
    icon: "car",
    route: routes.CAR_WARRANTY_VEHICLE_DETAIL_1,
  },
  {
    icon: "car-hatchback",
    route: routes.CAR_WARRANTY_VEHICLE_DETAIL_2,
  },
  {
    icon: "book-open",
    route: routes.CAR_WARRANTY_COVER_LEVEL,
  },
  {
    icon: "screwdriver",
    route: routes.CAR_WARRANTY_CUSTOMISE_COVER,
  },
  {
    icon: "calendar-text",
    route: routes.CAR_WARRANTY_DETAIL,
  },
  {
    icon: "account",
    route: routes.CAR_WARRANTY_CUSTOMER_DETAIL,
  },
  {
    icon: "cart",
    route: routes.CAR_WARRANTY_PAYMENT_DETAIL,
  },
];

const iconSize = 30;
const progressBarWidth = Dimensions.get("window").width;

const ProgressBar = ({ route }) => {
  const currentIndex = progress.findIndex((item) => item.route === route.name);
  return (
    <View style={styles.progressBarContainer}>
      {progress.map((item, index) => {
        return (
          <Icon
            name={item.icon}
            size={iconSize}
            backgroundColor={index <= currentIndex ? colors.primary : "white"}
            iconColor={index <= currentIndex ? "white" : colors.darkGrey}
            key={index}
          />
        );
      })}
      <View style={styles.progressBarUnderlineContainer}>
        {progress.map((item, index) => {
          return index === 0 ? null : (
            <View
              style={{
                backgroundColor:
                  index <= currentIndex ? colors.primary : "white",
                height: 7,
                width: (progressBarWidth - 60 - iconSize) / 6,
              }}
              key={index}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: progressBarWidth,
    zIndex: 1,
  },
  progressBarUnderlineContainer: {
    position: "absolute",
    flexDirection: "row",
    width: progressBarWidth,
    left: 30 + iconSize / 2,
    alignItems: "center",
    zIndex: -1,
  },
});

export default ProgressBar;
