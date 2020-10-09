import { StyleSheet } from "react-native";
import { deviceWidth, deviceHeight } from "../globals/constants";

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  timer: {
    paddingTop: deviceHeight * 0.15,
    paddingRight: deviceWidth * 0.3,
    paddingLeft: deviceWidth * 0.95,
    paddingBottom: deviceHeight * 0.85,
    width: 20,
    height: 20,
  },
  noPermissions: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  noPermissionsText: {
    color: "#7f7f7f",
    fontSize: 25,
    textAlign: "center"
  },
  grantPermission: {
    color: "#1CC625",
    fontSize: 20
  }
})

module.exports = {
  APPNAME: "wine",
  APPTHEME_COLOR: "#1CC625",
  APPTEXT_COLOR: "#FFF",
  styles: styles
};
