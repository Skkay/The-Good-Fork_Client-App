import React, { useEffect, useState, useContext } from "react";
import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from '../components/AuthContext';
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
  const { signOut } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
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
      .finally(() => {
        setLoading(false); 
        setRefreshing(false)
      });
  }, [token, refreshing]);

  const onItemClick = (item) => {
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
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
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
