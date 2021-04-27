import React, { useContext } from "react";
import { Alert, Button, SafeAreaView, StyleSheet, TextInput } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../components/AuthContext';

const LoginScreen = () => {
  const [email, onChangeEmail] = React.useState("user@example.com");
  const [password, onChangePassword] = React.useState("user");

  const { signIn } = useContext(AuthContext);

  const handleSubmit = () => {
    console.log("Email:" + email + "\nPassword:" + password);


    // axios({
    //   method: "POST",
    //   url: "http://192.168.1.18/3proj_api/public/index.php/api/login",
    //   withCredentials: true,
    //   data: {
    //     email: email,
    //     password: password,
    //   },
    // })
    // .then((res) => {
    //   console.log("connected\nToken:", res.data.token);
    //   try {
    //     AsyncStorage.setItem("@token", res.data.token);
    //   } catch (e) {
    //     console.log("error during token saving");
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
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
        // onPress={handleSubmit}
        onPress={() => {signIn(email, password)}}
      />
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
