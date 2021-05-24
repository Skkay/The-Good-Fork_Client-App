import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, ActivityIndicator, Text, View, Pressable } from "react-native";

import axios from "axios";
import Toast from 'react-native-toast-message'

const RegisterScreen = ({ navigation }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
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
    <SafeAreaView style={{ justifyContent: 'center', flex: 1 }}>
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

      <View style={styles.buttonGroup}>
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={handleRegister}>
          <Text style={styles.buttonText}>Créer son compte</Text>
        </Pressable>
      </View>

      {isLoading && <ActivityIndicator size="large" color="#000000" />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
  },

  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#000000",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  buttonPressed: {
    backgroundColor: "#BFBFBF",
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
  },
});

export default RegisterScreen;
