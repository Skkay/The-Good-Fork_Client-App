import React, { useContext, useEffect } from "react";
import { Button, SafeAreaView, Text } from "react-native";

import Toast from 'react-native-toast-message'

import { AuthContext } from '../components/AuthContext';

const HomeScreen = ({ route, navigation }) => {
  const { signOut } = useContext(AuthContext);
  const { toastType, toastExtra } = route.params;

  // Toast notifications
  useEffect(() => {
    if (toastType === "order_success") {
      Toast.show({
        text1: `Commande n°${toastExtra}`,
        text2: 'Votre commande a été envoyée avec succès.'
      });
    }
  });

  return (
    <SafeAreaView>
      <Text>Home screen</Text>
      <Button
        title="Logout"
        onPress={() => {signOut()}}
      />
      <Button 
        title="Menus"
        onPress={() => navigation.navigate('Menu')}
      />
      <Button 
        title="Foods"
        onPress={() => navigation.navigate('Food')}
      />
      <Button 
        title="Drinks"
        onPress={() => navigation.navigate('Drink')}
      />
      <Button 
        title="Order"
        onPress={() => navigation.navigate('Order')}
      />
      <Button 
        title="My orders"
        onPress={() => navigation.navigate('MyOrders')}
      />
      <Button 
        title="Reservation"
        onPress={() => navigation.navigate('Reservation')}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
