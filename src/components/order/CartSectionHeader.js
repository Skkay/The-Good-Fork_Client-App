import React from "react";
import { Text, StyleSheet } from "react-native";

const CartSectionHeader = ({ title }) => {
  return (
    <Text style={styles.header}>
      {title === 0 && ("Menus")}
      {title === 1 && ("Plats")}
      {title === 2 && ("Boissons")}
    </Text>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    marginLeft: 10,
    marginTop: 15
  },
});

export default CartSectionHeader;
