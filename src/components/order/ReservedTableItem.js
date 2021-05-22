import React from "react";
import { Text, View, StyleSheet } from "react-native";

const ReservedTableItem = ({ table }) => {
  const date = new Date(table.date);

  return (
    <View style={styles.reservation}>
      <View style={styles.reservationHeader}>
        <Text style={styles.reservationDate}>{table.service.startTime}h-{table.service.endTime}h</Text>
      </View>
      <View style={styles.reservationContent}>
        <Text>{table.table_.label}</Text>
        <Text>{table.table_.place} {table.table_.place > 1 ? "places" : "place" }</Text>
      </View>
    </View>
  );
};

const stylesVar = {
  borderRadius: 5,
  borderWidth: 1,
  borderColor: "#AFAFAF"
};
const styles = StyleSheet.create({
  reservation: {
    margin: 10,
  },
  reservationHeader: {
    backgroundColor: "#FFE9BA",
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

export default ReservedTableItem;
