import React, { Component } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import AppHome from "./components/AppHome";

// Lock screen orientation, no landscape
export default class App extends Component {
  async componentDidMount() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  }
  render() {
    return <AppHome />;
  }
}
