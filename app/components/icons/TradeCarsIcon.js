import React from "react";
import Svg, { Path } from "react-native-svg";

function TradeCarsIcon({ color, size }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25.704"
      height="20.19"
      viewBox="0 0 25.704 20.19"
    >
      <Path
        id="Icon_ionic-md-swap"
        data-name="Icon ionic-md-swap"
        d="M7.726,13.988,2.25,19.474l5.476,5.481V20.842h9.623V18.1H7.726Zm19.229-2.741L21.479,5.766V9.879H11.856V12.62h9.623v4.114Z"
        transform="translate(-1.75 -5.266)"
        fill={color}
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
      />
    </Svg>
  );
}
export default TradeCarsIcon;
