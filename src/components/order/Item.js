import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

const Item = ({ item }) => (
  <View style={styles.item}>
    <ScrollView horizontal={true}>
      <Text style={styles.title}>{item.name}</Text>
    </ScrollView>
    <Text style={styles.price}>{Number.parseFloat(item.price).toFixed(2)} €</Text>
  </View>
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
