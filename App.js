import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Toast from 'react-native-toast-message'

import { AuthContext } from "./src/components/AuthContext";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import { MainStackNavigator, MyOrdersStackNavigator } from './src/StackNavigator';

import CustomDrawer from './src/components/CustomDrawer';

const App = () => {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const [isConnected, setConnected] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const signOut = () => {
    try {
      AsyncStorage.removeItem("userToken");
      AsyncStorage.removeItem("userTokenExp");
      AsyncStorage.removeItem("userId");
      setConnected(false);
    } catch (e) {
      console.log(e);
    }
  }

  const authContext = useMemo(() => ({
    signOut: () => signOut(),
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
          <Drawer.Navigator initialRouteName="Home" drawerContent={props => (
            <CustomDrawer props={props} signOut={signOut} />
          )} >
            <Drawer.Screen name="Home" component={MainStackNavigator} options={{ title: "Accueil" }} />
            <Drawer.Screen name="MyOrders" component={MyOrdersStackNavigator} options={{ title: "Mes commandes" }} />
          </Drawer.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login">
              {({ navigation }) => <LoginScreen navigation={navigation} setConnected={setConnected} />}
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
