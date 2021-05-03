import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Item from "../../components/order/Item";

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

const MenuTab = () => {
  const [token, setToken] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchToken()
      .then((token) => setToken(token))
      .catch((err) => console.log(err));

    if (!token) return;

    const options = {
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    fetch('http://192.168.1.18/3proj_api/public/api/menus', options)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            Alert.alert(
              "Session expirée",
              "Votre session a expiré, veuillez vous reconnecter.",
              [{ text: "Ok", onPress: () => signOut() }]
            );
          }
          throw Error(res.status);
        }
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [token]);

  const renderItem = ({ item }) => {
    return (
      <Item 
        item={item}
      />
    );
  }

  if (isLoading) {
    return (
      <ActivityIndicator size="large" color="#000000" />
    );
  }
  return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
  );
};

export default MenuTab;
