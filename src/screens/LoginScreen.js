import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet, TextInput, ActivityIndicator } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";

const LoginScreen = ({ setConnected, navigation }) => {
  const [email, onChangeEmail] = useState("user@example.com");
  const [password, onChangePassword] = useState("user");
  const [isLoading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: "http://192.168.1.18/3proj_api/public/api/login",
      withCredentials: true,
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        console.log("connected\nToken:", res.data.token, "// ID:", res.data.data.id);
        try {
          AsyncStorage.setItem("userToken", res.data.token);
          AsyncStorage.setItem("userTokenExp", jwt_decode(res.data.token).exp.toString());
          AsyncStorage.setItem("userId", res.data.data.id.toString());
          setConnected(true);
        } catch (e) {
          console.log(e);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  return (
    <SafeAreaView>
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
        title="Se connecter"
        onPress={handleLogin}
      />

      <Button
        title="Créer un compte"
        onPress={() => navigation.navigate('Register')}
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

export default LoginScreen;
