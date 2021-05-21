import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView, Text, ActivityIndicator } from "react-native";

import { AuthContext } from '../components/AuthContext';
import ExpiredSession from '../components/alert/ExpiredSession';
import fetchToken from '../components/fetch/FetchToken';
import fetchTokenValidity from '../components/fetch/FetchTokenValidity';
import fetchAvailableTables from '../components/fetch/FetchAvailableTables';

const ReservationScreen = () => {
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
      <Text>Reservation screen</Text>
    </SafeAreaView>
  );
};

export default ReservationScreen;
