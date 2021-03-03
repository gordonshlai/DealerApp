import React from "react";
import Svg, { Path, G, Circle } from "react-native-svg";
import colors from "../../config/colors";

function MessagesIcon({ color = colors.mediumGrey, size }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ? size : "20.19"}
      height={size ? size : "20.19"}
      viewBox="0 0 20.19 20.19"
    >
      <G id="Group_187" data-name="Group 187" transform="translate(1 1)">
        <Path
          id="Icon_feather-message-square"
          data-name="Icon feather-message-square"
          d="M22.69,16.627a2.021,2.021,0,0,1-2.021,2.021H8.542L4.5,22.69V6.521A2.021,2.021,0,0,1,6.521,4.5H20.669A2.021,2.021,0,0,1,22.69,6.521Z"
          transform="translate(-4.5 -4.5)"
          fill={color}
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
        <G
          id="Group_99"
          data-name="Group 99"
          transform="translate(3.521 5.867)"
        >
          <Circle
            id="Oval"
            cx="1.133"
            cy="1.133"
            r="1.133"
            fill={color === "white" ? colors.lightGrey : "#fff"}
          />
          <Circle
            id="Oval-2"
            data-name="Oval"
            cx="1.133"
            cy="1.133"
            r="1.133"
            transform="translate(4.53)"
            fill={color === "white" ? colors.lightGrey : "#fff"}
          />
          <Circle
            id="Oval-3"
            data-name="Oval"
            cx="1.133"
            cy="1.133"
            r="1.133"
            transform="translate(9.061)"
            fill={color === "white" ? colors.lightGrey : "#fff"}
          />
        </G>
      </G>
    </Svg>
  );
}

export default MessagesIcon;
