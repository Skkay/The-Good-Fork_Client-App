import React from "react";
import { Button, SafeAreaView, Text } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>Home screen</Text>
      <Button 
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
