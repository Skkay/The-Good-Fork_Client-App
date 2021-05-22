import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView, Text, ActivityIndicator, FlatList } from "react-native";

import { AuthContext } from '../components/AuthContext';
import ExpiredSession from '../components/alert/ExpiredSession';
import fetchToken from '../components/fetch/FetchToken';
import fetchTokenValidity from '../components/fetch/FetchTokenValidity';
import fetchAvailableTables from '../components/fetch/FetchAvailableTables';
import TableItem from "../components/reservation/TableItem";

const ReservationScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [isValidToken, setValidToken] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchToken()
      .then((token) => setToken(token))
      .catch((err) => console.log(err));
    if (!token) return;

    // Checking token validity. A token with less than 60*5 seconds left is considered as expired
    fetchTokenValidity(token)
      .then((res) => {
        if (res.expireIn > 60 * 5) {
          setValidToken(true);
        } else {
          ExpiredSession(signOut);
        }
    })
    if (!isValidToken) return;

    fetchAvailableTables(token)
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, [token, isValidToken]);

  if (isLoading) {
    return (
      <ActivityIndicator size="large" color="#000000" />
    );
  }

  return (
    <SafeAreaView>
      <FlatList 
        data={data}
        renderItem={({ item }) => <TableItem table={item} token={token} navigation={navigation} />}
        keyExtractor={item => item.date + item.service.id.toString() + item.table.id.toString()}
      />
    </SafeAreaView>
  );
};

export default ReservationScreen;
