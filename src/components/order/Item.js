import React from "react";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";

const Item = ({ item, tab, onItemPress, onItemLongPress }) => {
  return (
    <View style={styles.item}>
    <ScrollView style={styles.scrollView} horizontal={true}>
      <Text style={styles.title}>{item.name}</Text>
    </ScrollView>
    <Pressable style={({ pressed }) => [styles.pressable, pressed && styles.pressablePressed]} onPress={() => onItemPress(tab, item)} onLongPress={() => onItemLongPress(tab, item)}>
      <Text style={styles.price}>{Number.parseFloat(item.price).toFixed(2)} €</Text>
    </Pressable>
  </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scrollView: {
    borderBottomWidth: 1,
    borderBottomColor: "#7D7D7D",
    marginRight: 10,
  },
  pressable: {
    backgroundColor: "#000000",
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  pressablePressed: {
    backgroundColor: "#DBDBDB",
  },
  title: {
    fontSize: 22,
  },
  price: {
    fontSize: 22,
    color: "#ffffff",
  },
});

export default Item;
