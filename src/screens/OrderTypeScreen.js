import React, { useContext, useState, useEffect } from "react";
import { Pressable, SafeAreaView, Text, StyleSheet, View, ActivityIndicator, FlatList } from "react-native";

import DateTimePicker from '@react-native-community/datetimepicker';

import { AuthContext } from '../components/AuthContext';
import ExpiredSession from '../components/alert/ExpiredSession';
import UnexpectedError from '../components/alert/UnexpectedError';
import fetchToken from '../components/fetch/FetchToken';
import fetchTokenValidity from '../components/fetch/FetchTokenValidity';
import fetchUserId from '../components/fetch/FetchUserId';
import fetchReservations from "../components/fetch/FetchReservations";
import postOrder from '../components/fetch/PostOrder';
import ReservedTableItem from "../components/order/ReservedTableItem";

const OrderTypeScreen = ({ route, navigation }) => {
  const { cartData, extraInfo, discountId } = route.params
  const { signOut } = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [isValidToken, setValidToken] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);

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
    postOrder(token, cartData, extraInfo, false, date, discountId)
      .then((res) => {
        console.log("Take-out order successfully placed", res);
        navigation.navigate('Home', {toastType: "order_success_takeout", toastExtra: res.data});
      })
      .catch((err) => {
        console.log("Error during take-out order process", err)
        UnexpectedError(err.message);
      });
  }

  const handleEatInOrder = () => {
    console.log("eat in");
  }

  const selectReservation = (id) => {
    setSelectedReservation(id);
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

    fetchUserId()
      .then((id) => setUserId(id))
      .catch((err) => console.log(err))
    if (!userId) return;

    fetchReservations(token, userId)
      .then((res) => setReservations(res))
      .finally(() => setLoading(false));
  }, [token, isValidToken, userId]);

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
      {selectedButton === 0 && (
        isLoading ? <ActivityIndicator size="large" color="#000000" /> : (
          reservations.length > 0 ? (
            <View style={styles.content}>
              <Text style={styles.textCenter}>Vous avez {reservations.length} {reservations.length > 1 ? "réservations" : "réservation"} aujourd'hui.</Text>
              <Text style={styles.textCenter}>Sélectionnez votre réservation, vérifiez que vous êtes à la bonne table, puis validez votre commande.</Text>
              <FlatList 
                data={reservations}
                renderItem={({ item }) => <ReservedTableItem table={item} selectReservation={selectReservation} selectedReservation={selectedReservation} />}
                keyExtractor={item => item.date + item.service.id.toString() + item.table_.id.toString()}
                extraData={selectedReservation}
              />
              {selectedReservation !== null && (
                <Pressable style={styles.nextButton} onPress={handleEatInOrder}>
                  <Text style={styles.buttonSelectDateTimeText}>Valider la commande</Text>
                </Pressable>
              )}
            </View>
          ) : (
            <Text style={styles.textCenter}>Vous n'avez aucune réservation pour aujourd'hui.</Text>
          )
        )
      )}
      {selectedButton === 1 && (
        <View style={styles.content}>
          <View style={styles.selectDateTime}>
            <Pressable style={styles.buttonSelectDateTime} onPress={showDatepicker}>
              <Text style={styles.buttonSelectDateTimeText}>Sélectionner la date</Text>
            </Pressable>
            <Text style={styles.textCenter}>Le {date.getDate().toString().padStart(2, '0')}/{(date.getMonth() + 1).toString().padStart(2, '0')}</Text>
          </View>

          <View style={styles.selectDateTime}>
            <Pressable style={styles.buttonSelectDateTime} onPress={showTimepicker}>
              <Text style={styles.buttonSelectDateTimeText}>Sélectionner l'heure</Text>
            </Pressable>
            <Text style={styles.textCenter}>À {date.getHours().toString().padStart(2, '0')}:{date.getMinutes().toString().padStart(2, '0')}</Text>
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
    margin: 5,
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
  textCenter: {
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
