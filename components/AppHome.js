import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { APPTHEME_COLOR, APPTEXT_COLOR, APPNAME } from "../globals/styles";
import CameraView from "./CameraView";
import VideoPreview from "./VideoPreview";
import HeaderTransparentLogo from "./HeaderTransparentLogo";
import SavedVideos from "./SavedVideos";

// TODO: Add modal on AppHome
// Show recorded videos

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="cameraView"
        component={CameraView}
        options={({ navigation, route }) => ({
          headerTitleContainerStyle: {
            alignContent: "flex-start",
          },
          headerTitle: () => <HeaderTransparentLogo />,
          headerStyle: { backgroundColor: APPTHEME_COLOR },
        })}
      />
      <Stack.Screen
        name="videoPreview"
        component={VideoPreview}
        options={(navigation, route) => ({
          title: "Preview",
          headerStyle: {
            backgroundColor: APPTHEME_COLOR,
          },
          headerTintColor: APPTEXT_COLOR,
          headerTitleStyle: { color: APPTEXT_COLOR },
          gestureDirection: "vertical-inverted",
        })}
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
