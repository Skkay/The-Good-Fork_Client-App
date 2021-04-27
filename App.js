import React, { useEffect, useState, useMemo, useReducer } from "react";
import HomeScreen from "./src/screens/HomeScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";

import { AuthContext } from "./src/components/AuthContext";

import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const Stack = createStackNavigator();

  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

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

  const authContext = useMemo(
    () => ({
      signIn: async(userEmail, password) => {
        // setUserToken("token");
        // setIsLoading(false);
        let userToken = null;
        if (userEmail === 'user@example.com' && password === 'user') {
          try {
            userToken = 'token'
            await AsyncStorage.setItem('userToken', userToken)
          } catch (e) {
            console.log(e)
          }
          
        }
        dispatch({ type: 'LOGIN', email: userEmail, token: userToken })
      },
      signOut: async() => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken')
        } catch (e) {
          console.log(e)
        }
        dispatch({ type: 'LOGOUT' })
      },
      signUp: () => {
        // setUserToken("token");
        // setIsLoading(false);
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
    }, 1000);
  }, []);

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
