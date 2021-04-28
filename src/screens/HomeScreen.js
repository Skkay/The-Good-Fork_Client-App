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
    </SafeAreaView>
  );
};

export default HomeScreen;
