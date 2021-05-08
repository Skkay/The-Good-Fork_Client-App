import React from "react";
import { Text, StyleSheet, Modal, Pressable, View, SectionList  } from "react-native";

import CartSectionItem from "./CartSectionItem";
import CartSectionHeader from "./CartSectionHeader";

const CartModal = ({ modalVisible, onRequestClose, onCloseButtonPress, cartCount, cartPrice, cartMenu, cartFood, cartDrink }) => {
  const cartData = [
    {
      title: "Menus",
      data: cartMenu
    },
    {
      title: "Plats",
      data: cartFood
    },
    {
      title: "Boissons",
      data: cartDrink
    }
  ]

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>{cartCount} {cartCount > 1 ? ("éléments") : ("élément")}. • {cartPrice.toFixed(2)} €</Text>
        <SectionList 
          sections={cartData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <CartSectionItem item={item} />}
          renderSectionHeader={({ section: { title } }) => <CartSectionHeader title={title} />} />
        <Pressable
          style={styles.button}
          onPress={onCloseButtonPress}>
          <Text style={styles.textButton}>Fermer</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,

    marginTop: 120,
    marginBottom: 30,
    marginHorizontal: 35,

    backgroundColor: "white",
    borderRadius: 5,
    
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  content: {
    paddingHorizontal: 35,
    marginTop: 10,
  },

  button: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  textButton: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center"
  },

  modalTitle: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  }
});

export default CartModal;
