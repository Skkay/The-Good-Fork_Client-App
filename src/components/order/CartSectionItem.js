import React from "react";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";

const CartSectionItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <ScrollView horizontal={true}>
        <Text>• {item.name}</Text>
      </ScrollView>
      <Pressable
        style={styles.button}>
        <Text style={styles.textButton}>−</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 0,
    marginVertical: 2,
    marginLeft: 20,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#FF0000",
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  textButton: {
    color: "#FFFFFF",
    paddingHorizontal: 3
  }
});

export default CartSectionItem;
