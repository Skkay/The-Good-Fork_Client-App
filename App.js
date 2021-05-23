import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from 'react-native-toast-message'

import { AuthContext } from "./src/components/AuthContext";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import MenuScreen from "./src/screens/MenuScreen";
import FoodScreen from "./src/screens/FoodScreen";
import DrinkScreen from "./src/screens/DrinkScreen";
import OrderScreen from "./src/screens/OrderScreen";
import OrderTypeScreen from "./src/screens/OrderTypeScreen";
import MyOrdersScreen from "./src/screens/MyOrdersScreen";
import ReservationScreen from "./src/screens/ReservationScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

const App = () => {
  const Stack = createStackNavigator();
  const [isConnected, setConnected] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const authContext = useMemo(() => ({
    // Remove stored token
    signOut: async () => {
      try {
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("userTokenExp");
        await AsyncStorage.removeItem("userId");
        await setConnected(false);
      } catch (e) {
        console.log(e);
      }
    },
  }), []);

  // Try to retrieve stored user token
  useEffect(() => {
    setTimeout(async () => {
      try {
        const userTokenExp = await AsyncStorage.getItem("userTokenExp");
        const userToken = await AsyncStorage.getItem("userToken");
        if (userTokenExp > Math.floor(Date.now() / 1000)) {
          console.log("Token still valid for", userTokenExp - Math.floor(Date.now() / 1000), "seconds");
          setConnected(true);
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  }, []);

  // Loading indicator
  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {isConnected ? (
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} initialParams={{ toastType: "", toastExtra: {} }} />
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="Food" component={FoodScreen} />
            <Stack.Screen name="Drink" component={DrinkScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
            <Stack.Screen name="OrderType" component={OrderTypeScreen} />
            <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
            <Stack.Screen name="Reservation" component={ReservationScreen} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login">
              {() => <LoginScreen setConnected={setConnected} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        )}
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
