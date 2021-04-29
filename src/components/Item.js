import React from "react";
import { Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <ScrollView horizontal={true}>
      <Text style={styles.title}>{item.name}</Text>
    </ScrollView>
    <Text style={styles.price}>{item.price}€</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#F9C2FF",
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
