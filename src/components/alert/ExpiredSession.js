import { Alert } from "react-native";

const ExpiredSession = (signOut) => 
  Alert.alert(
    "Session expirée",
    "Votre session a expiré, veuillez vous reconnecter.",
    [{ text: "Ok", onPress: () => signOut() }]
  )
;

export default ExpiredSession;
