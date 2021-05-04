import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from '../components/AuthContext';
import MenuTab from "./order_tabs/MenuTab";

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

    // Menus fetching
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
      .then((json) => setDataMenu(json))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

  }, [token]);

  if (isLoading) {
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
        <Text>Tab 2</Text>
      )}
      {activeTab === 2 && (
        <Text>Tab 3</Text>
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
