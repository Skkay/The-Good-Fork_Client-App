import React, { useEffect, useMemo, useReducer } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import jwt_decode from "jwt-decode";
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

const App = () => {
  const Stack = createStackNavigator();

  const initialLoginState = {
    isLoading: true,
    userEmail: null,
    userToken: null,
    userId: null,
  };

  const loginReducer = (pervState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...pervState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...pervState,
          userEmail: action.email,
          userToken: action.token,
          userId: action.id,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...pervState,
          userEmail: null,
          userToken: null,
          userId: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...pervState,
          userEmail: action.email,
          userToken: action.token,
          userId: action.id,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({

    // Send API request to sign in and store token using AsyncStorage
    signIn: async (userEmail, password) => {
      let userToken = null;
      await axios({
        method: "POST",
        url: "http://192.168.1.18/3proj_api/public/api/login",
        withCredentials: true,
        data: {
          email: userEmail,
          password: password,
        },
      })
        .then((res) => {
          userToken = res.data.token;
          userTokenExp = jwt_decode(userToken).exp.toString();
          userId = res.data.data.id.toString();
          console.log("connected\nToken:", userToken, "// ID:", userId);
          try {
            AsyncStorage.setItem("userToken", userToken);
            AsyncStorage.setItem("userTokenExp", userTokenExp);
            AsyncStorage.setItem("userId", userId);
          } catch (e) {
            console.log(e);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      dispatch({ type: "LOGIN", email: userEmail, token: userToken, id: userId });
    },

    // Remove stored token
    signOut: async () => {
      try {
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("userTokenExp");
        await AsyncStorage.removeItem("userId");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "LOGOUT" });
    },

    signUp: () => {
      // TODO
    },
  }), []);

  // Try to retrieve stored user token
  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        const userTokenExp = await AsyncStorage.getItem("userTokenExp");
        if (userTokenExp > Math.floor(Date.now() / 1000)) {
          userToken = await AsyncStorage.getItem("userToken");
          console.log("Token still valid for", userTokenExp - Math.floor(Date.now() / 1000), "seconds");
        }
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  // Loading indicator
  if (loginState.isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} initialParams={{ toastType: "", toastExtra: "" }} />
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="Food" component={FoodScreen} />
            <Stack.Screen name="Drink" component={DrinkScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
            <Stack.Screen name="OrderType" component={OrderTypeScreen} />
            <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
          </Stack.Navigator>
        ) : (
          <LoginScreen />
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
