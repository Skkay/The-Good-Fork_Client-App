import React, { useState } from "react";
import { Pressable, SafeAreaView, Text, StyleSheet, View } from "react-native";

import DateTimePicker from '@react-native-community/datetimepicker';

const OrderTypeScreen = ({ route, navigation }) => {
  const { cartData } = route.params
  const [selectedButton, setSelectedButton] = useState(null);

  /* DateTimePicker */
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

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
      {selectedButton === 1 && (
        <View style={styles.content}>
          <View style={styles.selectDateTime}>
            <Pressable style={styles.buttonSelectDateTime} onPress={showDatepicker}>
              <Text style={styles.buttonSelectDateTimeText}>Sélectionner la date</Text>
            </Pressable>
            <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
          </View>

          <View style={styles.selectDateTime}>
            <Pressable style={styles.buttonSelectDateTime} onPress={showTimepicker}>
              <Text style={styles.buttonSelectDateTimeText}>Sélectionner l'heure</Text>
            </Pressable>
            <Text style={styles.dateText}>{date.toLocaleTimeString()}</Text>
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      )}
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

  content: {
  },
  selectDateTime: {
    marginVertical: 20
  },
  buttonSelectDateTime: {
    backgroundColor: "#ff0000",
    marginHorizontal: 15,
    paddingVertical: 10
  },
  buttonSelectDateTimeText: {
    textAlign: "center",
    fontSize: 20
  },
  dateText: {
    textAlign: "center",
  }
});

export default OrderTypeScreen;
