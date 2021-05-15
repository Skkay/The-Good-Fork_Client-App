import React, { useContext } from "react";
import { Button, SafeAreaView, Text } from "react-native";

import { AuthContext } from '../components/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);

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
    </SafeAreaView>
  );
};

export default HomeScreen;
