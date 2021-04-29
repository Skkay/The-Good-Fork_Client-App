import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.title}>{item.name}, {item.price}€</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#F9C2FF",
  },
  title: {
    fontSize: 32,
  },
});

export default Item;
