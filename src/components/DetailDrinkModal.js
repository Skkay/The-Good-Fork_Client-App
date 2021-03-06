import React from "react";
import { Text, StyleSheet, Modal, Pressable, View, ScrollView  } from "react-native";

const DetailDrinkModal = ({ modalVisible, onRequestClose, onCloseButtonPress, selectedItem }) => {
  let drinkName = null;
  let drinkDescription = null;
  let drinkPrice = null;

  if (selectedItem) {
    drinkName = selectedItem.name;
    drinkDescription = selectedItem.description;
    drinkPrice = selectedItem.price;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      <View style={styles.modalView}>
        <ScrollView style={styles.content}>
          <Text style={styles.textTitle}>{drinkName}</Text>
          {drinkDescription  &&
            <Text style={styles.textDescription}>{drinkDescription}</Text>
          }
          <Text style={styles.textPrice}>{Number.parseFloat(drinkPrice).toFixed(2)} €</Text>
        </ScrollView>
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={onCloseButtonPress}>
            <Text style={styles.textButton}>Fermer</Text>
          </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,

    marginTop: 120,
    marginBottom: 60,
    marginHorizontal: 35,

    backgroundColor: "#F8F8F8",
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
  textTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold"
  },
  textDescription: {
    textAlign: "center",
    fontSize: 18,
    fontStyle: "italic",
    color: "#6C757D",
  },
  textSubTitle: {
    textAlign: "center",
    fontSize: 20,
  },
  textPrice: {
    textAlign: "center",
    fontSize: 16,
  },

  button: {
    padding: 10,
    margin: 10,
    backgroundColor: "#000000",
  },
  textButton: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonPressed: {
    backgroundColor: "#DBDBDB",
  }
});

export default DetailDrinkModal;
