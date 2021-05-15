import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchUserId = async() => {
  let userId = null;
  try {
    userId = await AsyncStorage.getItem("userId");
  } catch (e) {
    console.log(e);
  } finally {
    return userId;
  }
}

export default fetchUserId;
