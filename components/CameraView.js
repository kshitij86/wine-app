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
} from "react-native";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Foundation,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { APPTHEME_COLOR } from "../assets/globals/styles";

// TODO: Hide status bar in camera view
// TODO: Make video record only 6 seconds and autoclose

export default class CameraView extends Component {
  video = null;
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
    loading: false,
    recording: false,
    recordDone: false,
  };

  async componentDidMount() {
    this.getPermissionAsync();
  }

  /* ----- Handlers ----- */

  // Handle permissions on start
  getPermissionAsync = async () => {
    const { status: cameraRollStatus } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const { status: audioStatus } = await Permissions.askAsync(
      Permissions.AUDIO_RECORDING
    );
    const { status: cameraStatus } = await Permissions.askAsync(
      Permissions.CAMERA
    );
    this.setState({
      hasPermission:
        cameraStatus === "granted" &&
        audioStatus === "granted" &&
        cameraRollStatus === "granted",
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

  /*    return recording ? this.stopRecording() : this.startRecording(); */

  startRecording = async () => {
    if (!this.camera) return;

    this.setState({ recording: true });
    const record = await this.camera.recordAsync({});
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}videos/`,
      { intermediates: true }
    );

    await FileSystem.moveAsync({
      from: record.uri,
      to: `${FileSystem.documentDirectory}videos/6.mov`,
    }).then(() => {
      this.props.navigation.navigate("videoPreview", {
        fileUri: `${FileSystem.documentDirectory}videos/6.mov`,
      });
    });
  };

  stopRecording = async () => {
    if (!this.camera) return;

    await this.camera.stopRecording();
    this.setState({ recording: false });
  };

  toggleRecording() {
    const { recording } = this.state;
    if (!recording) {
      this.startRecording();
      setTimeout(() => {
        this.stopRecording();
      }, 6000);
    }
  }

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
          <StatusBar backgroundColor={APPTHEME_COLOR} hidden={false} />
          <Camera
            style={{ flex: 1, alignContent: "flex-end" }}
            type={this.state.cameraType}
            ref={(ref) => {
              this.camera = ref;
            }}
          >
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
            {/* Fucked up LottieView, remove*/}
            {/* {this.state.recording === true ? <TimerAnim /> : null} */}
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
                onPress={() => {
                  this.toggleRecording();
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
                    this.setState({
                      cameraType:
                        this.state.cameraType === Camera.Constants.Type.front
                          ? Camera.Constants.Type.back
                          : Camera.Constants.Type.front,
                    });
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

/*if (!this.state.recording) {
                    this.setState({ recording: true });
                    this.video = await this.camera.recordAsync({
                      quality: "1080p",
                    });
                  } else {
                    this.setState({ recording: false });
                    await this.camera.stopRecording();
                    console.log(this.video);
                    this.props.navigation.navigate("videoPreview");
                  } */
