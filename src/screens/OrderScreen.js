import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from '../components/AuthContext';
import ExpiredSession from '../components/alert/ExpiredSession';
import fetchMenus from '../components/fetch/FetchMenus';
import fetchFoods from '../components/fetch/FetchFoods';
import fetchDrinks from '../components/fetch/FetchDrinks';
import MenuTab from "./order_tabs/MenuTab";
import FoodTab from "./order_tabs/FoodTab";
import DrinkTab from "./order_tabs/DrinkTab";

const fetchToken = async() => {
  let userToken = null;
  try {
    userToken = await AsyncStorage.getItem("userToken");
  } catch (e) {
    console.log(e);
  } finally {
    return userToken;
  }
}

const OrderScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { signOut } = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [dataMenu, setDataMenu] = useState([]);
  const [dataFood, setDataFood] = useState([]);
  const [dataDrink, setDataDrink] = useState([]);
  const [isLoadingMenu, setLoadingMenu] = useState(true);
  const [isLoadingFood, setLoadingFood] = useState(true);
  const [isLoadingDrink, setLoadingDrink] = useState(true);

  useEffect(() => {
    fetchToken()
      .then((token) => setToken(token))
      .catch((err) => console.log(err));

    if (!token) return;

    // Fetching menus
    fetchMenus(token)
      .then((res) => {
        if (res.code === 401 && res.message === "Expired JWT Token") {
          ExpiredSession(signOut);
          return
        }
        setDataMenu(res);
      })
      .finally(() => setLoadingMenu(false));

    // Fetching foods
    fetchFoods(token)
      .then((res) => {
        if (res.code === 401 && res.message === "Expired JWT Token") {
          ExpiredSession(signOut);
          return
        }
        setDataFood(res);
      })
      .finally(() => setLoadingFood(false));

    // Fetching drinks
    fetchDrinks(token)
      .then((res) => {
        if (res.code === 401 && res.message === "Expired JWT Token") {
          ExpiredSession(signOut);
          return
        }
        setDataDrink(res);
      })
      .finally(() => setLoadingDrink(false));
  }, [token]);

  if (isLoadingMenu && isLoadingFood && isLoadingDrink) {
    return (
      <ActivityIndicator size="large" color="#000000" />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity style={[styles.headerButton, activeTab === 0 && styles.headerButtonActive]} onPress={() => setActiveTab(0)}>
          <Text style={styles.headerButtonText}>Menus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.headerButton, activeTab === 1 && styles.headerButtonActive]} onPress={() => setActiveTab(1)}>
          <Text style={styles.headerButtonText}>Plats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.headerButton, activeTab === 2 && styles.headerButtonActive]} onPress={() => setActiveTab(2)}>
          <Text style={styles.headerButtonText}>Boissons</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 0 && (
        <MenuTab data={dataMenu} />
      )}
      {activeTab === 1 && (
        <FoodTab data={dataFood} />
      )}
      {activeTab === 2 && (
        <DrinkTab data={dataDrink} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row"
  },
  headerButton: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#D1D1D1",
  },
  headerButtonActive: {
    backgroundColor: "#FF8383",
    borderBottomWidth: 3,
    borderBottomColor: "#B74343",
  },
  headerButtonText: {
    textAlign: "center",
    fontSize: 18,
    marginVertical: 10
  }
});

export default OrderScreen;
