import React from "react";
import Svg, { Path } from "react-native-svg";

/**
 *
 * @param {string} color - the color of the icon
 * @param {number} size - the size of the icon
 */
function AccountIcon({ color, size }) {
  return (
    <Svg
      id="Profile_Icon"
      data-name="Profile Icon"
      xmlns="http://www.w3.org/2000/svg"
      width="19.579"
      height="19.579"
      viewBox="0 0 19.579 19.579"
    >
      <Path
        id="Combined_Shape"
        data-name="Combined Shape"
        d="M.791,19.579A1.2,1.2,0,0,1,0,18.708c.421-5.191,4.634-7.831,9.77-7.831,5.208,0,9.487,2.494,9.806,7.832a.747.747,0,0,1-.817.87ZM5.439,4.35A4.35,4.35,0,1,1,9.789,8.7,4.35,4.35,0,0,1,5.439,4.35Z"
        transform="translate(0 0)"
        fill={color}
      />
    </Svg>
  );
}

export default AccountIcon;
