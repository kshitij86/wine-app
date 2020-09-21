import React from "react";
import { View, Text } from "react-native";

import AppHomeCarousel from "./AppHomeCarousel";

export default function AppHome() {
  return (
    <View style={{ backgroundColor: "rebeccapurple" }}>
      <AppHomeCarousel />
    </View>
  );
}
