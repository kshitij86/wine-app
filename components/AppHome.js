import React from "react";
import { Alert, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { APPTHEME_COLOR, APPTEXT_COLOR, APPNAME } from "../globals/styles";
import CameraView from "./CameraView";
import VideoPreview from "./VideoPreview";
import HeaderTransparentLogo from "./HeaderTransparentLogo";
import RecordedWinesList from "./RecordedWinesList";
import { genID } from "../globals/workers";
import * as MediaLibrary from "expo-media-library";

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
          headerStyle: { backgroundColor: APPTHEME_COLOR },
          // headerRight: () => (
          //   <Button
          //     title="wines"
          //     onPress={() => {
          //       navigation.navigate("recordedWines");
          //     }}
          //   />
          // ),
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
          headerRight: () => (
            <Button
              title="save"
              style={{ backgroundColor: APPTEXT_COLOR, color: APPTHEME_COLOR }}
              onPress={async () => {
                await MediaLibrary.saveToLibraryAsync(route.params.fileUri);
                Alert.alert(APPNAME, "Done! Find this in your gallery!");
              }}
            />
          ),
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
