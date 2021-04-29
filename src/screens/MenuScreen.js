import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, Text } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Item from "../components/Item";
import MenuModal from "../components/MenuModal";

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
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
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

  const onItemClick = (item) => {
    setSelectedId(item.id);
    setSelectedItem(item);
    setModalVisible(true);
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "#ffffff" : "#000000";

    return (
      <Item
        item={item}
        onPress={() => onItemClick(item)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 24 }}>
      <Text>Menu screen</Text>

      <MenuModal
        modalVisible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        onCloseButtonPress={() => setModalVisible(!modalVisible)}
        selectedItem={selectedItem}
      />

      {isLoading ? <ActivityIndicator size="large" color="#000000" /> : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          extraData={selectedId}
        />
      )}
    </SafeAreaView>
  );
};

export default MenuScreen;
