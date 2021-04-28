import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, SafeAreaView, Text, View, StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

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

const MenuScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);
  
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
      .then((res) => res.json())
      .then((json) => {
        console.log("responsed", json);
        setData(json);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [token]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}, {item.price}€</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 24 }}>
      <Text>Menu screen</Text>
      {isLoading ? <ActivityIndicator size="large" color="#000000" /> : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default MenuScreen;
