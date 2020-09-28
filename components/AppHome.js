import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import CameraView from "./CameraView";
import VideoPreview from "./VideoPreview";

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="camera"
        component={CameraView}
        options={{
          title: "zed",
          headerStyle: {
            backgroundColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="videoPreview"
        component={VideoPreview}
        options={{
          title: "Preview",
          headerStyle: {
            opacity: 0.5,
            backgroundColor: "transparent",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default function AppHome() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
