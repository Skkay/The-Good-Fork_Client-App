import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet } from "react-native";

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
      .then((res) => {
        if (!res.ok) {
          throw Error(res.status);
        }
        res.json()
      })
      .then((json) => setData(json))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [token]);

  const onItemClick = (item) => {
    setSelectedId(item.id);
    setSelectedItem(item);
    setModalVisible(true);
  }

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => onItemClick(item)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.content}>
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

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 5,
  }
});

export default MenuScreen;
