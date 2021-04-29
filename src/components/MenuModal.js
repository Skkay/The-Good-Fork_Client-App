import React from "react";
import { Text, StyleSheet, Modal, Pressable, View, ScrollView  } from "react-native";

const MenuModal = ({ modalVisible, onRequestClose, onCloseButtonPress, selectedItem }) => {
  let menuName = null;
  let menuDescription = null;
  const drinksData = [];
  const foodsData = [];

  if (selectedItem) {
    menuName = selectedItem.name;
    menuDescription = selectedItem.description;
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
          <Text style={styles.textTitle}>{menuName}</Text>
          {menuDescription  &&
            <Text style={styles.textDescription}>{menuDescription}</Text>
          }
          <Text>{"\n"}</Text>
          <Text style={styles.textSubTitle}>Plats :</Text>
          {foodsData}

          <Text>{"\n"}</Text>
          
          <Text style={styles.textSubTitle}>Boissons :</Text>
          {drinksData}

        </ScrollView>
          <Pressable
            style={styles.button}
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
