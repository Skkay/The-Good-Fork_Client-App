import React, { useEffect } from "react";
import { SafeAreaView, Text, Pressable, StyleSheet, View } from "react-native";

import Toast from 'react-native-toast-message'

const HomeScreen = ({ route, navigation }) => {
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
      <Text style={styles.title}>The Good Fork</Text>
      <Text style={styles.subTitle}>Bienvenue au restaurant The Good Fork.</Text>

      <View style={{ marginTop: 20 }}>
        <View style={styles.buttonGroup}>
          <Pressable style={({ pressed }) => [styles.buttonGroupButton, styles.button, pressed && styles.buttonPressed]} onPress={() => navigation.navigate('Food')}>
            <Text style={styles.buttonText}>Nos plats</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.buttonGroupButton, styles.button, pressed && styles.buttonPressed]} onPress={() => navigation.navigate('Drink')}>
            <Text style={styles.buttonText}>Nos boissons</Text>
          </Pressable>
        </View>
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={() => navigation.navigate('Menu')}>
          <Text style={styles.buttonText}>Nos menus</Text>
        </Pressable>
      </View>

      <Pressable style={({ pressed }) => [{ marginTop: 40 }, styles.button, pressed && styles.buttonPressed]} onPress={() => navigation.navigate('Reservation')}>
        <Text style={styles.buttonText}>Réserver une table</Text>
      </Pressable>
      <Pressable style={({ pressed }) => [{ marginTop: 30 }, styles.button, pressed && styles.buttonPressed]} onPress={() => navigation.navigate('Order')}>
        <Text style={styles.buttonText}>Commander</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 30
  },
  subTitle: {
    textAlign: "center"
  },
  buttonGroup: {
    flexDirection: "row",
  },
  buttonGroupButton: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    margin: 10,
    borderRadius: 10,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonPressed: {
    backgroundColor: "#BFBFBF",
  },
  buttonText: {
    color: "#000000",
    textAlign: "center",
    fontSize: 16,
  },
});

export default HomeScreen;
