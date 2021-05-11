import React, { useState } from "react";
import { Pressable, SafeAreaView, Text, StyleSheet, View } from "react-native";

import DateTimePicker from '@react-native-community/datetimepicker';

const OrderTypeScreen = ({ route, navigation }) => {
  const { cartData } = route.params
  const [selectedButton, setSelectedButton] = useState(null);

  return (
    <SafeAreaView>
      <View style={styles.buttonGroup}>
        <Pressable style={[styles.buttonRadio, selectedButton === 0 && styles.buttonRadioSelected]} onPress={() => setSelectedButton(0)}>
          <Text style={styles.buttonRadioText}>Sur place</Text>
        </Pressable>
        <Pressable style={[styles.buttonRadio, selectedButton === 1 && styles.buttonRadioSelected]} onPress={() => setSelectedButton(1)}>
          <Text style={styles.buttonRadioText}>À emporter</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#C3C3C3"
  },
  buttonRadio: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#00ff00",
    marginHorizontal: 10,
    marginVertical: 30,
    paddingVertical: 5,
  },
  buttonRadioSelected: {
    backgroundColor: "#0000ff",
  },
  buttonRadioText: {
    textAlign: "center",
    fontSize: 20,
  },
});

export default OrderTypeScreen;
