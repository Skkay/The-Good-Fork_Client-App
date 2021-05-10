import React from "react";
import { Text, StyleSheet, Modal, Pressable, View, SectionList, TextInput  } from "react-native";

import CartSectionItem from "./CartSectionItem";
import CartSectionHeader from "./CartSectionHeader";

const CartModal = ({ navigation, modalVisible, onRequestClose, onCloseButtonPress, onCartRemoveButtonPress, cartCount, cartPrice, cartMenu, cartFood, cartDrink }) => {
  const cartData = [
    {
      title: 0,
      data: cartMenu
    },
    {
      title: 1,
      data: cartFood
    },
    {
      title: 2,
      data: cartDrink
    }
  ]

  const handleBuyButtonClick = () => {
    onCloseButtonPress();
    navigation.navigate('OrderType', {cartData: cartData});
  }

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
          renderItem={({ item, section: { title } }) => <CartSectionItem section={title} item={item} onCartRemoveButtonPress={onCartRemoveButtonPress} />}
          renderSectionHeader={({ section: { title } }) => <CartSectionHeader title={title} />} />

        <TextInput 
          style={styles.textInput} 
          placeholder="Saisir des informations complémentaires"
        />
        
        <View style={styles.buttonGroup}>
          <Pressable
            style={styles.button}
            onPress={onCloseButtonPress}>
            <Text style={styles.textButton}>Retour</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.button, cartCount < 1 && styles.buttonDisable, (pressed && cartCount > 0) && styles.buttonPressed]} disabled={cartCount < 1} onPress={handleBuyButtonClick}>
            <Text style={styles.textButton}>Payer</Text>
          </Pressable>
        </View>
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

  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  buttonDisable: {
    backgroundColor: "#A8A8A8",
  },
  buttonPressed: {
    backgroundColor: "#2E68B0",
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
  },

  textInput: {
    borderWidth: 1,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    marginTop: 5,
    borderRadius: 5
  },
});

export default CartModal;
