import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StatusBar,
  Button,
} from "react-native";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Foundation,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

// TODO: Hide status bar in camera view
// TODO: Make video record only 6 seconds and autoclose

export default class CameraView extends Component {
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.front,
    loading: false,
    recording: false,
    recordDone: false,
  };

  async componentDidMount() {
    this.getPermissionAsync();
  }

  /* ----- Handlers ----- */

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { aStatus } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const { cStatus } = await Permissions.askAsync(Permissions.CAMERA);
    if (
      status !== "granted" ||
      aStatus !== "granted" ||
      cStatus !== "granted"
    ) {
      console.log("Some permission not granted !");
    }
    this.setState({ hasPermission: status === "granted" });
  };

  // Switch front/back camera
  handleCameraType = () => {
    const { cameraType } = this.state;
    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.front
          ? Camera.Constants.Type.back
          : Camera.Constants.Type.front,
    });
  };

  // Take a photo
  takePicture = async () => {
    if (this.camera) {
      this.setState({ loading: true });
      let photo = await this.camera.takePictureAsync();
      this.setState({ loading: false });
      Alert.alert("zed", photo.uri);
    }
  };

  // Pick an image
  pickVideo = async () => {
    this.setState({ loading: true });
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });
    this.setState({ loading: false });
    if (result.uri !== "") {
      Alert.alert("zed", result.uri);
    }
  };

  render() {
    const { hasPermission } = this.state;
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar hidden={true} />
          <Camera
            style={{ flex: 1, alignContent: "flex-end" }}
            type={this.state.cameraType}
            ref={(ref) => {
              this.camera = ref;
            }}
          >
            <Button
              title="Go to preview"
              onPress={() => this.props.navigation.navigate("videoPreview")}
            />
            <ActivityIndicator
              style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
              }}
              size={50}
              animating={this.state.loading}
              color="#fff"
            />
            <View
              opacity={0.5}
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 20,
                backgroundColor: "transparent",
              }}
            >
              {this.state.recording ? (
                <TouchableOpacity
                  style={{
                    alignSelf: "flex-end",
                    alignItems: "center",
                    backgroundColor: "transparent",
                  }}
                  disabled={true}
                >
                  <Ionicons
                    name="ios-photos"
                    style={{ color: "#fff", fontSize: 40 }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    alignSelf: "flex-end",
                    alignItems: "center",
                    backgroundColor: "transparent",
                  }}
                  onPress={() => {
                    this.pickVideo();
                  }}
                >
                  <Ionicons
                    name="ios-photos"
                    style={{ color: "#fff", fontSize: 40 }}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
                onPress={async () => {
                  if (!this.state.recording) {
                    this.setState({ recording: true });
                    let video = await this.camera.recordAsync({
                      quality: "1080p",
                    });
                    console.log(video);
                  } else {
                    this.setState({ recording: false });
                    await this.camera.stopRecording();
                  }
                }}
              >
                {this.state.recording === true ? (
                  <FontAwesome
                    name="stop"
                    style={{ color: "#fff", fontSize: 40 }}
                  />
                ) : (
                  <Foundation
                    name="record"
                    style={{ color: "#fff", fontSize: 60 }}
                  />
                )}
              </TouchableOpacity>

              {this.state.recording ? (
                <TouchableOpacity
                  style={{
                    alignSelf: "flex-end",
                    alignItems: "center",
                    backgroundColor: "transparent",
                  }}
                  disabled={true}
                >
                  <MaterialCommunityIcons
                    name="camera-switch"
                    style={{ color: "#fff", fontSize: 40 }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    alignSelf: "flex-end",
                    alignItems: "center",
                    backgroundColor: "transparent",
                  }}
                  onPress={() => {
                    this.handleCameraType();
                  }}
                >
                  <MaterialCommunityIcons
                    name="camera-switch"
                    style={{ color: "#fff", fontSize: 40 }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </Camera>
        </View>
      );
    }
  }
}
