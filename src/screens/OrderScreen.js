import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";

import { AuthContext } from '../components/AuthContext';
import ExpiredSession from '../components/alert/ExpiredSession';
import fetchToken from '../components/fetch/FetchToken';
import fetchTokenValidity from '../components/fetch/FetchTokenValidity';
import fetchMenus from '../components/fetch/FetchMenus';
import fetchFoods from '../components/fetch/FetchFoods';
import fetchDrinks from '../components/fetch/FetchDrinks';
import MenuTab from "./order_tabs/MenuTab";
import FoodTab from "./order_tabs/FoodTab";
import DrinkTab from "./order_tabs/DrinkTab";

const OrderScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { signOut } = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [isValidToken, setValidToken] = useState(false);
  const [dataMenu, setDataMenu] = useState([]);
  const [dataFood, setDataFood] = useState([]);
  const [dataDrink, setDataDrink] = useState([]);
  const [isLoadingMenu, setLoadingMenu] = useState(true);
  const [isLoadingFood, setLoadingFood] = useState(true);
  const [isLoadingDrink, setLoadingDrink] = useState(true);
  const [cartMenu, setCartMenu] = useState([]);
  const [cartFood, setCartFood] = useState([]);
  const [cartDrink, setCartDrink] = useState([]);

  const handleItemPress = (tab, item) => {
    switch (tab) {
      case 0:
        setCartMenu([...cartMenu, item]);
        break;
      case 1:
        setCartFood([...cartFood, item]);
        break;
      case 2:
        setCartDrink([...cartDrink, item]);
        break;
    }
  }

  const handleItemLongPress = (tab, item) => {
    console.log("item long press: tab:", tab, "item:", item.id);
  }

  useEffect(() => {
    fetchToken()
      .then((token) => setToken(token))
      .catch((err) => console.log(err));
    if (!token) return;

    // Checking token validity. A token with less than 60*10 seconds left is considered as expired
    fetchTokenValidity(token)
      .then((res) => {
        if (res.expireIn > 60 * 10) {
          setValidToken(true);
        } else {
          ExpiredSession(signOut);
        }
      })
    if (!isValidToken) return;

    // Fetching menus
    fetchMenus(token)
      .then((res) => setDataMenu(res))
      .finally(() => setLoadingMenu(false));

    // Fetching foods
    fetchFoods(token)
      .then((res) => setDataFood(res))
      .finally(() => setLoadingFood(false));

    // Fetching drinks
    fetchDrinks(token)
      .then((res) => setDataDrink(res))
      .finally(() => setLoadingDrink(false));
  }, [token, isValidToken]);

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
        <MenuTab data={dataMenu} onItemPress={handleItemPress} onItemLongPress={handleItemLongPress} />
      )}
      {activeTab === 1 && (
        <FoodTab data={dataFood} onItemPress={handleItemPress} onItemLongPress={handleItemLongPress} />
      )}
      {activeTab === 2 && (
        <DrinkTab data={dataDrink} onItemPress={handleItemPress} onItemLongPress={handleItemLongPress} />
      )}

      {/* Display number of items and total price if at least one 'basket' is not empty */}
      {(cartMenu.length > 0 || cartFood.length > 0 || cartDrink.length > 0) && (
      <View>
        <Text>
          Count: {cartMenu.length + cartFood.length + cartDrink.length} - 
          Total price: {(
            cartMenu.reduce((total, item) => total + (item.price || 0), 0) + 
            cartFood.reduce((total, item) => total + (item.price || 0), 0) + 
            cartDrink.reduce((total, item) => total + (item.price || 0), 0)).toFixed(2)} €
          </Text>
      </View>
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
