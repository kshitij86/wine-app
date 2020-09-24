import Carousel from "react-native-snap-carousel";
import React from "react";
import { View, Dimensions } from "react-native";

import CarouselCard from "../components/CarouselCard";
import { car } from "../data/car_data";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

const _render_cards = () => {
  return <CarouselCard />;
};

export default function AppHomeCarousel() {
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        layout={"stack"}
        loop={true}
        renderItem={_render_cards}
        data={car}
        itemWidth={deviceWidth}
        itemHeight={deviceHeight}
        sliderWidth={deviceWidth}
      />
    </View>
  );
}
