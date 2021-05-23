import React from "react";
import { StyleSheet, Pressable } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import FoodScreen from "./screens/FoodScreen";
import DrinkScreen from "./screens/DrinkScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderTypeScreen from "./screens/OrderTypeScreen";
import MyOrdersScreen from "./screens/MyOrdersScreen";
import ReservationScreen from "./screens/ReservationScreen";
import Icon from './components/svg/Icon';

const Stack = createStackNavigator();

const MainStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        initialParams={{ toastType: "", toastExtra: {} }} 
        options={{ 
          title: "Accueil",
          headerLeft: () => (
            <Pressable style={styles.drawerIcon} onPress={() => navigation.openDrawer()}>
              <Icon name="Bars" height="28" width="28" />
            </Pressable>
          ) 
        }} 
      />
      <Stack.Screen name="Menu" component={MenuScreen} options={{ title: "Nos menus" }} />
      <Stack.Screen name="Food" component={FoodScreen} options={{ title: "Nos plats" }} />
      <Stack.Screen name="Drink" component={DrinkScreen} options={{ title: "Nos boissons" }} />
      <Stack.Screen name="Order" component={OrderScreen} options={{ title: "Commander" }} />
      <Stack.Screen name="OrderType" component={OrderTypeScreen} options={{ title: "Commander" }} />
      <Stack.Screen name="Reservation" component={ReservationScreen} options={{ title: "Réserver" }} />
    </Stack.Navigator>
  );
}

const MyOrdersStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MyOrders">
      <Stack.Screen name="MyOrders" component={MyOrdersScreen} options={{ title: "Mes commandes" }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerIcon: {
    marginLeft: 15,
    padding: 5
  }
});

export { MainStackNavigator, MyOrdersStackNavigator };
