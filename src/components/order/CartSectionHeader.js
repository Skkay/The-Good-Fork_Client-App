import React from "react";
import { Text, StyleSheet } from "react-native";

const CartSectionHeader = ({ title }) => {
  return (
    <Text style={styles.header}>{title}</Text>
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
