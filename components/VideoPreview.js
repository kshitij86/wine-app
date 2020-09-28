import React from "react";
import { Dimensions } from "react-native";
import { Video } from "expo-av";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

export default function VideoPreview({ route, navigation }) {
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
