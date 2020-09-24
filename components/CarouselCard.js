import React from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";

const colors = ["red", "green", "yellow", "blue"];

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

export default function CarouselCard(props) {
  return (
    <View style={styles.superView}>
      <ImageBackground
        resizeMethod={"auto"}
        resizeMode={"cover"}
        style={styles.cardImage}
        transition={true}
        source={{
          uri:
            "https://images.unsplash.com/photo-1600750605723-70a6b933107a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
        }}
      ></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "black",
    padding: 12,
  },
  cardImage: {
    width: deviceWidth * 0.95,
    height: deviceHeight * 0.8,
    borderRadius: 5,
    overflow: "hidden",
  },
  superView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
  },
});
