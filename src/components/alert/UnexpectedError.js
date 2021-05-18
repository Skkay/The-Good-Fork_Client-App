import { Alert } from "react-native";

const UnexpectedError = (error) => {
  return (
    Alert.alert(
      "Une erreur est survenue",
      error,
      [{ text: "Ok" }]
    )
  );
}

export default UnexpectedError;
