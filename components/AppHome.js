import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { APPTHEME_COLOR, APPTEXT_COLOR, APPNAME } from "../globals/styles";
import CameraView from "./CameraView";
import VideoPreview from "./VideoPreview";
import HeaderTransparentLogo from "./HeaderTransparentLogo";
import RecordedWinesList from "./RecordedWinesList";

// TODO: Add save to gallery

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="cameraView"
        component={CameraView}
        options={({ navigation, route }) => ({
          headerTitle: () => <HeaderTransparentLogo />,
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
        })}
      />
      <Stack.Screen
        name="recordedWines"
        component={RecordedWinesList}
        options={{
          title: "Your Wines",
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
