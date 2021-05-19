import React, { useContext, useState, useEffect } from "react";
import { Pressable, SafeAreaView, Text, StyleSheet, View } from "react-native";

import DateTimePicker from '@react-native-community/datetimepicker';

import { AuthContext } from '../components/AuthContext';
import ExpiredSession from '../components/alert/ExpiredSession';
import UnexpectedError from '../components/alert/UnexpectedError';
import fetchToken from '../components/fetch/FetchToken';
import fetchTokenValidity from '../components/fetch/FetchTokenValidity';
import postOrder from '../components/fetch/PostOrder';

const OrderTypeScreen = ({ route, navigation }) => {
  const { cartData, extraInfo } = route.params
  const { signOut } = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [isValidToken, setValidToken] = useState(false);

  const [selectedButton, setSelectedButton] = useState(null);

  /* DateTimePicker */
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isDateValid, setDateValid] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(currentDate);
    setDateValid(currentDate < new Date());
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


  const handlePlaceTakeOutOrder = () => {
    postOrder(token, cartData, extraInfo, false, date)
      .then((res) => {
        console.log("Order successfully placed", res);
        navigation.navigate('Home', {toastType: "order_success"});
      })
      .catch((err) => {
        console.log("Error during order process", err)
        UnexpectedError(err.message);
      });
  }

  useEffect(() => {
    fetchToken()
      .then((token) => setToken(token))
      .catch((err) => console.log(err));
    if (!token) return;

    fetchTokenValidity(token)
      .then((res) => {
        if (res.valid) {
          setValidToken(true);
        } else {
          ExpiredSession(signOut);
        }
      })
    if (!isValidToken) return;
  }, [token, isValidToken]);

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
            <Text style={styles.dateText}>Le {date.getDate().toString().padStart(2, '0')}/{(date.getMonth() + 1).toString().padStart(2, '0')}</Text>
          </View>

          <View style={styles.selectDateTime}>
            <Pressable style={styles.buttonSelectDateTime} onPress={showTimepicker}>
              <Text style={styles.buttonSelectDateTimeText}>Sélectionner l'heure</Text>
            </Pressable>
            <Text style={styles.dateText}>À {date.getHours().toString().padStart(2, '0')}:{date.getMinutes().toString().padStart(2, '0')}</Text>
          </View>

          <Pressable style={[styles.nextButton, isDateValid && styles.nextButtonDisable]} onPress={handlePlaceTakeOutOrder} disabled={isDateValid}>
            <Text style={styles.buttonSelectDateTimeText}>Valider la commande</Text>
          </Pressable>

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
  },

  nextButton: {
    backgroundColor: "#D599FF",
    marginTop: 10,
    marginHorizontal: 30,
    paddingVertical: 5
  },
  nextButtonDisable: {
    backgroundColor: "#A8A8A8",
  }
});

export default OrderTypeScreen;
