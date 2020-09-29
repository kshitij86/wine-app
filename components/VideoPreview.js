import React from "react";
import { Video } from "expo-av";
import { deviceHeight, deviceWidth } from "../globals/constants";

export default function VideoPreview({ route }) {
  const { fileUri } = route.params;
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
