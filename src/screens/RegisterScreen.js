import React, { useContext, useState } from "react";
import { Button, SafeAreaView, StyleSheet, TextInput, ActivityIndicator, Text } from "react-native";

import axios from "axios";
import Toast from 'react-native-toast-message'

import { AuthContext } from '../components/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [email, onChangeEmail] = useState("user@example.com");
  const [password, onChangePassword] = useState("user");
  const [isLoading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: "http://192.168.1.18/3proj_api/public/api/users",
      withCredentials: true,
      data: {
        email: email,
        password: password
      },
    })
      .then((res) => {
        console.log("Registered", res);
        navigation.navigate('Login');
      })
      .catch((err) => {
        setLoading(false);
        const errorDescription = err.response.data["hydra:description"];
        const errorTitle = errorDescription.split('//')[0];
        const errorMessage = errorDescription.split('//')[1];
        console.log("ERROR:", errorTitle, errorMessage);

        if (errorTitle === "FieldAlreadyUsedException") {
          Toast.show({
            type: 'error',
            text1: 'Adresse email déjà utilisée',
          });
        }
      });
  }

  return (
    <SafeAreaView>
      <Text>Register</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Adresse email"
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Mot de passe"
        autoCompleteType="password"
        textContentType="password"
        secureTextEntry={true}
      />
      <Button
        title="Créer son compte"
        onPress={handleRegister}
      />
      {isLoading && <ActivityIndicator size="large" color="#000000" />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default RegisterScreen;
