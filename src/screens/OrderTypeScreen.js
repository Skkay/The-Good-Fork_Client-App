import React from "react";
import { SafeAreaView, Text } from "react-native";

const OrderTypeScreen = ({ route, navigation }) => {
  const { cartData } = route.params

  console.log(cartData[0].data);
  return (
    <SafeAreaView>
      <Text>Order type screen</Text>
      <Text>{cartData[0].title}</Text>
    </SafeAreaView>
  );
};

export default OrderTypeScreen;
