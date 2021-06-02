import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Pressable } from "react-native";

import { AuthContext } from '../components/AuthContext';
import ExpiredSession from '../components/alert/ExpiredSession';
import fetchToken from '../components/fetch/FetchToken';
import fetchTokenValidity from '../components/fetch/FetchTokenValidity';
import fetchUserId from '../components/fetch/FetchUserId';
import fetchUser from '../components/fetch/FetchUser';
import fetchMenus from '../components/fetch/FetchMenus';
import fetchFoods from '../components/fetch/FetchFoods';
import fetchDrinks from '../components/fetch/FetchDrinks';
import MenuTab from "./order_tabs/MenuTab";
import FoodTab from "./order_tabs/FoodTab";
import DrinkTab from "./order_tabs/DrinkTab";
import CartModal from "../components/order/CartModal";

const OrderScreen = ({ navigation }) => {
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

  const [cartCount, setCartCount] = useState(0);
  const [cartPrice, setCartPrice] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const [userId, setUserId] = useState();
  const [userLoyaltyPoints, setUserLoyaltyPoints] = useState();
  const [isLoadingLoyaltyPoints, setLoadingLoyaltyPoints] = useState(true);

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

  const handleCartBannerPress = () => {
    setModalVisible(true);
  }

  const handleCartRemoveButtonPress = (section, item) => {
    switch (section) {
      case 0:
        const newCartMenu = [...cartMenu];
        const removeIndexMenu = newCartMenu.map(menu => menu.id).indexOf(item.id);
        newCartMenu.splice(removeIndexMenu, 1);
        setCartMenu(newCartMenu);
        break;
      case 1:
        const newCartFood = [...cartFood];
        const removeIndexFood = newCartFood.map(food => food.id).indexOf(item.id);
        newCartFood.splice(removeIndexFood, 1);
        setCartFood(newCartFood);
        break;
      case 2:
        const newCartDrink = [...cartDrink];
        const removeIndexDrink = newCartDrink.map(drink => drink.id).indexOf(item.id);
        newCartDrink.splice(removeIndexDrink, 1);
        setCartDrink(newCartDrink);
        break;
    }
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

    fetchUserId()
      .then((id) => setUserId(id))
      .catch((err) => console.log(err))
    if (!userId) return;
    
    // Fetching user's loyalty points
    fetchUser(token, userId)
      .then((res) => setUserLoyaltyPoints(res.loyaltyPoints))
      .finally(() => setLoadingLoyaltyPoints(false));

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
  }, [token, isValidToken, userId]);

  useEffect(() => {
    setCartCount(cartMenu.length + cartFood.length + cartDrink.length);
    setCartPrice(
      cartMenu.reduce((total, item) => total + (item.price || 0), 0) + 
      cartFood.reduce((total, item) => total + (item.price || 0), 0) + 
      cartDrink.reduce((total, item) => total + (item.price || 0), 0)
    );
  }, [cartMenu, cartFood, cartDrink]);

  if (isLoadingMenu && isLoadingFood && isLoadingDrink && isLoadingLoyaltyPoints) {
    return (
      <ActivityIndicator size="large" color="#000000" />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1}}>
      <CartModal 
        navigation={navigation}
        modalVisible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onCloseButtonPress={() => setModalVisible(false)}
        onCartRemoveButtonPress={handleCartRemoveButtonPress}
        cartCount={cartCount}
        cartPrice={cartPrice}
        cartMenu={cartMenu}
        cartFood={cartFood}
        cartDrink={cartDrink}
        loyaltiPoints={userLoyaltyPoints} />

      <View style={styles.header}>
        <TouchableOpacity style={[styles.headerButton, activeTab === 0 && styles.headerButtonActive]} onPress={() => setActiveTab(0)}>
          <Text style={[styles.headerButtonText, activeTab === 0 && styles.headerButtonTextActive]}>Menus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.headerButton, activeTab === 1 && styles.headerButtonActive]} onPress={() => setActiveTab(1)}>
          <Text style={[styles.headerButtonText, activeTab === 1 && styles.headerButtonTextActive]}>Plats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.headerButton, activeTab === 2 && styles.headerButtonActive]} onPress={() => setActiveTab(2)}>
          <Text style={[styles.headerButtonText, activeTab === 2 && styles.headerButtonTextActive]}>Boissons</Text>
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

      {/* Display number of items and total price. Disable Pressable if cart is empty */}
      <View style={styles.cartView}>
        <Pressable style={({ pressed }) => [styles.cartPressable, pressed && styles.cartPressablePressed]} onPress={handleCartBannerPress}>
          <Text style={styles.cartText}>
            Voir le panier ({cartCount}). • {cartPrice.toFixed(2)} €
          </Text>
        </Pressable>
      </View>
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
    borderLeftWidth: 0.25,
    borderRightWidth: 0.25,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "#000000",
  },
  headerButtonActive: {
    backgroundColor: "#000000",
  },
  headerButtonText: {
    textAlign: "center",
    fontSize: 18,
    marginVertical: 10,
    color: "#000000",
  },
  headerButtonTextActive: {
    color: "#FFFFFF",
  },
  cartView: {
    padding: 15,
    backgroundColor: "#EAEAEA",
    borderTopColor: "#000000",
    borderTopWidth: 0.5,
  },
  cartPressable: {
    padding: 8,
    backgroundColor: "#000000",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  cartPressableDisable: {
    backgroundColor: "#A8A8A8",
  },
  cartPressablePressed: {
    backgroundColor: "#DBDBDB",
  },
  cartText: {
    fontSize: 18,
    textAlign: "center",
    color: "#FFFFFF",
  }
});

export default OrderScreen;
