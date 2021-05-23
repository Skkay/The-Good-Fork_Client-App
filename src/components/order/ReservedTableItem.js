import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

const ReservedTableItem = ({ table, selectReservation, selectedReservation }) => {
  const date = new Date(table.date);
  const selected = selectedReservation === table.id;

  return (
    <Pressable style={styles.reservation} onPress={() => selectReservation(table.id)}>
      <View style={[styles.reservationHeader, selected && styles.selectedReservationHeader]}>
        <Text style={styles.reservationDate}>{table.service.startTime}h-{table.service.endTime}h</Text>
      </View>
      <View style={[styles.reservationContent, selected && styles.selectedReservationContent]}>
        <Text>{table.table_.label}</Text>
        <Text>{table.table_.place} {table.table_.place > 1 ? "places" : "place" }</Text>
      </View>
    </Pressable>
  );
};

const stylesVar = {
  borderRadius: 5,
  borderWidth: 1,
  selectedBorderWidth: 2,
  borderColor: "#0090FF"
};
const styles = StyleSheet.create({
  reservation: {
    margin: 10,
  },
  reservationHeader: {
    backgroundColor: "#A4D7FF",
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
  selectedReservationHeader: {
    borderLeftWidth: stylesVar.selectedBorderWidth,
    borderTopWidth: stylesVar.selectedBorderWidth,
    borderRightWidth: stylesVar.selectedBorderWidth,
  },
  selectedReservationContent: {
    borderLeftWidth: stylesVar.selectedBorderWidth,
    borderBottomWidth: stylesVar.selectedBorderWidth,
    borderRightWidth: stylesVar.selectedBorderWidth,
  },
});

export default ReservedTableItem;
