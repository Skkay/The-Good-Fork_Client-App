import React, { useEffect, useMemo, useReducer } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";

import { AuthContext } from "./src/components/AuthContext";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";

const App = () => {
  const Stack = createStackNavigator();

  const initialLoginState = {
    isLoading: true,
    userEmail: null,
    userToken: null,
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
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...pervState,
          userEmail: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...pervState,
          userEmail: action.email,
          userToken: action.token,
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
        url: "http://192.168.1.18/3proj_api/public/index.php/api/login",
        withCredentials: true,
        data: {
          email: userEmail,
          password: password,
        },
      })
        .then((res) => {
          userToken = res.data.token;
          console.log("connected\nToken:", userToken);
          try {
            AsyncStorage.setItem("userToken", userToken);
          } catch (e) {
            console.log(e);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      dispatch({ type: "LOGIN", email: userEmail, token: userToken });
    },

    // Remove stored token
    signOut: async () => {
      try {
        await AsyncStorage.removeItem("userToken");
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
        userToken = await AsyncStorage.getItem("userToken");
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
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        ) : (
          <LoginScreen />
        )}
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
