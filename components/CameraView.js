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
  ToastAndroid,
} from "react-native";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Foundation,
} from "@expo/vector-icons";
import CountDown from "react-native-countdown-component";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { APPTEXT_COLOR, APPTHEME_COLOR } from "../globals/styles";
import { deviceWidth, deviceHeight } from "../globals/constants";
import { genID } from "../globals/workers";

export default class CameraView extends Component {
  video = null;
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
    loading: false,
    recording: false,
    recordDone: false,
    modalVisible: false,
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

  startRecording = async () => {
    if (!this.camera) return;

    this.setState({ recording: true });
    const record = await this.camera.recordAsync({});
    let videoUri = `${FileSystem.documentDirectory}videos/${genID()}.mov`;
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}videos/`,
      { intermediates: true }
    );

    await FileSystem.moveAsync({
      from: record.uri,
      to: videoUri,
    }).then(() => {
      this.props.navigation.navigate("videoPreview", {
        fileUri: videoUri,
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

  showNullToast = () => {
    ToastAndroid.show("Nothing selected to share", ToastAndroid.SHORT);
  };

  // Pick an video to share
  pickVideo = async () => {
    this.setState({ loading: true });
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });
    this.setState({ loading: false });
    if (result.cancelled === false) {
      this.props.navigation.navigation("videoPreview", {
        fileUri: result.uri,
      });
    } else {
      this.showNullToast();
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
          <StatusBar
            barStyle="light-content"
            backgroundColor={APPTHEME_COLOR}
            hidden={false}
          />
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
            {this.state.recording ? (
              <View
                style={{
                  paddingTop: deviceHeight * 0.15,
                  paddingRight: deviceWidth * 0.3,
                  paddingLeft: deviceWidth * 0.95,
                  paddingBottom: deviceHeight * 0.85,
                  width: 20,
                  height: 20,
                }}
              >
                <CountDown
                  until={6}
                  size={20}
                  digitStyle={{ backgroundColor: APPTEXT_COLOR }}
                  digitTxtStyle={{ color: APPTHEME_COLOR }}
                  timeToShow={["S"]}
                />
              </View>
            ) : (
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
            )}
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
