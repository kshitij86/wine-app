import React, { useEffect } from "react";
import { View, Alert } from "react-native";
import { Video } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Sharing from "expo-sharing";


import { deviceHeight, deviceWidth } from "../globals/constants";
import { APPNAME } from "../globals/styles";

export default function VideoPreview({ route, navigation }) {
  const { fileUri } = route.params;

  const saveToGallery = async () => {
    await MediaLibrary.saveToLibraryAsync(route.params.fileUri);
    Alert.alert(APPNAME, "Saved! Find this in your gallery!");
  };

  const shareVideo = async () => {
    let canShare = false;

    await Sharing.isAvailableAsync().then((result) => (canShare = result));
    if (canShare) {
      await Sharing.shareAsync(fileUri, { dialogTitle: "Share this wine!" });
    } else {
      Alert.alert(APPNAME, "Cannot share on your device!");
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ paddingRight: deviceWidth * 0.05 }}>
          <TouchableOpacity
            onPress={() => {
              shareVideo();
            }}
          >
            <AntDesign name="sharealt" size={30} color="white" />
          </TouchableOpacity>
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
      useNativeControls={false}
      style={{ flex: 1, width: deviceWidth, height: deviceHeight }}
    />
  );
}
