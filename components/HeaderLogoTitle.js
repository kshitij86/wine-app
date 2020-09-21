import React from "react";
import { View, Image } from "react-native";

export default function HeaderLogoTitle() {
  return (
    <Image
      style={{ width: 150, height: 50, resizeMode: "cover" }}
      source={require("../assets/Logo.png")}
    />
  );
}
