import React, { useContext, useEffect, useState, useCallback } from "react";
import { SafeAreaView, ActivityIndicator, FlatList } from "react-native";

import { useFocusEffect } from '@react-navigation/native';

import { AuthContext } from '../components/AuthContext';
import ExpiredSession from '../components/alert/ExpiredSession';
import fetchToken from '../components/fetch/FetchToken';
import fetchTokenValidity from '../components/fetch/FetchTokenValidity';
import fetchUserId from '../components/fetch/FetchUserId';
import fetchReservations from '../components/fetch/FetchReservations';
import ReservationItem from '../components/my_reservations/ReservationItem';

const MyReservationsScreen = ({ navigation }) => {
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
      .catch((err) => console.log(err));
  }, [token, isValidToken]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchReservations(token, userId)
        .then((res) => setData(res))
        .finally(() => setLoading(false));
    }, [userId])
  );

  if (isLoading) {
    return (<ActivityIndicator size="large" color="#000000" />);
  }

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({ item }) => <ReservationItem reservation={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default MyReservationsScreen;
