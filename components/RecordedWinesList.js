import React, { Component } from "react";
import { View, Text } from "react-native";
import * as FileSystem from "expo-file-system";

export default class RecordedWinesList extends Component {
  state = { fileList: {} };

  async componentDidMount() {
    await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}videos`)
      .then((result) => {
        result.forEach((item) => {
          this.state.fileList.push(item.toString());
        });
      })
      .catch((err) => console.log(err));

    console.log(Object.prototype.toString.call(this.state.fileList[0]));
  }

  render() {
    return (
      <View>
        {this.state.fileList === null ? (
          <Text>fail</Text>
        ) : (
          <Text>success</Text>
        )}
      </View>
    );
  }
}
