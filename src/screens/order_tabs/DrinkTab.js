import React from "react";
import { FlatList } from "react-native";

import Item from "../../components/order/Item";

const DrinkTab = ({ data }) => {
  const renderItem = ({ item }) => {
    return (
      <Item 
        item={item}
      />
    );
  }

  return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
  );
};

export default DrinkTab;
