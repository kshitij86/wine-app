import React, { useEffect } from "react";
import { View, Button, Alert } from "react-native";
import { Video } from "expo-av";
import * as MediaLibrary from "expo-media-library";

import { deviceHeight, deviceWidth } from "../globals/constants";
import { APPNAME } from "../globals/styles";

export default function VideoPreview({ route, navigation }) {
  const { fileUri } = route.params;
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ paddingRight: deviceWidth * 0.05 }}>
          <Button
            title="save to gallery"
            onPress={async () => {
              await MediaLibrary.saveToLibraryAsync(route.params.fileUri);
              Alert.alert(APPNAME, "Saved! Find this in your gallery!");
            }}
          />
        </View>
      ),
    });
  }, []);
  return (
    <Video
      source={{ uri: fileUri }}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode="cover"
      shouldPlay
      isLooping
      useNativeControls={true}
      style={{ flex: 1, width: deviceWidth, height: deviceHeight }}
    />
  );
}
