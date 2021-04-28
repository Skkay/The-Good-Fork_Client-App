import React, { useContext } from "react";
import { Button, SafeAreaView, Text } from "react-native";

import { AuthContext } from '../components/AuthContext';

const HomeScreen = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <Text>Home screen</Text>
      <Button
        title="Logout"
        onPress={() => {signOut()}}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
