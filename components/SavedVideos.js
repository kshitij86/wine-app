import React, { Component } from "react";
import { View, Text } from "react-native";
import * as FileSystem from "expo-file-system";

export default class RecordedWinesList extends Component {
  state = { fileList: {}, fname: "" };

  async componentDidMount() {
    await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}videos`)
      .then((result) => {
        result.forEach((item) => {
          this.state.fileList.push(item.toString());
        });
      })
      .catch((err) => console.log(err));

    this.state.fname = Object.prototype.toString.call(this.state.fileList[0]);
    console.log(Object.prototype.toString.call(this.state.fileList[0]));
  }

  render() {
    return (
      <View style={{ backgroundColor: "black" }}>
        {this.state.fileList === null ? (
          <Text>fail</Text>
        ) : (
          <Text>{this.state.fname}</Text>
        )}
      </View>
    );
  }
}
