import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import FoodScreen from "./screens/FoodScreen";
import DrinkScreen from "./screens/DrinkScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderTypeScreen from "./screens/OrderTypeScreen";
import MyOrdersScreen from "./screens/MyOrdersScreen";
import ReservationScreen from "./screens/ReservationScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} initialParams={{ toastType: "", toastExtra: {} }} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Food" component={FoodScreen} />
      <Stack.Screen name="Drink" component={DrinkScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="OrderType" component={OrderTypeScreen} />
      <Stack.Screen name="Reservation" component={ReservationScreen} />
    </Stack.Navigator>
  );
}

const MyOrdersStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MyOrders">
      <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator, MyOrdersStackNavigator };
