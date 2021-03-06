import React from "react";
import { Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
    <Text style={styles.price}>{Number.parseFloat(item.price).toFixed(2)} €</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 22,
  },
  price: {
    fontSize: 22,
    paddingLeft: 20
  }
});

export default Item;
