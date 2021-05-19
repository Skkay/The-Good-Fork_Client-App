import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, Modal, Pressable, View, SectionList, TextInput  } from "react-native";

import RNPickerSelect from 'react-native-picker-select';

import { AuthContext } from '../AuthContext';
import ExpiredSession from '../alert/ExpiredSession';
import fetchToken from '../fetch/FetchToken';
import fetchTokenValidity from '../fetch/FetchTokenValidity';
import fetchDiscounts from '../fetch/FetchDiscounts';
import CartSectionItem from "./CartSectionItem";
import CartSectionHeader from "./CartSectionHeader";

const CartModal = ({ navigation, modalVisible, onRequestClose, onCloseButtonPress, onCartRemoveButtonPress, cartCount, cartPrice, cartMenu, cartFood, cartDrink, loyaltiPoints }) => {
  const cartData = [
    { title: 0, data: cartMenu },
    { title: 1, data: cartFood },
    { title: 2, data: cartDrink }
  ];

  const { signOut } = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [isValidToken, setValidToken] = useState(false);
  const [extraInfo, onChangeExtraInfo] = useState("");
  const [discountList, setDiscountList] = useState([]);
  const [selectedDiscountIndex, setSelectedDiscountIndex] = useState();
  const [selectedDiscountValue, setSelectedDiscountValue] = useState();
  const [finalCartPrice, setFinalCartPrice] = useState(0);

  const handleBuyButtonClick = () => {
    onCloseButtonPress();
    navigation.navigate('OrderType', {cartData: cartData, extraInfo: extraInfo});
  }

  useEffect(() => {
    fetchToken()
      .then((token) => setToken(token))
      .catch((err) => console.log(err));
    if (!token) return;

    fetchTokenValidity(token)
    .then((res) => {
      if (res.valid) {
        setValidToken(true);
      } else {
        ExpiredSession(signOut);
      }
    })
    if (!isValidToken) return;
    
    fetchDiscounts(token)
      .then((res) => setDiscountList(res))
      .catch((err) => console.log(err));
  }, [token, isValidToken]);

  // Calculate new price if a discount is selected, or set the initial price if none is selected
  useEffect(() => {
    if (selectedDiscountIndex === undefined || selectedDiscountIndex === 0) {
      setFinalCartPrice(cartPrice);
      return;
    }

    const discount = discountList[selectedDiscountIndex - 1].value;
    const newCartPrice = cartPrice * (1 - (discount / 100));
    setFinalCartPrice(newCartPrice);
  }, [selectedDiscountIndex, cartPrice]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>{cartCount} {cartCount > 1 ? ("éléments") : ("élément")}. • {finalCartPrice.toFixed(2)} €</Text>
        <SectionList 
          sections={cartData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, section: { title } }) => <CartSectionItem section={title} item={item} onCartRemoveButtonPress={onCartRemoveButtonPress} />}
          renderSectionHeader={({ section: { title } }) => <CartSectionHeader title={title} />} />

        <TextInput 
          style={styles.textInput} 
          placeholder="Saisir des informations complémentaires"
          onChangeText={onChangeExtraInfo}
          value={extraInfo}
          maxLength={255}
          multiline={true}
        />
        <View style={{ marginVertical: 10 }}>
          <RNPickerSelect
            placeholder={{ label: `Utilisez vos ${loyaltiPoints} points`, value: null, color: "#9EA0A4" }}
            items={discountList}
            onValueChange={(value, index) => {setSelectedDiscountValue(value); setSelectedDiscountIndex(index)}}
            style={pickerSelectStyles}
            value={selectedDiscountValue}
          />
          <View style={pickerSelectStyles.bottomBorder} />
        </View>

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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#B6B6B6",
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
    color: "#000000",
    paddingRight: 30,
  },
  bottomBorder: {
    borderBottomColor: "#9EA0A4",
    borderBottomWidth: 1,
    marginHorizontal: 10,
    marginTop: 4
  },
});

export default CartModal;
