import React, { useContext, useEffect } from "react";
import { Button, SafeAreaView, Text } from "react-native";

import Toast from 'react-native-toast-message'

import { AuthContext } from '../components/AuthContext';

const HomeScreen = ({ route, navigation }) => {
  const { signOut } = useContext(AuthContext);
  const { toastType, toastExtra } = route.params;

  // Toast notifications
  useEffect(() => {
    if (toastType === "order_success_takeout") {
      Toast.show({
        text1: `Commande n°${toastExtra.id}`,
        text2: 'Votre commande à emporter a été envoyée avec succès.'
      });
    }
    if (toastType === "order_success_eatin") {
      Toast.show({
        text1: `Commande n°${toastExtra.id}`,
        text2: 'Votre commande sur place a été envoyée avec succès.'
      });
    }
    if (toastType === "reservation_success") {
      const date = new Date(toastExtra.date);
      Toast.show({
        text1: 'Réservation confirmée',
        text2: `Réservation d'une table de ${toastExtra.table_.place} ${toastExtra.table_.place > 1 ? "places" : "place" }, pour le service de ${toastExtra.service.startTime}h-${toastExtra.service.endTime}h le ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}.`
      });
    }
  });

  return (
    <SafeAreaView>
      <Text>Home screen</Text>
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
        title="Reservation"
        onPress={() => navigation.navigate('Reservation')}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
