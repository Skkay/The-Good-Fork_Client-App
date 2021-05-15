import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";

import fetchUserId from '../components/fetch/FetchUserId';

const MyOrdersScreen = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchUserId()
      .then((id) => setUserId(id))
      .catch((err) => console.log(err))
    if (!userId) return;
  }, [userId]);

  return (
    <SafeAreaView>
      <Text>My orders screen. UserID: {userId}</Text>
    </SafeAreaView>
  );
};

export default MyOrdersScreen;
