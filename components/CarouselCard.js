import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

export default function CarouselCard({ route, navigation }) {
  const { fileUri } = route.params;
  return (
    <View style={styles.superView}>
      <Text>{fileUri}</Text>
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
