import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { APPTHEME_COLOR, APPTEXT_COLOR } from "../assets/globals/styles";
import CameraView from "./CameraView";
import VideoPreview from "./VideoPreview";
import HeaderTransparentLogo from "./HeaderTransparentLogo";

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="cameraView"
        component={CameraView}
        options={{
          headerTitle: () => <HeaderTransparentLogo />,
          headerStyle: { backgroundColor: APPTHEME_COLOR },
        }}
      />
      <Stack.Screen
        name="videoPreview"
        component={VideoPreview}
        options={{
          title: "Preview",
          headerStyle: {
            backgroundColor: APPTHEME_COLOR,
          },
          headerTintColor: APPTEXT_COLOR,
          headerTitleStyle: { color: APPTEXT_COLOR },
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
