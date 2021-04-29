import React from "react";
import { Text, StyleSheet, Modal, Pressable, View } from "react-native";

const MenuModal = ({ modalVisible, onRequestClose, onPress, selectedItem }) => {
  const drinksData = [];
  const foodsData = [];

  if (selectedItem) {
    if (selectedItem.drinks.length > 0) {
      selectedItem.drinks.forEach(e => drinksData.push(<Text key={e.id}>{e.name}</Text>));
    } else {
      drinksData.push(<Text key={0}>Nothing...</Text>);
    }

    if (selectedItem.foods.length > 0) {
      selectedItem.foods.forEach(e => foodsData.push(<Text key={e.id}>{e.name}</Text>));
    } else {
      foodsData.push(<Text key={0}>Nothing...</Text>);
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Plats :</Text>
          {foodsData}

          <Text style={styles.modalText}>Boissons :</Text>
          {drinksData}

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onPress}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default MenuModal;
