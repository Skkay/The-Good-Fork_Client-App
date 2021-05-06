import React from "react";
import { FlatList } from "react-native";

import Item from "../../components/order/Item";

const DrinkTab = ({ data, onItemPress, onItemLongPress }) => {
  const renderItem = ({ item }) => {
    return (
      <Item 
        item={item}
        tab={2}
        onItemPress={onItemPress}
        onItemLongPress={onItemLongPress}
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
