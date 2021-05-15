import React from "react";
import { Text, View, StyleSheet } from "react-native";

const OrderItem = ({ item }) => {
  const quantity = item.quantity;
  const name = item.menu ? item.menu.name : item.food ? item.food.name : item.drink ? item.drink.name : "unknown";

  return (
    <View>
      <Text>{"\t"}- {quantity}x {name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  order: {
    margin: 10,
  },
  orderHeader: {
    backgroundColor: "#478D55",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  orderContent: {
    backgroundColor: "#91D59F",
    padding: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  }
});

export default OrderItem;
