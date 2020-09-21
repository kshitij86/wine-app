import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Component imports
import AppHome from "./components/AppHome";
import HeaderLogoTitle from "./components/HeaderLogoTitle";
import AppHomeCarousel from "./components/AppHomeCarousel";

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ZedPLay"
      component={AppHomeCarousel}
      options={{ headerTitle: () => <HeaderLogoTitle /> }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
