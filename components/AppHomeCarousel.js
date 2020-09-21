import Carousel from "react-native-snap-carousel";
import React from "react";
import { View, Text, Dimensions } from "react-native";

const _t = ({ item, index }) => {
  return (
    <View
      style={{
        backgroundColor: "black",
        borderRadius: 5,
        height: 250,
        width: 500,
        padding: 50,
        marginLeft: 25,
        marginRight: 25,
      }}
    >
      <Text style={{ fontSize: 30, color: "white" }}>{item.title}</Text>
      <Text style={{ fontSize: 15, color: "white" }}>{item.text}</Text>
      <Text style={{ fontSize: 15, color: "white" }}>{index}</Text>
    </View>
  );
};

const car = [
  {
    title: "Item 1",
    text: "Text 1",
  },
  {
    title: "Item 2",
    text: "Text 2",
  },
  {
    title: "Item 3",
    text: "Text 3",
  },
  {
    title: "Item 4",
    text: "Text 4",
  },
  {
    title: "Item 5",
    text: "Text 5",
  },
];

const deviceWidth = Dimensions.get("window").width;

export default function AppHomeCarousel() {
  return (
    <View>
      <Carousel
        layout={"default"}
        loop={true}
        renderItem={_t}
        data={car}
        itemWidth={deviceWidth * 0.75}
        sliderWidth={deviceWidth}
      />
    </View>
  );
}
