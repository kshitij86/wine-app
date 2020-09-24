import React from "react";
import { View, Image, Text } from "react-native";

/*<Image
        style={{ width: 150, height: 50, resizeMode: "cover" }}
        source={require("../assets/Logo.png")}
      /> */

export default function HeaderLogoTitle() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 34, color: "white" }}>ZED</Text>
    </View>
  );
}
