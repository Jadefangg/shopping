import { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { collection, getDocs } from "firebase/firestore";

const ShoppingLists = ({ db }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const querySnapshot = await getDocs(collection(db, "shoppingLists"));
      const listsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLists(listsData);
    };

    fetchLists();
  }, [db]);

  return (
    <View>
      <FlatList
        data={lists}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text>{item.name}: {item.items.join(", ")}</Text>
        )}
      />
    </View>
  );
};

export default ShoppingLists;