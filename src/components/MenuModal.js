import React from "react";
import { Text, StyleSheet, Modal, Pressable, View, ScrollView  } from "react-native";

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
      <View style={styles.modalView}>
        <ScrollView style={styles.content}>
          <Text style={styles.textTitle}>Plats :</Text>
          {foodsData}

          <Text>{"\n"}</Text>
          
          <Text style={styles.textTitle}>Boissons :</Text>
          {drinksData}

        </ScrollView>
          <Pressable
            style={styles.button}
            onPress={onPress}>
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

    backgroundColor: "white",
    borderRadius: 5,
    
    shadowColor: "#000",
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
    fontSize: 20
  },

  button: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default MenuModal;
