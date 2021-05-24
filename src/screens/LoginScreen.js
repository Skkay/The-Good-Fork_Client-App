import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, ActivityIndicator, Pressable, View, Text } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";

const LoginScreen = ({ setConnected, navigation }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
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
        <Pressable style={({ pressed }) => [styles.button, styles.buttonRegister, pressed && styles.buttonPressed]} onPress={() => navigation.navigate('Register')}>
          <Text style={[styles.buttonText, styles.buttonTextRegister]}>S'inscire</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.button, styles.buttonLogin, pressed && styles.buttonPressed]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
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
  },
  button: {
    backgroundColor: "#FFFFFF",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  buttonLogin: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000"
  },
  buttonRegister: {
    backgroundColor: "#000000",
  },
  buttonPressed: {
    backgroundColor: "#BFBFBF",
  },
  buttonText: {
    color: "#000000",
    textAlign: "center",
    fontSize: 16,
  },
  buttonTextRegister: {
    color: "#FFFFFF"
  }
});

export default LoginScreen;
