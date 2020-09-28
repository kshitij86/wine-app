import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function TimerAnim() {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        ref={(animation) => {
          this.animation = animation;
        }}
        style={{
          width: 50,
          height: 50,
          opacity: 0,
        }}
        source={require("../assets/animations/timer.json")}
        // OR find more Lottie files @ https://lottiefiles.com/featured
        // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
