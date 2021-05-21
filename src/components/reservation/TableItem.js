import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

const TableItem = ({ table }) => {
  const date = new Date(table.date);
  return (
    <View style={styles.reservation}>
      <View style={styles.reservationHeader}>
        <Text style={styles.reservationDate}>{date.getDate().toString().padStart(2, '0')}/{(date.getMonth() + 1).toString().padStart(2, '0')}/{date.getFullYear()} - {table.service.startTime}h-{table.service.endTime}</Text>
      </View>
      <View style={styles.reservationContent}>
        <View>
          <Text>{table.table.label}</Text>
          <Text>{table.table.place} {table.table.place > 1 ? "places" : "place" }</Text>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => console.log(table.date, table.service.id, table.table.id)}>
          <Text style={styles.textButton}>Réserver</Text>
        </Pressable>
      </View>
    </View>
  );
};

const stylesVar = {
  borderRadius: 5,
  borderWidth: 1,
  borderColor: "#483100"
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
  button: {
    backgroundColor: "#FFBC2D",
    paddingHorizontal: 5,
    borderRadius: 3,
    justifyContent: "center",
  },
  textButton: {
    color: "#483100"
  },
});

export default TableItem;
