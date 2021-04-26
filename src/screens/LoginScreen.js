import React from "react";
import { Alert, Button, SafeAreaView, StyleSheet, TextInput } from "react-native";

const LoginScreen = () => {
  const [email, onChangeEmail] = React.useState();
  const [password, onChangePassword] = React.useState();

  const handleSubmit = () => {
    Alert.alert("Email:" + email + "\nPassword:" + password);
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
        onPress={handleSubmit}
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
