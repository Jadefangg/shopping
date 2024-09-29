import { useState } from "react";
import { View, FlatList, Text } from "react-native";

const ShoppingLists = ({ db }) => {
  const [lists, setLists] = useState([]);

  return (
    <View>
      <FlatList
        data={lists}
        renderItem={({ item }) => (
          <Text>{item.name}: {item.items.join(", ")}</Text> //join() method joins the elements of an array into a string
        )}
      />
    </View>
  );
};

export default ShoppingLists;