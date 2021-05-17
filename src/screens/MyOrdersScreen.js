import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, ActivityIndicator, FlatList } from "react-native";

import { AuthContext } from '../components/AuthContext';
import ExpiredSession from '../components/alert/ExpiredSession';
import fetchToken from '../components/fetch/FetchToken';
import fetchTokenValidity from '../components/fetch/FetchTokenValidity';
import fetchUserId from '../components/fetch/FetchUserId';
import fetchOrders from '../components/fetch/FetchOrders';
import OrderItem from '../components/my_orders/OrderItem';

const MyOrdersScreen = () => {
  const { signOut } = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [isValidToken, setValidToken] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchToken()
      .then((token) => setToken(token))
      .catch((err) => console.log(err));
    if (!token) return;

    fetchTokenValidity(token)
    .then((res) => {
      if (res.valid) {
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

    fetchOrders(token, userId)
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, [token, isValidToken, userId]);

  if (isLoading) {
    return (<ActivityIndicator size="large" color="#000000" />);
  }

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({ item }) => <OrderItem order={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default MyOrdersScreen;
