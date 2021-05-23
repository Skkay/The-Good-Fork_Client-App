import React, { useContext, useState } from "react";
import { Button, SafeAreaView, StyleSheet, TextInput, ActivityIndicator } from "react-native";

import { AuthContext } from '../components/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, onChangeEmail] = useState("user@example.com");
  const [password, onChangePassword] = useState("user");
  const [isLoading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

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
        onPress={() => {
          setLoading(true);
          signIn(email, password); 
        }}
      />

      <Button
        title="Créer un compte"
        onPress={() => {
          navigation.navigate('Register');
        }}
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
