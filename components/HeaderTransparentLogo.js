import React from "react";
import { View, Image } from "react-native";

export default function HeaderTransparentLogo() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        style={{ width: 90, height: 150 }}
        source={require("../assets/wine1.png")}
        resizeMode="contain"
      />
    </View>
  );
}
