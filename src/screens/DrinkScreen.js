import React, { useEffect, useState, useContext } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet } from "react-native";

import { AuthContext } from '../components/AuthContext';
import ExpiredSession from '../components/alert/ExpiredSession';
import fetchToken from '../components/fetch/FetchToken';
import fetchTokenValidity from '../components/fetch/FetchTokenValidity';
import fetchDrinks from '../components/fetch/FetchDrinks';
import Item from "../components/Item";
import DetailDrinkModal from "../components/DetailDrinkModal";

const DrinkScreen = () => {
  const { signOut } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);
  const [isValidToken, setValidToken] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    fetchToken()
      .then((token) => setToken(token))
      .catch((err) => console.log(err));
    if (!token) return;

    // Checking token validity
    fetchTokenValidity(token)
    .then((res) => {
      if (res.valid) {
        setValidToken(true);
      } else {
        ExpiredSession(signOut);
      }
    })
    if (!isValidToken) return;

    // Fetching drinks
    fetchDrinks(token)
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, [token, isValidToken, refreshing]);

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
      <DetailDrinkModal
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

export default DrinkScreen;
