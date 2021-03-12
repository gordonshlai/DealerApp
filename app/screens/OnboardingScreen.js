import React, { useContext } from "react";
import { View, StyleSheet, Image, Button } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import AuthContext from "../auth/context";
import colors from "../config/colors";
import routes from "../navigation/routes";

const Dots = ({ selected }) => {
  let backgroundColor;

  backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";

  return (
    <View
      style={{ width: 5, height: 5, marginHorizontal: 3, backgroundColor }}
    />
  );
};
const Skip = ({ ...props }) => <Button title="Skip" color="black" {...props} />;
const Next = ({ ...props }) => <Button title="Next" color="black" {...props} />;
const Done = ({ ...props }) => <Button title="Done" color="black" {...props} />;

function OnboardingScreen() {
  const { setIsFirstLaunch } = useContext(AuthContext);
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => setIsFirstLaunch(false)}
      onDone={() => setIsFirstLaunch(false)}
      pages={[
        {
          backgroundColor: colors.secondary,
          image: <Image source={require("../assets/favicon.png")} />,
          title: "Onboarding 1",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: colors.white,
          image: <Image source={require("../assets/euIdentifier.png")} />,
          title: "Onboarding 2",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: colors.warning,
          image: <Image source={require("../assets/euIdentifier.png")} />,
          title: "Onboarding 3",
          subtitle: "Done with React Native Onboarding Swiper",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default OnboardingScreen;
