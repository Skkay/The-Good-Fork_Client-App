import React from "react";
import { Text, View, StyleSheet } from "react-native";

const ReservationItem = ({ reservation }) => {
  const date = new Date(reservation.date);

  return (
    <View style={styles.reservation}>
      <View style={styles.reservationHeader}>
        <Text style={styles.reservationDate}>{date.getDate().toString().padStart(2, '0')}/{(date.getMonth() + 1).toString().padStart(2, '0')}/{date.getFullYear()} - {reservation.service.startTime}h-{reservation.service.endTime}h</Text>
      </View>
      <View style={styles.reservationContent}>
        <Text>{reservation.table_.label}</Text>
        <Text>{reservation.table_.place} {reservation.table_.place > 1 ? "places" : "place" }</Text>
      </View>
    </View>
  );
};

const stylesVar = {
  borderRadius: 5,
  borderWidth: 1,
  selectedBorderWidth: 2,
  borderColor: "#000000"
};
const styles = StyleSheet.create({
  reservation: {
    margin: 10,
  },
  reservationHeader: {
    backgroundColor: "#E0E0E0",
    borderTopLeftRadius: stylesVar.borderRadius,
    borderTopRightRadius: stylesVar.borderRadius,
    borderLeftColor: stylesVar.borderColor,
    borderTopColor: stylesVar.borderColor,
    borderRightColor: stylesVar.borderColor,
    borderLeftWidth: stylesVar.borderWidth,
    borderTopWidth: stylesVar.borderWidth,
    borderRightWidth: stylesVar.borderWidth,
  },
  reservationDate: {
    textAlign: "center",
  },
  reservationContent: {
    backgroundColor: "#FFFFFF",
    padding: 5,
    borderBottomLeftRadius: stylesVar.borderRadius,
    borderBottomRightRadius: stylesVar.borderRadius,
    borderLeftColor: stylesVar.borderColor,
    borderBottomColor: stylesVar.borderColor,
    borderRightColor: stylesVar.borderColor,
    borderLeftWidth: stylesVar.borderWidth,
    borderBottomWidth: stylesVar.borderWidth,
    borderRightWidth: stylesVar.borderWidth,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ReservationItem;
